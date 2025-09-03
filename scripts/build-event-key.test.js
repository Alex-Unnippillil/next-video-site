import assert from 'node:assert/strict';
import { parseEventFilename } from './build-event-key.js';

const filename = 'front-20240530-131045.mp4';
const result = parseEventFilename(filename);

assert.deepEqual(result, {
  camera: 'front',
  date: '2024-05-30',
  time: '13:10:45',
  key: 'events/front/2024/05/30/front-20240530-131045.mp4'
});

console.log('All tests passed.');
