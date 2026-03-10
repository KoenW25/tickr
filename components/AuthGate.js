'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';

const PUBLIC_PATHS = [
  '/',
  '/markt',
  '/hoe-het-werkt',
  '/voorwaarden',
  '/privacy',
  '/sitemap.xml',
  '/robots.txt',
  '/login',
  '/auth',
  '/favicon.ico',
];

export default function AuthGate({ children }) {
  const pathname = usePathname();

  const isPublic = PUBLIC_PATHS.some((p) => (p === '/' ? pathname === '/' : pathname.startsWith(p)));
  if (isPublic) return children;

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
