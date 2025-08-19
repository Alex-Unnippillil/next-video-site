import type { IncomingMessage } from 'http';
import { parse } from 'cookie';
import { createRemoteJWKSet, jwtVerify, JWTPayload } from 'jose';

const issuer = `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`;
const jwks = createRemoteJWKSet(new URL(`https://${process.env.COGNITO_DOMAIN}/.well-known/jwks.json`));

export async function getSession(req: IncomingMessage): Promise<JWTPayload | null> {
  const cookies = parse(req.headers.cookie || '');
  const idToken = cookies['id_token'];
  if (!idToken) return null;
  try {
    const { payload } = await jwtVerify(idToken, jwks, {
      issuer,
      audience: process.env.COGNITO_CLIENT_ID,
    });
    return payload;
  } catch {
    return null;
  }
}
