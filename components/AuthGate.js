'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import supabase from '@/lib/supabase';
import Navbar from '@/components/Navbar';

const ALLOWED_EMAILS = ['koenwielandt@gmail.com'];
const PUBLIC_PATHS = ['/coming-soon', '/login', '/auth', '/api', '/_next', '/favicon.ico'];

export default function AuthGate({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [allowed, setAllowed] = useState(null);

  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));

  const checkAccess = useCallback(async () => {
    const { data } = await supabase.auth.getUser();
    const email = data?.user?.email;

    if (email && ALLOWED_EMAILS.includes(email)) {
      setAllowed(true);
    } else {
      setAllowed(false);
      router.replace('/coming-soon');
    }
  }, [router]);

  useEffect(() => {
    if (isPublic) {
      setAllowed(true);
      return;
    }

    checkAccess();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!isPublic) {
          const email = session?.user?.email;
          if (email && ALLOWED_EMAILS.includes(email)) {
            setAllowed(true);
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [pathname, isPublic, checkAccess]);

  if (isPublic) return children;
  if (allowed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />
      </div>
    );
  }
  if (!allowed) return null;

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
