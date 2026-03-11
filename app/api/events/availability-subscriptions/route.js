import { createClient } from '@supabase/supabase-js';

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return null;
  return createClient(url, serviceRoleKey);
}

async function getAuthenticatedUser(request, supabaseAdmin) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;
  const token = authHeader.replace('Bearer ', '');
  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.getUser(token);
  if (error || !user?.id || !user?.email) return null;
  return user;
}

export async function GET(request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    if (!supabaseAdmin) {
      return Response.json({ error: 'Meldingen ophalen mislukt.' }, { status: 500 });
    }

    const user = await getAuthenticatedUser(request, supabaseAdmin);
    if (!user) {
      return Response.json({ error: 'Niet geautoriseerd.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const eventIdParam = searchParams.get('eventId');
    const eventId = eventIdParam ? Number(eventIdParam) : null;
    const hasEventId = Number.isInteger(eventId) && eventId > 0;

    let query = supabaseAdmin
      .from('event_alert_subscriptions')
      .select('id, event_id, is_active, created_at')
      .eq('is_active', true)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (hasEventId) {
      query = query.eq('event_id', eventId);
    }

    const { data: subscriptions, error: subscriptionsError } = await query;
    if (subscriptionsError) {
      console.error('[Event Alerts] Failed to fetch subscriptions:', subscriptionsError);
      return Response.json({ error: 'Meldingen ophalen mislukt.' }, { status: 500 });
    }

    if (hasEventId) {
      return Response.json({ subscribed: (subscriptions ?? []).length > 0 });
    }

    const eventIds = [...new Set((subscriptions ?? []).map((item) => Number(item.event_id)).filter(Number.isInteger))];
    if (eventIds.length === 0) {
      return Response.json({ subscriptions: [] });
    }

    const { data: events, error: eventsError } = await supabaseAdmin
      .from('events')
      .select('id, name, date, venue, venue_name, city')
      .in('id', eventIds);
    if (eventsError) {
      console.error('[Event Alerts] Failed to fetch events:', eventsError);
      return Response.json({ error: 'Meldingen ophalen mislukt.' }, { status: 500 });
    }

    const eventsById = new Map((events ?? []).map((event) => [Number(event.id), event]));
    const result = (subscriptions ?? []).map((subscription) => {
      const event = eventsById.get(Number(subscription.event_id));
      return {
        id: subscription.id,
        eventId: Number(subscription.event_id),
        createdAt: subscription.created_at,
        eventName: event?.name || `Event #${subscription.event_id}`,
        eventDate: event?.date || null,
        location: [event?.city, event?.venue_name || event?.venue].filter(Boolean).join(' - '),
      };
    });

    return Response.json({ subscriptions: result });
  } catch (error) {
    console.error('[Event Alerts] Unexpected GET error:', error);
    return Response.json({ error: 'Er ging iets mis bij het ophalen van meldingen.' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    if (!supabaseAdmin) {
      return Response.json({ error: 'Afmelden voor meldingen mislukt.' }, { status: 500 });
    }

    const user = await getAuthenticatedUser(request, supabaseAdmin);
    if (!user) {
      return Response.json({ error: 'Niet geautoriseerd.' }, { status: 401 });
    }

    const { eventId } = await request.json();
    const numericEventId = Number(eventId);
    if (!Number.isInteger(numericEventId) || numericEventId <= 0) {
      return Response.json({ error: 'Ongeldig eventId.' }, { status: 400 });
    }

    const now = new Date().toISOString();
    const { data, error } = await supabaseAdmin
      .from('event_alert_subscriptions')
      .update({ is_active: false, updated_at: now })
      .eq('event_id', numericEventId)
      .eq('user_id', user.id)
      .eq('is_active', true)
      .select('id');

    if (error) {
      console.error('[Event Alerts] Failed to unsubscribe:', error);
      return Response.json({ error: 'Afmelden voor meldingen mislukt.' }, { status: 500 });
    }

    return Response.json({ success: true, unsubscribed: (data ?? []).length > 0 });
  } catch (error) {
    console.error('[Event Alerts] Unexpected DELETE error:', error);
    return Response.json({ error: 'Er ging iets mis bij het afmelden voor meldingen.' }, { status: 500 });
  }
}
