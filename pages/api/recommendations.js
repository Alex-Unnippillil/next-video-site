import { videos } from '../../data/videos.js';

export default function handler(req, res) {
  res.status(200).json(videos);
}
