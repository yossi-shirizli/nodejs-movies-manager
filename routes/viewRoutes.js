const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.getOverview);
router.get('/all-releases', viewsController.getAllReleases);
router.get('/movie/:slug', viewsController.getMovie);
router.get('/release/:id', viewsController.getRelease);
router.get('/todo', viewsController.getTodos);
router.get('/load-data', viewsController.getBatchload);
router.get('/add-movie', viewsController.getAddMovie);
router.get('/manage/movie/:slug', viewsController.getEditMovie);
router.get('/stats', viewsController.getStatistics);

module.exports = router;
