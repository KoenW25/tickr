'use client';

export default function VoorwaardenPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Algemene voorwaarden Tckr
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Hieronder staan de voorwaarden voor het gebruik van Tckr en het kopen of verkopen van tickets via het platform.
          </p>
        </header>

        <section className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-700 shadow-sm shadow-slate-100">
          <article>
            <h2 className="text-base font-semibold text-slate-900">1. Toepasselijkheid</h2>
            <p className="mt-1">
              Deze voorwaarden zijn van toepassing op het gebruik van Tckr en op alle transacties via het platform.
            </p>
          </article>

          <article>
            <h2 className="text-base font-semibold text-slate-900">2. Account en gebruik</h2>
            <p className="mt-1">
              Gebruikers zijn verantwoordelijk voor correcte accountgegevens en voor veilig gebruik van hun account.
              Misbruik, fraude of oneigenlijk gebruik van het platform is niet toegestaan.
            </p>
          </article>

          <article>
            <h2 className="text-base font-semibold text-slate-900">3. Tickets aanbieden</h2>
            <p className="mt-1">
              Verkopers zijn verantwoordelijk voor de juistheid van aangeboden tickets.
              Tckr kan aanbiedingen verwijderen als er twijfel bestaat over geldigheid of betrouwbaarheid.
            </p>
          </article>

          <article>
            <h2 className="text-base font-semibold text-slate-900">4. Kopen en betalen</h2>
            <p className="mt-1">
              Betalingen lopen via externe betaalprovider(s), waaronder Mollie.
              Een koop is afgerond zodra betaling is bevestigd en de ticketoverdracht volgens de platformregels is voltooid.
            </p>
          </article>

          <article>
            <h2 className="text-base font-semibold text-slate-900">5. Servicekosten</h2>
            <p className="mt-1">
              Tckr rekent transparante servicekosten. De actuele kosten worden voor bevestiging van de transactie duidelijk getoond.
            </p>
          </article>

          <article>
            <h2 className="text-base font-semibold text-slate-900">6. Uitbetaling aan verkopers</h2>
            <p className="mt-1">
              Uitbetalingen vinden plaats volgens de uitbetalingsvoorwaarden van Tckr en kunnen afhankelijk zijn van eventdatum,
              ticketvalidatie en fraudepreventiecontroles.
            </p>
          </article>

          <article>
            <h2 className="text-base font-semibold text-slate-900">7. Aansprakelijkheid</h2>
            <p className="mt-1">
              Tckr doet er alles aan om het platform veilig en betrouwbaar te houden, maar geeft geen garanties op ononderbroken beschikbaarheid.
              Aansprakelijkheid is beperkt tot zover wettelijk toegestaan.
            </p>
          </article>

          <article>
            <h2 className="text-base font-semibold text-slate-900">8. Privacy en gegevens</h2>
            <p className="mt-1">
              Op verwerking van persoonsgegevens is het privacybeleid van Tckr van toepassing.
            </p>
          </article>

          <article>
            <h2 className="text-base font-semibold text-slate-900">9. Wijzigingen</h2>
            <p className="mt-1">
              Tckr kan deze voorwaarden wijzigen. De meest recente versie is altijd beschikbaar op de website.
            </p>
          </article>

          <article className="border-t border-slate-200 pt-4 text-xs text-slate-500">
            Contact: <span className="font-medium">info@tckr.nl</span> - <span className="font-medium">tckr.nl</span>
          </article>
        </section>
      </main>
    </div>
  );
}

