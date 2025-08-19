import type { NextApiRequest, NextApiResponse } from 'next';
import { CognitoIdentityProviderClient, SignUpCommand } from '@aws-sdk/client-cognito-identity-provider';

const client = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }
  const { username, password, email } = req.body;
  try {
    await client.send(new SignUpCommand({
      ClientId: process.env.COGNITO_CLIENT_ID!,
      Username: username,
      Password: password,
      UserAttributes: [{ Name: 'email', Value: email }],
    }));
    res.status(200).json({ ok: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
