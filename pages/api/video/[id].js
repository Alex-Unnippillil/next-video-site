export default function handler(req, res) {
  const { id } = req.query;
  const url = `https://example.com/videos/${id}?t=${Date.now()}`;
  const expiresAt = new Date(Date.now() + 60000).toISOString();
  res.status(200).json({ url, expiresAt });
}
