export default function handler(req, res) {
  res.status(200).json([
    {
      id: 1,
      poster: 'https://via.placeholder.com/320x180?text=Clip+1',
      src: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
    {
      id: 2,
      poster: 'https://via.placeholder.com/320x180?text=Clip+2',
      src: 'https://www.w3schools.com/html/movie.mp4'
    },
    {
      id: 3,
      poster: 'https://via.placeholder.com/320x180?text=Clip+3',
      src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
    }
  ]);
}
