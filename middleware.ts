import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Role, userHasRole, parseRolesFromToken } from './lib/auth/roles';

function getToken(req: NextRequest): string {
  const auth = req.headers.get('authorization');
  if (!auth) return '';
  const parts = auth.split(' ');
  return parts.length > 1 ? parts[1] : '';
}

export function middleware(req: NextRequest) {
  const token = getToken(req);
  const path = req.nextUrl.pathname;

  if (path.startsWith('/admin')) {
    if (!userHasRole(token, Role.Admin)) {
      return NextResponse.redirect(new URL('/api/unauthorized', req.url));
    }
  }

  if (path.startsWith('/creator')) {
    const roles = parseRolesFromToken(token);
    if (!(roles.includes(Role.Creator) || roles.includes(Role.Admin))) {
      return NextResponse.redirect(new URL('/api/unauthorized', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/creator/:path*']
};
