const express = require('express');
const { AWSXRay } = require('../tracing');

const app = express();
app.use(AWSXRay.express.openSegment('ecs'));

app.get('/', (req, res) => {
  res.send('Hello from ECS');
});

app.use(AWSXRay.express.closeSegment());

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`ECS service listening on ${port}`);
});
