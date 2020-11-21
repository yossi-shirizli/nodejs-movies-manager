const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.getOverview);
router.get('/movie/:slug', viewsController.getMovie);
router.get('/release/:id', viewsController.getRelease);
// router.get('/todo',viewsController.getToDoList);

module.exports = router;
