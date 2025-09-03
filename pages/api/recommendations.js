export default function handler(req, res) {
  const origin = req.headers.origin;
  if (origin && (origin.endsWith('.vercel.app') || origin.startsWith('http://localhost'))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Range');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json([
    {
      id: 1,
      title: 'Understanding Async/Await',
      thumbnail: '/thumbnails/async-await.png',
      url: 'https://example.com/videos/1'
    },
    {
      id: 2,
      title: 'JavaScript Promises in Depth',
      thumbnail: '/thumbnails/promises.png',
      url: 'https://example.com/videos/2'
    },
    {
      id: 3,
      title: 'React Hooks Crash Course',
      thumbnail: '/thumbnails/hooks.png',
      url: 'https://example.com/videos/3'
    }
  ]);
}
