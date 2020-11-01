const express = require('express');
const releaseController = require('./../controllers/releaseController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(releaseController.getAllReleases)
  .post(releaseController.setMovieId, releaseController.createRelease);
router
  .route('/:id')
  .get(releaseController.getRelease)
  .patch(releaseController.updateRelease)
  .delete(releaseController.deleteRelease);

module.exports = router;
