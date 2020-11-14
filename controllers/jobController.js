const Movie = require('../models/movieModel');
const Job = require('./../models/jobModel');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const MovieScrapper = require('./../utils/movieScrapper');
const catchAsync = require('./../utils/catchAsync');

const getMovieData = async (link, movieParams) => {
  try {
    //1. check if movie Id is valid
    const movieId = MovieScrapper.getMovieID(link);
    if (movieId === '') {
      return false;
    }

    //2. check if movie already exist
    const regex = new RegExp(movieId, 'i'); // i for case insensitive
    const isExist = await Movie.findOne({ imdbLink: { $regex: regex } });

    if (!movieParams.overwrite) {
      if (isExist) {
        return false;
      }
    }

    // //3. scrapt movie data
    let movieData = await new MovieScrapper(link).getOmdbData();
    Object.keys(movieData).forEach(
      key => movieData[key] === undefined && delete movieData[key]
    );
    movieData.isClassic = movieParams.isClassic;
    movieData.isKids = movieParams.isKids;
    if (movieData === '') {
      return false;
    }

    // //4. store data in database
    if (isExist) {
      await Movie.findByIdAndUpdate(isExist._id, movieData, {
        new: true,
        runValidators: true
      });
    } else {
      await Movie.create(movieData);
    }
  } catch (err) {
    return false;
  }

  return true;
};

exports.getAllJobs = catchAsync(async (req, res) => {
  // Execute query
  const features = new APIFeatures(Job.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const jobs = await features.query;

  // Send response
  res.status(200).json({
    status: 'success',
    results: jobs.length,
    data: {
      jobs
    }
  });
});
exports.getJob = catchAsync(async (req, res) => {
  const job = await Job.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      job
    }
  });
});
exports.createJob = catchAsync(async (req, res) => {
  const newJob = await Job.create({
    jobType: req.body.jobType,
    data: req.body.data
  });

  res.status(201).json({
    status: 'success',
    data: {
      job: newJob
    }
  });
});
exports.updateJob = catchAsync(async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
    status: 'success',
    data: { job }
  });
});
exports.deleteJob = catchAsync(async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null
  });
});
exports.importMovieData = catchAsync(async (req, res, next) => {
  //1. get imdbID
  const { imdbLink } = req.body;
  const isKids = req.body.isKids ? req.body.isKids : false;
  const isClassic = req.body.isClassic ? req.body.isClassic : false;
  const overwrite = req.body.overwrite ? req.body.overwrite : false;

  const movieId = MovieScrapper.getMovieID(imdbLink);
  if (movieId === '') {
    return next(
      new AppError(`Could not extract movie Id from url (${imdbLink}).`, 400)
    );
  }

  //2. check if movie already exist
  const str = movieId;
  const regex = new RegExp(str, 'i'); // i for case insensitive
  const isExist = await Movie.findOne({ imdbLink: { $regex: regex } });

  //2a if exist check if overwrite or exit with '200' already exist
  if (!overwrite) {
    if (isExist) {
      return next(new AppError('Movie already exist in database', 400));
    }
  }

  // //3. scrapt movie data
  let movieData = await new MovieScrapper(imdbLink).getOmdbData();
  Object.keys(movieData).forEach(
    key => movieData[key] === undefined && delete movieData[key]
  );
  movieData.isClassic = isClassic;
  movieData.isKids = isKids;
  if (movieData === '') {
    return next(new AppError(`Cound not extract movie data. ${imdbLink}`, 400));
  }

  // //4. store data in database
  if (isExist) {
    const movie = await Movie.findByIdAndUpdate(isExist._id, movieData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'succes',
      data: {
        data: movie
      }
    });
  } else {
    const newMovie = await Movie.create(movieData);
    res.status(201).json({
      status: 'success',
      data: {
        data: newMovie
      }
    });
  }
});
exports.executeJob = async () => {
  let pendJob;
  try {
    //values: ['Pending', 'Executing', 'Completed', 'Aborted', 'Failed'],
    const running = await Job.findOne({ status: 'Executing' });
    if (running) {
      return;
    }

    pendJob = await Job.findOne({ status: 'Pending' });
    if (!pendJob) {
      return;
    }

    //start executing
    console.log('Running Movie Scrapper Job');
    await Job.findByIdAndUpdate(pendJob._id, {
      status: 'Executing'
    });
    //get parameters
    const isKids = pendJob.data.isKids ? pendJob.data.isKids : false;
    const isClassic = pendJob.data.isClassic ? pendJob.data.isClassic : false;
    const overwrite = pendJob.data.overwrite ? pendJob.data.overwrite : false;
    //get links
    const links = pendJob.data.imdbLink;
    await Job.findByIdAndUpdate(pendJob._id, {
      passed: 0,
      failed: 0,
      total: links.length
    });

    //loop
    for (let index = 0; index < links.length; index++) {
      const element = links[index];
      const result = await getMovieData(element, {
        isKids,
        isClassic,
        overwrite
      });
      if (result) {
        await Job.findByIdAndUpdate(pendJob._id, { $inc: { passed: 1 } });
      } else {
        await Job.findByIdAndUpdate(pendJob._id, { $inc: { failed: 1 } });
      }
    }

    await Job.findByIdAndUpdate(pendJob._id, {
      status: 'Completed'
    });
  } catch (err) {
    try {
      await Job.findByIdAndUpdate(pendJob._id, {
        status: 'Failed'
      });
    } catch (err) {
      console.log(err);
    }
  }
};
