import crypto from 'crypto';
import { videos } from '../../data/videos.js';

const secret = process.env.SHARE_LINK_SECRET || 'mysecret';

export default function handler(req, res) {
  const { id } = req.query;
  const video = videos.find(v => String(v.id) === String(id));

  if (!video) {
    res.status(404).json({ error: 'Video not found' });
    return;
  }

  const signature = crypto
    .createHmac('sha256', secret)
    .update(video.url)
    .digest('hex');

  const link = `${video.url}?sig=${signature}`;
  res.status(200).json({ link });
}
