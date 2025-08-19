import type { NextApiRequest } from 'next';

export enum Role {
  Admin = 'Admin',
  Creator = 'Creator',
  Viewer = 'Viewer'
}

export function parseRolesFromToken(token: string): string[] {
  if (!token) return [];
  try {
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    return payload['cognito:groups'] || [];
  } catch {
    return [];
  }
}

export function userHasRole(token: string, role: Role): boolean {
  return parseRolesFromToken(token).includes(role);
}

export function requireRole(req: NextApiRequest, roles: Role | Role[]): void {
  const token = req.headers.authorization?.split(' ')[1] || '';
  const userRoles = parseRolesFromToken(token);
  const needed = Array.isArray(roles) ? roles : [roles];
  const allowed = needed.some(r => userRoles.includes(r));
  if (!allowed) {
    const err = new Error('Forbidden');
    (err as any).statusCode = 403;
    throw err;
  }
}
