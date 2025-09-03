import { S3Client } from "@aws-sdk/client-s3";

const options = {};

if (process.env.S3_ENDPOINT) {
  options.endpoint = process.env.S3_ENDPOINT;
  options.forcePathStyle = true;
}

export const s3Client = new S3Client(options);

export default s3Client;
