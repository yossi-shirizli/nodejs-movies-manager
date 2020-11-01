const Movie = require('./../model/tourModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1. get movies data from db
  const movie = await Movie.find();

  // 2. buid template

  // 3. render template using tours data
  res.status(200).render('overview', {
    title: 'All Movies',
    movies
  });
});
