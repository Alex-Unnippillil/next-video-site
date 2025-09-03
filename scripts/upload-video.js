import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { createReadStream, statSync } from "fs";
import path from "path";

function parseArgs() {
  const args = {};
  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const value = process.argv[i + 1];
      args[key] = value;
      i++;
    }
  }
  return args;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function uploadWithBackoff({ client, filePath, bucket, key, maxRetries = 5 }) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const stream = createReadStream(filePath);
      const upload = new Upload({
        client,
        params: { Bucket: bucket, Key: key, Body: stream }
      });
      const result = await upload.done();
      return result;
    } catch (err) {
      if (attempt === maxRetries) throw err;
      const delay = Math.pow(2, attempt) * 1000;
      console.warn(`Upload failed on attempt ${attempt}. Retrying in ${delay} ms...`);
      await sleep(delay);
    }
  }
}

async function main() {
  const { bucket, file, key } = parseArgs();
  if (!bucket || !file) {
    console.log(
      "Usage: node scripts/upload-video.js --bucket <bucket> --file <path> [--key <key>]"
    );
    process.exit(1);
  }

  const client = new S3Client({});
  const fileSize = statSync(file).size;
  const objectKey = key || path.basename(file);

  try {
    const result = await uploadWithBackoff({
      client,
      filePath: file,
      bucket,
      key: objectKey
    });
    console.log(`Upload successful. ETag: ${result.ETag}, Size: ${fileSize} bytes`);
  } catch (err) {
    console.error("Error uploading file", err);
    process.exit(1);
  }
}

main();
