const express = require('express');

const app = express();

app.use(express.static(`${__dirname}/dist`));

app.get('/*', (_req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server listening on port 3000');
});
