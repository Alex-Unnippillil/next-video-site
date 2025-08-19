import type { NextApiRequest, NextApiResponse } from 'next';
import { S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';

const s3 = new S3Client({ region: process.env.AWS_REGION });
const MAX_SIZE = 500 * 1024 * 1024; // 500MB

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const user = (req.headers['x-user-id'] as string) || 'anonymous';
  const ip =
    (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '';
  console.info(`Pre-signed URL requested by ${user} from ${ip}`);

  const { contentType, contentLength } = req.body || {};

  if (typeof contentType !== 'string' || !contentType.startsWith('video/')) {
    res.status(400).json({ error: 'Invalid content type' });
    return;
  }

  if (
    typeof contentLength !== 'number' ||
    contentLength <= 0 ||
    contentLength > MAX_SIZE
  ) {
    res.status(400).json({ error: 'Invalid content length' });
    return;
  }

  const key = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  try {
    const { url, fields } = await createPresignedPost(s3, {
      Bucket: 'STLS-vod-input',
      Key: key,
      Conditions: [
        ['content-length-range', 0, MAX_SIZE],
        ['starts-with', '$Content-Type', 'video/'],
      ],
      Fields: {
        'Content-Type': contentType,
      },
      Expires: 3600,
    });

    res.status(200).json({ url, fields, key });
  } catch (err) {
    console.error('Failed to create pre-signed URL', err);
    res.status(500).json({ error: 'Failed to create URL' });
  }
}
