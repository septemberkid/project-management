import { isAuthenticated } from '@/queries';
import type { NextMiddleware } from 'next/server';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/((?!api|favicon.ico|_next/static|_next/image|.*\\.png$).*)'],
};
const publicRoutes = ['/sign-in', '/sign-up'];

export const middleware: NextMiddleware = async (req: NextRequest) => {
  const url = req.nextUrl.clone();
  const session = await isAuthenticated();
  if (publicRoutes.includes(url.pathname)) {
    if (session) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  }
  if (!session) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }
  return NextResponse.next();
};
