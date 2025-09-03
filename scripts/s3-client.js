import { S3Client } from "@aws-sdk/client-s3";

/**
 * Create an S3-compatible client. Supports Cloudflare R2 by allowing a custom
 * endpoint via the S3_ENDPOINT environment variable. R2 uses the same signing
 * mechanism (AWS Signature Version 4) as Amazon S3.
 */
export function createS3Client() {
  return new S3Client({
    region: process.env.AWS_REGION || "us-east-1",
    endpoint: process.env.S3_ENDPOINT,
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
}
