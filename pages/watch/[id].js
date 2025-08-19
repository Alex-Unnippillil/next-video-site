import Head from 'next/head';

const videos = {
  '1': { title: 'Video 1', description: 'Description for video 1' },
  '2': { title: 'Video 2', description: 'Description for video 2' },
};

export async function getServerSideProps({ params }) {
  const video = videos[params.id] || { title: 'Unknown video', description: 'No description available' };
  return { props: { video, id: params.id } };
}

export default function Watch({ video, id }) {
  const meta = {
    title: `${video.title} - Next Video Site`,
    description: video.description,
    url: `http://localhost:3000/watch/${id}`,
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
        <h1>{video.title}</h1>
        <p>{video.description}</p>
      </main>
    </>
  );
}
