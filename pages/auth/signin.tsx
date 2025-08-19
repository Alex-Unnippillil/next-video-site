import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const signinUrl = `https://${process.env.COGNITO_DOMAIN}/oauth2/authorize?client_id=${process.env.COGNITO_CLIENT_ID}&response_type=code&scope=email+openid+profile&redirect_uri=${encodeURIComponent(process.env.COGNITO_CALLBACK_URL!)}`;
  res.writeHead(302, { Location: signinUrl });
  res.end();
  return { props: {} };
};

export default function SignIn() {
  return null;
}
