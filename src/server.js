const express = require('express');
const { initiateUpload, getUploadUrl, completeUpload, abortUpload } = require('./uploadService');

const app = express();
app.use(express.json());

app.post('/upload/initiate', async (req, res) => {
  try {
    const { fileName, fileType, fileSize } = req.body;
    const result = await initiateUpload({ fileName, fileType, fileSize });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/upload/url', async (req, res) => {
  try {
    const { sessionId, partNumber } = req.query;
    const result = await getUploadUrl({ sessionId, partNumber: parseInt(partNumber, 10) });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/upload/complete', async (req, res) => {
  try {
    const { sessionId, parts } = req.body;
    const result = await completeUpload({ sessionId, parts });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/upload/abort', async (req, res) => {
  try {
    const { sessionId } = req.body;
    await abortUpload({ sessionId });
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
