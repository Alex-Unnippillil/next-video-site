import chokidar from 'chokidar';
import { stat } from 'fs/promises';

const WATCH_PATH = process.env.WATCH_PATH || '/mnt';
const STABLE_ITERATIONS = 2;
const CHECK_INTERVAL_MS = 1000;

async function waitForStableSize(filePath, interval = CHECK_INTERVAL_MS, stableIterations = STABLE_ITERATIONS) {
  let lastSize = -1;
  let stableCount = 0;
  while (stableCount < stableIterations) {
    try {
      const { size } = await stat(filePath);
      if (size === lastSize) {
        stableCount += 1;
      } else {
        stableCount = 0;
        lastSize = size;
      }
    } catch (err) {
      // File might not exist yet, reset counters
      stableCount = 0;
    }
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
}

async function uploadFile(filePath) {
  // Replace this with real upload logic
  console.log(`Uploading ${filePath}`);
}

const watcher = chokidar.watch(WATCH_PATH, {
  ignoreInitial: true,
});

watcher.on('add', async (path) => {
  console.log(`Detected new file: ${path}`);
  try {
    await waitForStableSize(path);
    await uploadFile(path);
  } catch (err) {
    console.error(`Failed to upload ${path}`, err);
  }
});

console.log(`Watching ${WATCH_PATH} for new files...`);
