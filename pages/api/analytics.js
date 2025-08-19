import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'analytics.json');
const RETENTION_DAYS = 30;

function readLogs() {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return [];
  }
}

function writeLogs(logs) {
  fs.writeFileSync(filePath, JSON.stringify(logs, null, 2));
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { event } = req.body;
    const cutoff = Date.now() - RETENTION_DAYS * 86400000;
    const logs = readLogs().filter(l => new Date(l.timestamp).getTime() > cutoff);
    logs.push({ event, timestamp: new Date().toISOString() });
    writeLogs(logs);
    res.status(200).json({ ok: true });
  } else {
    res.status(405).end();
  }
}
