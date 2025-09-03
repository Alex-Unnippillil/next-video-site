#!/usr/bin/env node

import { spawn } from 'child_process';
import { createReadStream } from 'fs';
import { basename, extname, join } from 'path';
import { tmpdir } from 'os';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import ffmpeg from 'ffmpeg-static';

async function generateThumbnail(input, output) {
  await new Promise((resolve, reject) => {
    const ff = spawn(ffmpeg, ['-ss', '00:00:01', '-i', input, '-frames:v', '1', output]);
    ff.on('error', reject);
    ff.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`ffmpeg exited with code ${code}`));
      }
    });
  });
}

async function upload(client, bucket, key, filePath, contentType) {
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: createReadStream(filePath),
      ContentType: contentType
    })
  );
}

async function main() {
  const [,, file, bucket, prefix = ''] = process.argv;
  if (!file || !bucket) {
    console.error('Usage: node scripts/upload-video.js <file> <bucket> [prefix]');
    process.exit(1);
  }

  const base = basename(file, extname(file));
  const thumbPath = join(tmpdir(), `${base}.jpg`);

  await generateThumbnail(file, thumbPath);

  const client = new S3Client({});
  const videoKey = prefix ? `${prefix}/${basename(file)}` : basename(file);
  const thumbKey = prefix ? `${prefix}/${base}.jpg` : `${base}.jpg`;

  await upload(client, bucket, videoKey, file, 'video/mp4');
  await upload(client, bucket, thumbKey, thumbPath, 'image/jpeg');

  console.log(`Uploaded ${videoKey} and ${thumbKey} to ${bucket}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

