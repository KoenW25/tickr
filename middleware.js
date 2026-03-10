import { NextResponse } from 'next/server';

const PROTECTED_PATHS = ['/dashboard', '/upload', '/profiel'];

function hasSupabaseSessionCookie(request) {
  return request.cookies
    .getAll()
    .some((cookie) => cookie.name.startsWith('sb-') && cookie.name.includes('-auth-token'));
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PATHS.some((path) => pathname.startsWith(path));

  if (!isProtected) {
    return NextResponse.next();
  }

  if (hasSupabaseSessionCookie(request)) {
    return NextResponse.next();
  }

  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('next', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/dashboard/:path*', '/upload/:path*', '/profiel/:path*'],
};
