import { createClient } from '@supabase/supabase-js';
import { sendBuyerConfirmationEmail, sendSellerNotificationEmail } from '@/lib/email';

const supabaseService = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function getUserEmailById(userId) {
  if (!userId) return null;

  const { data: authData, error: authError } = await supabaseService.auth.admin.getUserById(userId);
  if (!authError && authData?.user?.email) {
    return authData.user.email;
  }

  // Fallback for projects that keep emails in public profiles.
  const { data: profileData, error: profileError } = await supabaseService
    .from('profiles')
    .select('email')
    .eq('id', userId)
    .maybeSingle();

  if (!profileError && profileData?.email) {
    return profileData.email;
  }

  return null;
}

export async function POST(request) {
  try {
    const body = await request.text();
    console.log('[Mollie Webhook] Raw body:', body);

    const params = new URLSearchParams(body);
    const paymentId = params.get('id');

    console.log('[Mollie Webhook] Payment ID:', paymentId);

    if (!paymentId) {
      console.error('[Mollie Webhook] No payment ID in request body');
      return new Response('OK', { status: 200 });
    }

    const mollieApiKey = process.env.MOLLIE_API_KEY;

    if (!mollieApiKey) {
      console.error('[Mollie Webhook] MOLLIE_API_KEY not set');
      return new Response('OK', { status: 200 });
    }

    console.log('[Mollie Webhook] Fetching payment from Mollie...');

    const mollieRes = await fetch(
      `https://api.mollie.com/v2/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${mollieApiKey}`,
        },
      }
    );

    if (!mollieRes.ok) {
      const errorText = await mollieRes.text();
      console.error('[Mollie Webhook] Failed to fetch payment:', mollieRes.status, errorText);
      return new Response('OK', { status: 200 });
    }

    const payment = await mollieRes.json();

    console.log('[Mollie Webhook] Payment status:', payment.status);
    console.log('[Mollie Webhook] Payment metadata:', JSON.stringify(payment.metadata));

    if (payment.status === 'paid') {
      const ticketId = payment.metadata?.ticketId;
      const buyerId = payment.metadata?.buyerId;

      if (!ticketId) {
        console.error('[Mollie Webhook] No ticketId in payment metadata');
        return new Response('OK', { status: 200 });
      }

      console.log('[Mollie Webhook] Updating ticket', ticketId, 'to sold, buyer:', buyerId);

      const updatePayload = { status: 'sold' };
      if (buyerId) {
        updatePayload.buyer_id = buyerId;
      }

      const { data, error } = await supabaseService
        .from('tickets')
        .update(updatePayload)
        .eq('id', ticketId)
        .select();

      if (error) {
        console.error('[Mollie Webhook] Supabase update error:', JSON.stringify(error));
      } else {
        console.log('[Mollie Webhook] Ticket updated successfully:', JSON.stringify(data));

        const ticket = data?.[0];
        if (ticket) {
          const eventName = ticket.event_name || 'Onbekend evenement';
          const totalAmount = payment.amount?.value || ticket.ask_price || ticket.price;
          const buyerUserId = buyerId || ticket.buyer_id;
          const sellerUserId = ticket.seller_id || ticket.user_id;

          // Send buyer confirmation email
          if (buyerUserId) {
            const buyerEmail = await getUserEmailById(buyerUserId);
            if (buyerEmail) {
              await sendBuyerConfirmationEmail(
                buyerEmail,
                eventName,
                totalAmount,
                ticket.pdf_url || null
              );
              console.log('[Mollie Webhook] Buyer confirmation email sent to', buyerEmail);
            } else {
              console.warn('[Mollie Webhook] Could not resolve buyer email for', buyerUserId);
            }
          }

          // Send seller notification email
          if (sellerUserId) {
            const sellerEmail = await getUserEmailById(sellerUserId);
            const sellerAmount = ticket.ask_price || ticket.price || totalAmount;
            if (sellerEmail) {
              await sendSellerNotificationEmail(sellerEmail, eventName, sellerAmount);
              console.log('[Mollie Webhook] Seller notification email sent to', sellerEmail);
            } else {
              console.warn('[Mollie Webhook] Could not resolve seller email for', sellerUserId);
            }
          }
        }
      }
    } else {
      console.log('[Mollie Webhook] Payment not paid, status:', payment.status, '- no action taken');
    }

    return new Response('OK', { status: 200 });
  } catch (err) {
    console.error('[Mollie Webhook] Unexpected error:', err);
    return new Response('OK', { status: 200 });
  }
}
