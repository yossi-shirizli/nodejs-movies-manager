const express = require('express');
const jobController = require('./../controllers/jobController');

const router = express.Router();

router
  .route('/')
  .get(jobController.getAllJobs)
  .post(jobController.createJob);
router
  .route('/:id')
  .get(jobController.getJob)
  .patch(jobController.updateJob)
  .delete(jobController.deleteJob);
router.route('/import').post(jobController.importMovieData);

module.exports = router;
