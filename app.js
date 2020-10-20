const fs = require('fs');
const express = require('express');

const app = express();
//middleware - put the data from the body on the request object
app.use(express.json());

const movies = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/movies.json`));
app.get('/api/v1/movies', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: movies.length,
    data: {
      movies,
    },
  });
});
app.post('/api/v1/movies', (req, res) => {
  const newId = movies[movies.length - 1].id + 1;
  const newMovie = Object.assign({ id: newId }, req.body);
  movies.push(newMovie);
  fs.writeFile(
    `${__dirname}/dev-data/movies.json`,
    JSON.stringify(movies),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          movie: newMovie,
        },
      });
    }
  );
  res.send('Done');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Express app is running on port ${port}...`);
});
