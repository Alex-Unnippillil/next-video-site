export function parseEventFilename(filename) {
  // Remove extension if provided
  const base = filename.replace(/\.mp4$/i, '');

  // Expected format: <camera>-YYYYMMDD-HHmmss
  const match = base.match(/^([^_-]+)[_-](\d{4})(\d{2})(\d{2})[-_]?(\d{2})(\d{2})(\d{2})$/);
  if (!match) {
    throw new Error(`Invalid filename format: ${filename}`);
  }
  const [ , camera, year, month, day, hour, minute, second ] = match;
  const date = `${year}-${month}-${day}`;
  const time = `${hour}:${minute}:${second}`;
  const key = `events/${camera}/${year}/${month}/${day}/${base}.mp4`;
  return { camera, date, time, key };
}
