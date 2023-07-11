import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export const PUBLIC_PATHS = ['/login', '/signup', '/verifyemail'];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = PUBLIC_PATHS.includes(path);
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
