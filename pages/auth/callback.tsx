import { GetServerSideProps } from 'next';
import { serialize } from 'cookie';

export const getServerSideProps: GetServerSideProps = async ({ query, res }) => {
  const code = query.code as string;
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    client_id: process.env.COGNITO_CLIENT_ID!,
    redirect_uri: process.env.COGNITO_CALLBACK_URL!,
  });

  const tokenResp = await fetch(`https://${process.env.COGNITO_DOMAIN}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  const tokens = await tokenResp.json();

  if (tokens.access_token) {
    res.setHeader('Set-Cookie', [
      serialize('access_token', tokens.access_token, { httpOnly: true, path: '/', sameSite: 'lax', secure: true }),
      serialize('refresh_token', tokens.refresh_token, { httpOnly: true, path: '/', sameSite: 'lax', secure: true }),
      serialize('id_token', tokens.id_token, { httpOnly: true, path: '/', sameSite: 'lax', secure: true }),
    ]);
  }

  res.writeHead(302, { Location: '/' });
  res.end();
  return { props: {} };
};

export default function Callback() {
  return null;
}
