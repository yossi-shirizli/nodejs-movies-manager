const Release = require('./../models/releaseModel');
const factory = require('./handlerFactory');

//middleware to support nested routes
exports.setMovieId = (req, res, next) => {
  //Allow nested routes
  if (!req.body.movie) req.body.movie = req.params.movieId;

  next();
};
exports.getAllReleases = factory.getAll(Release);
exports.getRelease = factory.getOne(Release);
exports.createRelease = factory.createOne(Release);
exports.updateRelease = factory.updateOne(Release);
exports.deleteRelease = factory.deleteOne(Release);
