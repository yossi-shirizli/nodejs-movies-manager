const Movie = require('./../models/movieModel');
const Release = require('./../models/releaseModel');
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

exports.getAllReleases = catchAsync(async (req, res, next) => {
  // const releases = await Release.find().sort('name');
  const releases = await Release.find()
    .populate({
      path: 'movie',
      select: 'title releaseDate displayTitle'
    })
    .sort('name');
  // console.log(releases);
  res.status(200).render('allReleases', {
    title: 'All Releases',
    releases
  });
});

exports.getMovie = catchAsync(async (req, res, next) => {
  const movie = await Movie.findOne({ slug: req.params.slug })
    .populate({
      path: 'releases',
      select: '-__v -createdAt -updatedAt'
    })
    .populate({
      path: 'selectedReleases',
      select: '-__v -createdAt -updatedAt'
    });
  // console.log(movie);

  if (!movie) {
    return next(new AppError('There is no movie with that name', 404));
  }

  res.status(200).render('movie', {
    title: `${movie.title}`,
    movie
  });
});

exports.getRelease = catchAsync(async (req, res, next) => {
  const release = await Release.findOne({ _id: req.params.id }).populate({
    path: 'movie',
    select: '-__v -createdAt -updatedAt'
  });
  // console.log(release);

  if (!release) {
    return next(new AppError('There is no release with that id', 404));
  }

  res.status(200).render('release', {
    title: `${release.movie.title}`,
    release
  });
});

exports.getTodos = catchAsync(async (req, res, next) => {
  // div Search
  const searchItems = await Movie.find({ status: 'Search' }).populate({
    path: 'movie',
    select: '-__v -createdAt -updatedAt'
  });
  // div Que
  const queItems = await Release.find({ status: 'Que' }).populate({
    path: 'movie',
    select: '-__v -createdAt -updatedAt'
  });
  // div Download
  const downloadItems = await Release.find({ status: 'Download' }).populate({
    path: 'movie',
    select: '-__v -createdAt -updatedAt'
  });
  // div Build
  const buildItems = await Release.find({ status: 'Build' }).populate({
    path: 'movie',
    select: '-__v -createdAt -updatedAt'
  });
  // div Check Subtitles
  const checkSubtitlesItems = await Release.find({
    status: 'CheckSubtitles'
  }).populate({
    path: 'movie',
    select: '-__v -createdAt -updatedAt'
  });
  // console.log(searchItems);

  res.status(200).render('todo', {
    title: 'Todo',
    searchItems,
    queItems,
    downloadItems,
    buildItems,
    checkSubtitlesItems
  });
});

exports.getBatchload = catchAsync(async (req, res, next) => {
  res.status(200).render('batchload', {
    title: 'Load Data'
  });
});

exports.getEditMovie = catchAsync(async (req, res, next) => {
  const movie = await Movie.findOne({ slug: req.params.slug })
    .populate({
      path: 'releases',
      select: '-__v -createdAt -updatedAt'
    })
    .populate({
      path: 'selectedReleases',
      select: '-__v -createdAt -updatedAt'
    });
  // console.log(movie);

  if (!movie) {
    return next(new AppError('There is no movie with that name', 404));
  }

  res.status(200).render('manageMovie', {
    title: `${movie.title}`,
    movie
  });
});

exports.getAddMovie = catchAsync(async (req, res, next) => {
  res.status(200).render('manageMovie', {
    title: 'Add Movie'
  });
});

exports.getStatistics = catchAsync(async (req, res, next) => {
  res.status(200).render('statistics', {
    title: 'Statistics'
  });
});
