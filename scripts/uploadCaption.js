#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const webvtt = require('node-webvtt');

const [,, input, flag] = process.argv;
if (!input) {
  console.error('Usage: node scripts/uploadCaption.js <file.vtt> [--dry-run]');
  process.exit(1);
}

const inputPath = path.resolve(input);
if (!fs.existsSync(inputPath)) {
  console.error('File not found:', inputPath);
  process.exit(1);
}

const data = fs.readFileSync(inputPath, 'utf8');
try {
  webvtt.parse(data);
} catch (err) {
  console.error('Invalid VTT file:', err.message);
  process.exit(1);
}

if (flag === '--dry-run') {
  console.log('Validation successful');
  process.exit(0);
}

const destDir = path.join(__dirname, '..', 'public', 'captions');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}
const destPath = path.join(destDir, path.basename(inputPath));
fs.copyFileSync(inputPath, destPath);
console.log('Caption uploaded to', destPath);
