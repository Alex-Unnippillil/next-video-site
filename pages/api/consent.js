import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'consents.json');
const RETENTION_DAYS = 365;

function readConsents() {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return [];
  }
}

function writeConsents(consents) {
  fs.writeFileSync(filePath, JSON.stringify(consents, null, 2));
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { consent } = req.body;
    const cutoff = Date.now() - RETENTION_DAYS * 86400000;
    const consents = readConsents().filter(c => new Date(c.timestamp).getTime() > cutoff);
    consents.push({ consent, timestamp: new Date().toISOString() });
    writeConsents(consents);
    res.status(200).json({ ok: true });
  } else {
    res.status(405).end();
  }
}
