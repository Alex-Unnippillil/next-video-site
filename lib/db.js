import { promises as fs } from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'entitlements.json');

export async function readEntitlements() {
  try {
    const data = await fs.readFile(dataFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(path.dirname(dataFile), { recursive: true });
      await fs.writeFile(dataFile, '{}');
      return {};
    }
    throw err;
  }
}

export async function writeEntitlements(entitlements) {
  await fs.writeFile(dataFile, JSON.stringify(entitlements, null, 2));
}

export async function setEntitlement(email, product) {
  const entitlements = await readEntitlements();
  entitlements[email] = product;
  await writeEntitlements(entitlements);
}

export async function getEntitlement(email) {
  const entitlements = await readEntitlements();
  return entitlements[email];
}
