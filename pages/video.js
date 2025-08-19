import { getEntitlement } from '../lib/db';

export async function getServerSideProps({ query }) {
  const { email } = query;
  if (!email) {
    return { redirect: { destination: '/subscribe', permanent: false } };
  }
  const entitlement = await getEntitlement(email);
  if (!entitlement) {
    return { redirect: { destination: '/subscribe', permanent: false } };
  }
  return { props: { email, entitlement } };
}

export default function Video({ email, entitlement }) {
  return (
    <div>
      <h1>Protected Video</h1>
      <p>Welcome {email}! You have {entitlement} access.</p>
      <video controls width="600">
        <source src="/sample.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
