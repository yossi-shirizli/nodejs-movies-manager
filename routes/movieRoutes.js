const express = require('express');
const movieController = require('./../controllers/movieController');

const router = express.Router();

// router.param('id', movieController.checkId);

router
  .route('/top-5-short')
  .get(movieController.aliasShortMovies, movieController.getAllMovies);
router.route('/main-movie-stats').get(movieController.getMainMoviesStats);
router.route('/kids-movie-stats').get(movieController.getKidsMoviesStats);
router.route('/movie-status-stats').get(movieController.getMoviesStatusStats);
router.route('/movie-type-stats').get(movieController.getMoviesTypesStats);

router
  .route('/')
  .get(movieController.getAllMovies)
  .post(movieController.createMovie);
router
  .route('/:id')
  .get(movieController.getMovie)
  .patch(movieController.updateMovie)
  .delete(movieController.deleteMovie);

module.exports = router;
