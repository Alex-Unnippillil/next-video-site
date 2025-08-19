import { GetServerSideProps } from 'next';
import { getSession } from '../lib/session';

export default function Home({ session }: { session: any }) {
  return (
    <div>
      {session ? <p>Signed in as {session.email}</p> : <p>Not signed in</p>}
      <a href="/auth/signin">Sign in</a>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession(req);
  return { props: { session } };
};
