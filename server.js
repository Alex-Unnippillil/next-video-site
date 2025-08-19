const express = require('express');
const React = require('react');
const { renderToString } = require('react-dom/server');

function App() {
  return React.createElement('div', null, 'Hello from SSR');
}

const server = express();

server.get('*', (req, res) => {
  const html = renderToString(React.createElement(App));
  res.send(`<!DOCTYPE html><html><body><div id="root">${html}</div></body></html>`);
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`SSR server running on port ${port}`);
});
