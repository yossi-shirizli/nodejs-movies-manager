const fs = require('fs');

const movies = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/movies.json`)
);
exports.checkId = (req, res, next, val) => {
  if (req.params.id * 1 > movies.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  next();
};
exports.checkBody = (req, res, next, val) => {
  if (!req.body.name || !req.body.ratingsAverage) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or avarageRating',
    });
  }
  next();
};

exports.getAllMovies = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: movies.length,
    data: {
      movies,
    },
  });
};
exports.getMovie = (req, res) => {
  const id = req.params.id * 1;
  const movie = movies.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      movie,
    },
  });
};
exports.createMovie = (req, res) => {
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
};
exports.updateMovie = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      movie: '<Updated movie here...>',
    },
  });
};
exports.deleteMovie = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
