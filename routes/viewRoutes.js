const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

//movies
router.get('/', viewsController.getMoviesOverview);
router.get('/movie/:slug', viewsController.getMovie);
router.get('/add-movie', viewsController.getAddMovie);
router.get('/manage/movie/:slug', viewsController.getEditMovie);
//rleases
router.get('/releases', viewsController.getReleasesOverview);
router.get('/release/:id', viewsController.getRelease);
router.get('/add-release', viewsController.getAddRelease);
router.get('/manage/release/:id', viewsController.getEditRelease);
//stats
router.get('/statistics/movies', viewsController.getMoviesStatistics);
router.get('/statistics/releases', viewsController.getReleasesStatistics);
//jobs
router.get('/load-data', viewsController.getBatchload);
router.get('/todo', viewsController.getTodos);

module.exports = router;
