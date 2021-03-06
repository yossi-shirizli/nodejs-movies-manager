const Movie = require('./../models/movieModel');
const Release = require('./../models/releaseModel');
const Category = require('./../models/categoryModel');
const HDR = require('./../models/hdrModel');
const Source = require('./../models/sourceModel');
const Location = require('./../models/locationModel');
const Subtitle = require('./../models/subtitleModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getMoviesOverview = catchAsync(async (req, res, next) => {
  // 1. get movies data from db
  // const movies = await Movie.find();
  const query = Movie.find().sort('title releaseDate');
  const movies = await query;
  const filterMovies = movies.map(
    el =>
      new Object({
        _id: el._id,
        title: el.title,
        displayTitle: el.displayTitle,
        imdbLink: el.imdbLink,
        slug: el.slug,
        isKids: el.isKids,
        isClassic: el.isClassic
      })
  );
  // console.log(filterMovies);
  // 2. buid template
  // res.status(200).render('base');
  // 3. render template using tours data
  res.status(200).render('moviesOverview', {
    title: 'All Movies',
    movies: filterMovies
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

exports.getAddMovie = catchAsync(async (req, res, next) => {
  res.status(200).render('moviesAdd', {
    title: 'Add Movie'
  });
});

exports.getEditMovie = catchAsync(async (req, res, next) => {
  const movie = await Movie.findOne({ slug: req.params.slug });

  if (!movie) {
    return next(new AppError('There is no movie with that name', 404));
  }

  res.status(200).render('moviesEdit', {
    title: `${movie.title}`,
    movie
  });
});

// Releases
exports.getReleasesOverview = catchAsync(async (req, res, next) => {
  // const releases = await Release.find().sort('name');
  const releases = await Release.find()
    .populate({
      path: 'movie',
      select: 'title releaseDate displayTitle'
    })
    .sort('name');
  // console.log(releases);
  res.status(200).render('releasesOverview', {
    title: 'All Releases',
    releases
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

exports.getAddRelease = catchAsync(async (req, res, next) => {
  // const query = Movie.find().sort('title releaseDate');
  const movies = await Movie.find().sort('title releaseDate');
  const filterMovies = movies.map(
    el =>
      new Object({
        _id: el._id,
        title: el.title,
        displayTitle: el.displayTitle
      })
  );

  const categories = await Category.find().sort('-resolution');
  const hdr = await HDR.find();
  const sources = await Source.find();
  const locations = await Location.find();
  const subtitles = await Subtitle.find();

  res.status(200).render('releasesAdd', {
    title: 'Add Release',
    movies: filterMovies,
    categories,
    hdr,
    sources,
    locations,
    subtitles
  });
});

exports.getEditRelease = catchAsync(async (req, res, next) => {
  const release = await Release.findOne({ _id: req.params.id }).populate({
    path: 'movie',
    select: '-__v -createdAt -updatedAt'
  });

  if (!release) {
    return next(new AppError('There is no release with that id', 404));
  }

  const movies = await Movie.find().sort('title releaseDate');
  const filterMovies = movies.map(
    el =>
      new Object({
        _id: el._id,
        title: el.title,
        displayTitle: el.displayTitle
      })
  );

  const categories = await Category.find().sort('-resolution');
  const hdr = await HDR.find();
  const sources = await Source.find();
  const locations = await Location.find();
  const subtitles = await Subtitle.find();

  res.status(200).render('releasesEdit', {
    title: 'Edit Release',
    release,
    movies: filterMovies,
    categories,
    hdr,
    sources,
    locations,
    subtitles
  });
});

// STATS
exports.getMoviesStatistics = catchAsync(async (req, res, next) => {
  res.status(200).render('moviesStatistics', {
    title: 'Movies Statistics'
  });
});
exports.getReleasesStatistics = catchAsync(async (req, res, next) => {
  res.status(200).render('releasesStatistics', {
    title: 'Releases Statistics'
  });
});

// TODO
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

// BATCH
exports.getBatchload = catchAsync(async (req, res, next) => {
  res.status(200).render('batchload', {
    title: 'Load Data'
  });
});
