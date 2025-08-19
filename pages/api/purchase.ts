import type { NextApiRequest, NextApiResponse } from 'next';
import { getSignedCookies } from 'aws-cloudfront-sign';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const keyPairId = process.env.CF_KEY_PAIR_ID;
  const privateKey = process.env.CF_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!keyPairId || !privateKey) {
    res.status(500).json({ error: 'CloudFront signing keys not configured' });
    return;
  }

  const expireTime = Math.floor(Date.now() / 1000) + 60 * 60;

  const cookies = getSignedCookies('https://example.com/*', {
    keypairId: keyPairId,
    privateKeyString: privateKey,
    expireTime,
  });

  res.setHeader('Set-Cookie', [
    `CloudFront-Policy=${cookies['CloudFront-Policy']}; Path=/; HttpOnly; Secure; SameSite=Strict`,
    `CloudFront-Signature=${cookies['CloudFront-Signature']}; Path=/; HttpOnly; Secure; SameSite=Strict`,
    `CloudFront-Key-Pair-Id=${cookies['CloudFront-Key-Pair-Id']}; Path=/; HttpOnly; Secure; SameSite=Strict`,
  ]);

  res.status(200).json({ success: true, expires: expireTime });
}
