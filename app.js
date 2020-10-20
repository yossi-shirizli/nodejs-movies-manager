const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res
    .status(200)
    .json({
      app: 'Movie Collector',
      status: 'success',
      message: 'movies hello',
    });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Express app is running on port ${port}...`);
});
