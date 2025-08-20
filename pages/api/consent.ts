import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'pg';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const { userId } = req.body as { userId: string };
  if (!userId) {
    res.status(400).json({ error: 'Missing userId' });
    return;
  }

  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  await client.query(
    `INSERT INTO user_consent (user_id, consented_at) VALUES ($1, now())
     ON CONFLICT (user_id) DO UPDATE SET consented_at = excluded.consented_at`,
    [userId]
  );
  await client.end();

  res.status(200).json({ ok: true });
}
