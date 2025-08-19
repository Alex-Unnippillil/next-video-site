import Head from 'next/head';

export default function Home() {
  const meta = {
    title: 'Next Video Site',
    description: 'Watch our collection of videos.',
    url: 'http://localhost:3000/',
    image: '/preview.png',
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={meta.url} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
      </Head>
      <main>
        <h1>{meta.title}</h1>
      </main>
    </>
  );
}
