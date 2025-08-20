export default function handler(req, res) {
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
