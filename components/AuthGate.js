'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function AuthGate({ children }) {
  const pathname = usePathname();
  const hideNavbar = pathname.startsWith('/login') || pathname.startsWith('/auth');

  if (hideNavbar) return children;

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
