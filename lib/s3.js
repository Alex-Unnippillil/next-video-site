import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/**
 * List object keys in an S3 bucket.
 * @param {S3Client} client AWS S3 client instance.
 * @param {string} bucket The bucket name.
 * @param {string} [prefix] Optional key prefix.
 * @returns {Promise<string[]>} Array of object keys.
 */
export async function listObjects(client, bucket, prefix = "") {
  const command = new ListObjectsV2Command({ Bucket: bucket, Prefix: prefix });
  const { Contents = [] } = await client.send(command);
  return Contents.map((item) => item.Key);
}

/**
 * Generate a presigned URL for an object in S3.
 * @param {S3Client} client AWS S3 client instance.
 * @param {string} bucket The bucket name.
 * @param {string} key Object key to sign.
 * @param {number} [expiresIn=3600] Expiration time in seconds.
 * @returns {Promise<string>} The signed URL.
 */
export async function signObject(
  client,
  bucket,
  key,
  expiresIn = 3600,
  signer = getSignedUrl
) {
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  return signer(client, command, { expiresIn });
}

export { S3Client };

