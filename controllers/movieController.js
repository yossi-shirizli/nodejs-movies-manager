const Movie = require('./../models/movieModel');

exports.getAllMovies = (req, res) => {
  res.status(200).json({
    status: 'success'
    // results: movies.length,
    // data: {
    //   movies,
    // },
  });
};
exports.getMovie = (req, res) => {
  const id = req.params.id * 1;

  // const movie = movies.find((el) => el.id === id);

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     movie,
  //   },
  // });
};
exports.createMovie = async (req, res) => {
  try {
    const newMovie = await Movie.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        movie: newMovie
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!'
    });
  }
};
exports.updateMovie = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      movie: '<Updated movie here...>'
    }
  });
};
exports.deleteMovie = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};
