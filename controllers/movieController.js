const Movie = require('./../models/movieModel');
const APIFeatures = require('./../utils/apiFeatures');

exports.aliasShortMovies = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = 'duration,-ratingsAverage';
  req.query.fields = 'title,duration,ratingsAverage,plot,imdbLink';
  next();
};

exports.getAllMovies = async (req, res) => {
  try {
    // Execute query
    const features = new APIFeatures(Movie.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const movies = await features.query;

    // Send response
    res.status(200).json({
      status: 'success',
      results: movies.length,
      data: {
        movies
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        movie
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
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
      message: err
    });
  }
};
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: { movie }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
exports.deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getMainMoviesStats = async (req, res) => {
  console.log('got it');
  try {
    const stats = await Movie.aggregate([
      //Stages:
      // match - select or filter documents (same as query)
      {
        $match: {
          isKids: false
        }
      },
      // group - group useing accumolator
      {
        $group: {
          // _id -> what we want to group by. if we don't want group _id: null
          _id: null,
          numMovies: { $sum: 1 },
          totalDuration: { $sum: '$duration' },
          avgRating: { $avg: '$ratingsAverage' }
        }
      },
      {
        $project: {
          _id: 0
        }
      }
    ]);

    const byCategory = await Movie.aggregate([
      //Stages:
      // match - select or filter documents (same as query)
      {
        $match: {
          isKids: false
        }
      },
      // group - group useing accumolator
      {
        $group: {
          // _id -> what we want to group by. if we don't want group _id: null
          _id: '$isClassic',
          numMovies: { $sum: 1 },
          totalDuration: { $sum: '$duration' },
          avgRating: { $avg: '$ratingsAverage' }
        }
      },
      {
        $addFields: { classic: '$_id' }
      },
      {
        $project: {
          _id: 0
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats,
        byCategory
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getKidsMoviesStats = async (req, res) => {
  console.log('got it');
  try {
    const stats = await Movie.aggregate([
      //Stages:
      // match - select or filter documents (same as query)
      {
        $match: {
          isKids: true
        }
      },
      // group - group useing accumolator
      {
        $group: {
          // _id -> what we want to group by. if we don't want group _id: null
          _id: null,
          numMovies: { $sum: 1 },
          totalDuration: { $sum: '$duration' },
          avgRating: { $avg: '$ratingsAverage' }
        }
      },
      {
        $project: {
          _id: 0
        }
      }
    ]);

    const byCategory = await Movie.aggregate([
      //Stages:
      // match - select or filter documents (same as query)
      {
        $match: {
          isKids: true
        }
      },
      // group - group useing accumolator
      {
        $group: {
          // _id -> what we want to group by. if we don't want group _id: null
          _id: '$isClassic',
          numMovies: { $sum: 1 },
          totalDuration: { $sum: '$duration' },
          avgRating: { $avg: '$ratingsAverage' }
        }
      },
      {
        $addFields: { classic: '$_id' }
      },
      {
        $project: {
          _id: 0
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats,
        byCategory
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getMoviesStatusStats = async (req, res) => {
  try {
    const stats = await Movie.aggregate([
      {
        $group: {
          // _id -> what we want to group by. if we don't want group _id: null
          _id: '$status',
          count: { $sum: 1 },
          totalDuration: { $sum: '$duration' },
          avgRating: { $avg: '$ratingsAverage' }
        }
      },
      {
        $addFields: { status: '$_id' }
      },
      {
        $project: {
          _id: 0
        }
      }
    ]);

    const byType = await Movie.aggregate([
      // group - group useing accumolator
      {
        $group: {
          // _id -> what we want to group by. if we don't want group _id: null
          _id: {
            status: '$status',
            kidsMovies: '$isKids'
          },
          numMovies: { $sum: 1 },
          count: { $sum: 1 },
          totalDuration: { $sum: '$duration' },
          avgRating: { $avg: '$ratingsAverage' }
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats,
        byType
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getMoviesTypesStats = async (req, res) => {
  try {
    const stats = await Movie.aggregate([
      {
        $group: {
          // _id -> what we want to group by. if we don't want group _id: null
          _id: '$isKids',
          count: { $sum: 1 },
          totalDuration: { $sum: '$duration' },
          avgRating: { $avg: '$ratingsAverage' }
        }
      },
      {
        $addFields: { kidsMovies: '$_id' }
      },
      {
        $project: {
          _id: 0
        }
      }
    ]);

    const byCategory = await Movie.aggregate([
      // group - group useing accumolator
      {
        $group: {
          // _id -> what we want to group by. if we don't want group _id: null
          _id: {
            kidsMovies: '$isKids',
            status: '$status'
          },
          numMovies: { $sum: 1 },
          count: { $sum: 1 },
          totalDuration: { $sum: '$duration' },
          avgRating: { $avg: '$ratingsAverage' }
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats,
        byCategory
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
