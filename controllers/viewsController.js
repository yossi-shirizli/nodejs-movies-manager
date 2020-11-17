const Movie = require('./../models/movieModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1. get movies data from db
  // const movies = await Movie.find();
  const query = Movie.find().sort('title releaseDate');
  const movies = await query;

  // 2. buid template
  // res.status(200).render('base');
  // 3. render template using tours data
  res.status(200).render('overview', {
    title: 'All Movies',
    movies
  });
});

exports.getMovie = catchAsync(async (req, res, next) => {
  // const movie = await Movie.findOne({ slug: req.params.slug }).populate({
  //   path: 'reviews',
  //   fields: 'review rating user',
  // });
  const movie = await Movie.findOne({ slug: req.params.slug }).populate({
    path: 'releases'
  });

  if (!movie) {
    return next(new AppError('There is no movie with that name', 404));
  }

  res.status(200).render('movie', {
    title: `${movie.title}`,
    movie
  });
});
