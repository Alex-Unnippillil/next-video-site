import express from 'express';
import { getPlaybackUrl, createSession } from './lib/db.js';

const app = express();
app.use(express.json());

app.get('/playback/:channelArn', async (req, res) => {
  try {
    const url = await getPlaybackUrl(req.params.channelArn);
    if (!url) {
      return res.status(404).json({ error: 'Channel not found' });
    }
    res.json({ playbackUrl: url });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/sessions', async (req, res) => {
  const { channelArn, startedAt } = req.body;
  if (!channelArn || !startedAt) {
    return res.status(400).json({ error: 'channelArn and startedAt are required' });
  }
  try {
    const id = await createSession({ channelArn, startedAt });
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
