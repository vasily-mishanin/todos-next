import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === '/login' || path === '/signup' || path === '/verifyemail';
  const token = request.cookies.get('token')?.value || '';

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}

// Matching Paths
export const config = {
  matcher: [
    '/',
    '/profile',
    '/profile/:id*',
    '/login',
    '/signup',
    '/verifyemail',
  ],
};
