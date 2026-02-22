'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { t } from '@/lib/translations';

const faqKeys = [
  { q: 'how.faq1Q', a: 'how.faq1A' },
  { q: 'how.faq2Q', a: 'how.faq2A' },
  { q: 'how.faq3Q', a: 'how.faq3A' },
  { q: 'how.faq4Q', a: 'how.faq4A' },
];

export default function HoeHetWerktPage() {
  const { lang } = useLanguage();
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-10 max-w-2xl">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {t('how.title', lang)}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {t('how.subtitle', lang)}
          </p>
        </header>

        {/* Drie stappen */}
        <section className="mb-12 grid gap-6 md:grid-cols-3">
          <article className="flex flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-100">
            <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-xs font-semibold text-sky-700">
              1
            </span>
            <h2 className="text-sm font-semibold text-slate-900">
              {t('how.step1Title', lang)}
            </h2>
            <p className="mt-2 text-xs text-slate-600">
              {t('how.step1Desc', lang)}
            </p>
          </article>

          <article className="flex flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-100">
            <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700">
              2
            </span>
            <h2 className="text-sm font-semibold text-slate-900">
              {t('how.step2Title', lang)}
            </h2>
            <p className="mt-2 text-xs text-slate-600">
              {t('how.step2Desc', lang)}
            </p>
          </article>

          <article className="flex flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-100">
            <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700">
              3
            </span>
            <h2 className="text-sm font-semibold text-slate-900">
              {t('how.step3Title', lang)}
            </h2>
            <p className="mt-2 text-xs text-slate-600">
              {t('how.step3Desc', lang)}
            </p>
          </article>
        </section>

        {/* FAQ */}
        <section className="mb-4">
          <h2 className="mb-4 text-sm font-semibold text-slate-900">
            {t('how.faqTitle', lang)}
          </h2>
          <div className="space-y-3">
            {faqKeys.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm shadow-slate-100"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between text-slate-900">
                  <span className="text-sm font-medium">{t(faq.q, lang)}</span>
                  <span className="ml-4 text-xs text-slate-400 group-open:hidden">
                    +
                  </span>
                  <span className="ml-4 hidden text-xs text-slate-400 group-open:inline">
                    –
                  </span>
                </summary>
                <p className="mt-2 text-xs text-slate-600">{t(faq.a, lang)}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

