'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { t } from '@/lib/translations';
import supabase from '@/lib/supabase';

export default function ProfielPage() {
  const { lang } = useLanguage();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function checkUser() {
      const { data } = await supabase.auth.getUser();
      if (!isMounted) return;

      if (!data?.user) {
        router.replace('/login?next=/profiel');
        return;
      }

      setCheckingAuth(false);
    }

    checkUser();
    return () => {
      isMounted = false;
    };
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">Even laden...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {t('profile.title', lang)}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {t('profile.subtitle', lang)}
          </p>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <form className="grid gap-4 text-sm sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                {t('profile.firstName', lang)}
              </label>
              <input
                type="text"
                placeholder={t('profile.firstName', lang)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                {t('profile.lastName', lang)}
              </label>
              <input
                type="text"
                placeholder={t('profile.lastName', lang)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-medium text-slate-700">
                {t('profile.email', lang)}
              </label>
              <input
                type="email"
                placeholder={t('profile.emailPlaceholder', lang)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-medium text-slate-700">
                {t('profile.iban', lang)}
              </label>
              <input
                type="text"
                placeholder={t('profile.ibanPlaceholder', lang)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                {t('profile.ibanNote', lang)}
              </p>
            </div>

            <div className="sm:col-span-2 mt-4 flex justify-end">
              <button
                type="submit"
                className="rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-500/30 hover:bg-emerald-400"
              >
                {t('profile.save', lang)}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

