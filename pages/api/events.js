import { S3Client, ListObjectsV2Command, HeadObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export default async function handler(req, res) {
  const bucket = process.env.EVENTS_BUCKET_NAME;
  const ttl = parseInt(process.env.SIGN_TTL_SECONDS || '60', 10);
  const n = parseInt(req.query.n || req.query.limit || '10', 10);

  if (!bucket) {
    res.status(500).json({ error: 'EVENTS_BUCKET_NAME not set' });
    return;
  }

  const client = new S3Client({});

  try {
    const listCommand = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: 'events/'
    });
    const { Contents = [] } = await client.send(listCommand);
    const sorted = Contents.sort((a, b) => new Date(b.LastModified) - new Date(a.LastModified)).slice(0, n);

    const items = await Promise.all(
      sorted.map(async (obj) => {
        const head = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: obj.Key }));
        const url = await getSignedUrl(
          client,
          new GetObjectCommand({ Bucket: bucket, Key: obj.Key }),
          { expiresIn: ttl }
        );
        return {
          key: obj.Key,
          lastModified: obj.LastModified,
          size: obj.Size,
          metadata: head.Metadata,
          url
        };
      })
    );

    res.status(200).json(items);
  } catch (err) {
    console.error('Error listing events', err);
    res.status(500).json({ error: 'Failed to list events' });
  }
}
