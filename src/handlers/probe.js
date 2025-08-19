const { execFile } = require('node:child_process');
const ffprobe = require('ffprobe-static');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function runFfprobe(path) {
  return new Promise((resolve, reject) => {
    execFile(ffprobe.path, [
      '-v', 'error',
      '-print_format', 'json',
      '-show_format',
      '-show_streams',
      path
    ], (err, stdout) => {
      if (err) return reject(err);
      try {
        resolve(JSON.parse(stdout));
      } catch (e) {
        reject(e);
      }
    });
  });
}

function parseFrameRate(value) {
  if (!value || value === '0/0') return null;
  const [num, den] = value.split('/').map(Number);
  if (!den) return null;
  return num / den;
}

exports.handler = async (event) => {
  const filePath = event.filePath;
  const info = await runFfprobe(filePath);
  const video = info.streams.find(s => s.codec_type === 'video');
  const audio = info.streams.find(s => s.codec_type === 'audio');

  const asset = await prisma.mediaAsset.create({
    data: {
      container: info.format.format_name,
      videoCodec: video?.codec_name || null,
      audioCodec: audio?.codec_name || null,
      duration: info.format.duration ? parseFloat(info.format.duration) : null,
      frameRate: parseFrameRate(video?.avg_frame_rate),
      width: video?.width || null,
      height: video?.height || null,
    }
  });

  return { id: asset.id };
};
