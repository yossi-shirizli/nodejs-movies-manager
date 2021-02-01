const Movie = require('./../models/movieModel');
const Release = require('./../models/releaseModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

exports.aliasShortMovies = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = 'duration,-ratingsAverage';
  req.query.fields = 'title,duration,ratingsAverage,plot,imdbLink';
  next();
};
exports.getAllMovies = factory.getAll(Movie);
exports.getMovie = factory.getOne(
  Movie,
  {
    path: 'releases',
    select: '-__v -createdAt -updatedAt'
  },
  {
    path: 'selectedReleases',
    select: '-__v -createdAt -updatedAt'
  }
);
exports.createMovie = factory.createOne(Movie);
exports.updateMovie = factory.updateOne(Movie);
// exports.deleteMovie1 = factory.deleteOne(Movie);
exports.deleteMovie = catchAsync(async (req, res, next) => {
  // const doc = await Movie.findByIdAndDelete(req.params.id);

  // console.log(req.params.id);
  const doc = await Movie.findById(req.params.id);
  // console.log(test);
  if (!doc) {
    return next(new AppError('No movie found for this Id', 404));
  }
  const releases = await Release.deleteMany({ movie: req.params.id });
  const movie = await Movie.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'succes',
    data: null
  });
});

exports.getMainMoviesStats = catchAsync(async (req, res, next) => {
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
  //error code 404
});
exports.getKidsMoviesStats = catchAsync(async (req, res, next) => {
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
  //error code 404
});
exports.getMoviesStatusStats = catchAsync(async (req, res, next) => {
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
  //error code 404
});
exports.getMoviesTypesStats = catchAsync(async (req, res, next) => {
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
  //error code 404
});
