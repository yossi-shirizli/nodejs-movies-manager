const AppError = require('../utils/appError');
// const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const Category = require('../models/categoryModel');
const Hdr = require('../models/hdrModel');
const Source = require('../models/sourceModel');
const Subtitle = require('../models/subtitleModel');
const Location = require('../models/locationModel');
const State = require('../models/stateModel');

//Categories
exports.getAllCategories = catchAsync(async (req, res, next) => {
  // Execute query
  let query = Category.find();
  query = query.sort('-resolution');
  const categories = await query;

  // Send response
  res.status(200).json({
    status: 'success',
    results: categories.length,
    data: {
      categories
    }
  });
  //error code 404
});
exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new AppError('No category found with that id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      category
    }
  });
  //error code 404
});
exports.createCategory = catchAsync(async (req, res, next) => {
  const newCategory = await Category.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      category: newCategory
    }
  });
  //error code 400
});
exports.updateCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!category) {
    return next(new AppError('No category found with that id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { category }
  });
  //error code 404
});
exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return next(new AppError('No category found with that id', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
  //error code 404
});

//HDR
exports.getAllHDR = catchAsync(async (req, res, next) => {
  // Execute query
  const hdrs = await Hdr.find();

  // Send response
  res.status(200).json({
    status: 'success',
    results: hdrs.length,
    data: {
      hdr: hdrs
    }
  });
  //error code 404
});
exports.getHDR = catchAsync(async (req, res, next) => {
  const hdr = await Hdr.findById(req.params.id);

  if (!hdr) {
    return next(new AppError('No HDR found with that id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      hdr
    }
  });
  //error code 404
});
exports.createHDR = catchAsync(async (req, res, next) => {
  const newHDR = await Hdr.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      hdr: newHDR
    }
  });
  //error code 400
});
exports.updateHDR = catchAsync(async (req, res, next) => {
  const hdr = await Hdr.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!hdr) {
    return next(new AppError('No HDR found with that id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { hdr }
  });
  //error code 404
});
exports.deleteHDR = catchAsync(async (req, res, next) => {
  const hdr = await Hdr.findByIdAndDelete(req.params.id);

  if (!hdr) {
    return next(new AppError('No HDR found with that id', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
  //error code 404
});

//Source
exports.getAllSources = catchAsync(async (req, res, next) => {
  // Execute query
  const sources = await Source.find();

  // Send response
  res.status(200).json({
    status: 'success',
    results: sources.length,
    data: {
      sources
    }
  });
  //error code 404
});
exports.getSource = catchAsync(async (req, res, next) => {
  const source = await Source.findById(req.params.id);

  if (!source) {
    return next(new AppError('No source found with that id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      source
    }
  });
  //error code 404
});
exports.createSource = catchAsync(async (req, res, next) => {
  const newSource = await Source.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      source: newSource
    }
  });
  //error code 400
});
exports.updateSource = catchAsync(async (req, res, next) => {
  const source = await Source.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!source) {
    return next(new AppError('No source found with that id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { source }
  });
  //error code 404
});
exports.deleteSource = catchAsync(async (req, res, next) => {
  const source = await Source.findByIdAndDelete(req.params.id);

  if (!source) {
    return next(new AppError('No source found with that id', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
  //error code 404
});

//Subtitle
exports.getAllSubtitles = catchAsync(async (req, res, next) => {
  // Execute query
  const subtitles = await Subtitle.find();

  // Send response
  res.status(200).json({
    status: 'success',
    results: subtitles.length,
    data: {
      subtitles
    }
  });
});
exports.getSubtitle = catchAsync(async (req, res, next) => {
  const subtitle = await Subtitle.findById(req.params.id);

  if (!subtitle) {
    return next(new AppError('No subtitle found with that id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      subtitle
    }
  });
  //error code 404
});
exports.createSubtitle = catchAsync(async (req, res, next) => {
  const newSubtitle = await Subtitle.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      subtitle: newSubtitle
    }
  });
});
exports.updateSubtitle = catchAsync(async (req, res, next) => {
  const subtitle = await Subtitle.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!subtitle) {
    return next(new AppError('No subtitle found with that id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { subtitle }
  });
});
exports.deleteSubtitle = catchAsync(async (req, res, next) => {
  const subtitle = await Subtitle.findByIdAndDelete(req.params.id);

  if (!subtitle) {
    return next(new AppError('No subtitle found with that id', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
  //error code 404
});

//Location
exports.getAllLocations = catchAsync(async (req, res, next) => {
  // Execute query
  const locations = await Location.find();

  // Send response
  res.status(200).json({
    status: 'success',
    results: locations.length,
    data: {
      locations
    }
  });
});
exports.getLocation = catchAsync(async (req, res, next) => {
  const location = await Location.findById(req.params.id);

  if (!location) {
    return next(new AppError('No location found with that id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      location
    }
  });
  //error code 404
});
exports.createLocation = catchAsync(async (req, res, next) => {
  const newLocation = await Location.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      location: newLocation
    }
  });
});
exports.updateLocation = catchAsync(async (req, res, next) => {
  const location = await Location.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!location) {
    return next(new AppError('No location found with that id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { location }
  });
});
exports.deleteLocation = catchAsync(async (req, res, next) => {
  const location = await Location.findByIdAndDelete(req.params.id);

  if (!location) {
    return next(new AppError('No location found with that id', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
  //error code 404
});

//Location
exports.getAllStates = catchAsync(async (req, res, next) => {
  // Execute query
  const states = await State.find();

  // Send response
  res.status(200).json({
    status: 'success',
    results: states.length,
    data: {
      states
    }
  });
});
exports.getState = catchAsync(async (req, res, next) => {
  const state = await State.findById(req.params.id);

  if (!state) {
    return next(new AppError('No state found with that id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      state
    }
  });
  //error code 404
});
exports.createState = catchAsync(async (req, res, next) => {
  const newState = await State.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      state: newState
    }
  });
});
exports.updateState = catchAsync(async (req, res, next) => {
  const state = await State.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!state) {
    return next(new AppError('No state found with that id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { state }
  });
});
exports.deleteState = catchAsync(async (req, res, next) => {
  const state = await State.findByIdAndDelete(req.params.id);

  if (!state) {
    return next(new AppError('No state found with that id', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
  //error code 404
});
