import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { spawn } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) {
        args[key] = next;
        i += 1;
      } else {
        args[key] = true;
      }
    }
  }
  return args;
}

const options = parseArgs(process.argv.slice(2));
const { file, camera, date, bucket = process.env.S3_BUCKET, hls } = options;

if (!file || !camera || !date || !bucket) {
  console.error(
    'Usage: node scripts/send-event.js --file <path> --camera <id> --date <yyyy-mm-dd> [--hls] [--bucket <name>]'
  );
  process.exit(1);
}

const filename = path.basename(file, path.extname(file));
const s3 = new S3Client({ region: process.env.AWS_REGION });

async function generateHls(source) {
  const work = await fs.mkdtemp(path.join(os.tmpdir(), 'hls-'));
  const outDir = path.join(work, 'hls');
  await fs.mkdir(outDir, { recursive: true });

  await new Promise((resolve, reject) => {
    const outPath = path.join(outDir, 'index.m3u8');
    const ff = spawn(
      'ffmpeg',
      [
        '-i',
        source,
        '-codec:v',
        'libx264',
        '-codec:a',
        'aac',
        '-hls_time',
        '6',
        '-hls_playlist_type',
        'vod',
        outPath,
      ],
      { stdio: 'inherit' }
    );
    ff.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited with code ${code}`));
    });
  });

  return outDir;
}

async function uploadDir(dir, baseKey) {
  const entries = await fs.readdir(dir);
  await Promise.all(
    entries.map(async (entry) => {
      const body = await fs.readFile(path.join(dir, entry));
      const key = `${baseKey}${entry}`;
      await s3.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: body }));
    })
  );
}

async function main() {
  if (hls) {
    const outDir = await generateHls(file);
    const baseKey = `events/${camera}/${date}/${filename}/hls/`;
    await uploadDir(outDir, baseKey);
  } else {
    const body = await fs.readFile(file);
    const key = `events/${camera}/${date}/${path.basename(file)}`;
    await s3.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: body }));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

