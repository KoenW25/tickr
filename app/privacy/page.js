'use client';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Privacybeleid Tckr
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Dit privacybeleid legt uit hoe Tckr persoonsgegevens verwerkt op `tckr.nl` in overeenstemming met de AVG/GDPR.
          </p>
        </header>

        <section className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-700 shadow-sm shadow-slate-100">
          <article>
            <h2 className="text-base font-semibold text-slate-900">Wie zijn wij</h2>
            <p className="mt-1">
              Tckr is een online ticketmarktplaats op <span className="font-medium">tckr.nl</span>.
            </p>
          </article>

          <article>
            <h2 className="text-base font-semibold text-slate-900">Welke gegevens verzamelen wij</h2>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>Naam en e-mailadres via Google login</li>
              <li>IBAN voor uitbetalingen</li>
              <li>Geuploade PDF-tickets</li>
              <li>Transactiegegevens</li>
              <li>Technische gebruiksgegevens</li>
            </ul>
          </article>

          <article>
            <h2 className="text-base font-semibold text-slate-900">Waarvoor gebruiken wij uw gegevens</h2>
            <p className="mt-1">
              Voor het verwerken van transacties, betalingen via Mollie, uitbetalingen aan verkopers,
              e-mailbevestigingen en fraudepreventie.
            </p>
          </article>

          <article>
            <h2 className="text-base font-semibold text-slate-900">Hoe lang bewaren wij gegevens</h2>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>Accountgegevens: 1 jaar na verwijdering</li>
              <li>Transactiegegevens: 7 jaar (wettelijke bewaarplicht)</li>
              <li>Ticket PDF&apos;s: 6 maanden na het evenement</li>
            </ul>
          </article>

          <article>
            <h2 className="text-base font-semibold text-slate-900">Delen met derden</h2>
            <p className="mt-1">
              Wij delen gegevens uitsluitend met benodigde verwerkers: Mollie voor betalingen, Supabase voor opslag in de EU en Vercel voor hosting.
              Wij verkopen nooit gegevens aan derden.
            </p>
          </article>

          <article>
            <h2 className="text-base font-semibold text-slate-900">Beveiliging</h2>
            <p className="mt-1">
              Wij gebruiken HTTPS-verbindingen, beveiligde opslag, Row Level Security en slaan geen betaalgegevens op.
            </p>
          </article>

          <article>
            <h2 className="text-base font-semibold text-slate-900">Uw rechten</h2>
            <p className="mt-1">
              U heeft recht op inzage, rectificatie, verwijdering, beperking, overdraagbaarheid en bezwaar.
              Voor verzoeken kunt u contact opnemen via <span className="font-medium">info@tckr.nl</span>.
              U kunt ook een klacht indienen bij de Autoriteit Persoonsgegevens.
            </p>
          </article>

          <article>
            <h2 className="text-base font-semibold text-slate-900">Cookies</h2>
            <p className="mt-1">
              Wij gebruiken functionele cookies voor de inlogsessie en analytische cookies via Vercel Analytics.
            </p>
          </article>

          <article className="border-t border-slate-200 pt-4 text-xs text-slate-500">
            Contact: <span className="font-medium">info@tckr.nl</span> - <span className="font-medium">tckr.nl</span> - Versie 1.0 maart 2026
          </article>
        </section>
      </main>
    </div>
  );
}

