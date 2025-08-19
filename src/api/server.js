const express = require('express');
const { AWSXRay } = require('../tracing');

const app = express();
app.use(AWSXRay.express.openSegment('api'));

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from API' });
});

app.use(AWSXRay.express.closeSegment());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API listening on ${port}`);
});
