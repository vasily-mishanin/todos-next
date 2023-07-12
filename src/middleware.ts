import { NextResponse, NextRequest } from 'next/server';

export const PUBLIC_PATHS = [
  '/todoapp/login',
  '/todoapp/signup',
  '/verifyemail',
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value || '';

  const isPublicPath = PUBLIC_PATHS.includes(path);
  const isHomePath = path === '/todoapp' || path === '/';

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/todoapp', request.nextUrl));
  }

  if (!isPublicPath && !isHomePath && !token) {
    return NextResponse.redirect(new URL('/todoapp/login', request.nextUrl));
  }
}

// Matching Paths
export const config = {
  matcher: [
    '/',
    '/todoapp',
    '/todoapp/profile',
    '/todoapp/profile/:id*',
    '/todoapp/login',
    '/todoapp/signup',
    '/todoapp/todos',
    '/verifyemail',
  ],
};
