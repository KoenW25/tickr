'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';

const HIDE_NAVBAR_PATHS = ['/login', '/auth'];

export default function AuthGate({ children }) {
  const pathname = usePathname();
  const hideNavbar = HIDE_NAVBAR_PATHS.some((path) => pathname.startsWith(path));

  if (hideNavbar) return children;
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
