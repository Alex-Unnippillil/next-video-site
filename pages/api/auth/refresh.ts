import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const refresh = req.cookies['refresh_token'];
  if (!refresh) {
    res.status(401).json({ error: 'missing refresh token' });
    return;
  }

  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refresh,
    client_id: process.env.COGNITO_CLIENT_ID!,
  });

  const tokenResp = await fetch(`https://${process.env.COGNITO_DOMAIN}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  const tokens = await tokenResp.json();

  if (!tokenResp.ok) {
    res.status(400).json(tokens);
    return;
  }

  res.setHeader('Set-Cookie', [
    serialize('access_token', tokens.access_token, { httpOnly: true, path: '/', sameSite: 'lax', secure: true }),
    serialize('id_token', tokens.id_token, { httpOnly: true, path: '/', sameSite: 'lax', secure: true }),
  ]);

  res.status(200).json({ ok: true });
}
