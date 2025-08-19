import { NextRequest, NextResponse } from 'next/server';

function redirectToPurchase(req: NextRequest) {
  return NextResponse.redirect(new URL('/purchase', req.url));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith('/watch')) {
    return NextResponse.next();
  }

  const policy = req.cookies.get('CloudFront-Policy')?.value;
  const signature = req.cookies.get('CloudFront-Signature')?.value;
  const keyPairId = req.cookies.get('CloudFront-Key-Pair-Id')?.value;

  if (!policy || !signature || !keyPairId) {
    return redirectToPurchase(req);
  }

  try {
    const decoded = JSON.parse(Buffer.from(policy, 'base64').toString('utf8'));
    const exp = decoded?.Statement?.[0]?.Condition?.DateLessThan?.['AWS:EpochTime'];
    if (!exp || exp * 1000 < Date.now()) {
      return redirectToPurchase(req);
    }
  } catch (e) {
    return redirectToPurchase(req);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/watch/:path*'],
};
