import { NextResponse } from 'next/server';

const USER = process.env.BASIC_AUTH_USER;
const PASS = process.env.BASIC_AUTH_PASS;

export function middleware(request) {
  if (USER && PASS) {
    const authHeader = request.headers.get('authorization');
    if (authHeader) {
      const [scheme, encoded] = authHeader.split(' ');
      if (scheme === 'Basic') {
        const decoded = atob(encoded);
        const [user, pass] = decoded.split(':');
        if (user === USER && pass === PASS) {
          return NextResponse.next();
        }
      }
    }
    return new Response('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }
  return NextResponse.next();
}
