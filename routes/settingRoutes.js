const express = require('express');
const settingsController = require('./../controllers/settingController');

const router = express.Router();

router
  .route('/categories')
  .get(settingsController.getAllCategories)
  .post(settingsController.createCategory);
router
  .route('/categories/:id')
  .get(settingsController.getCategory)
  .patch(settingsController.updateCategory)
  .delete(settingsController.deleteCategory);

router
  .route('/hdr')
  .get(settingsController.getAllHDR)
  .post(settingsController.createHDR);
router
  .route('/hdr/:id')
  .get(settingsController.getHDR)
  .patch(settingsController.updateHDR)
  .delete(settingsController.deleteHDR);

router
  .route('/sources')
  .get(settingsController.getAllSources)
  .post(settingsController.createSource);
router
  .route('/sources/:id')
  .get(settingsController.getSource)
  .patch(settingsController.updateSource)
  .delete(settingsController.deleteSource);

router
  .route('/subtitles')
  .get(settingsController.getAllSubtitles)
  .post(settingsController.createSubtitle);
router
  .route('/subtitles/:id')
  .get(settingsController.getSubtitle)
  .patch(settingsController.updateSubtitle)
  .delete(settingsController.deleteSubtitle);

router
  .route('/locations')
  .get(settingsController.getAllLocations)
  .post(settingsController.createLocation);
router
  .route('/locations/:id')
  .get(settingsController.getLocation)
  .patch(settingsController.updateLocation)
  .delete(settingsController.deleteLocation);

router
  .route('/states')
  .get(settingsController.getAllStates)
  .post(settingsController.createState);
router
  .route('/states/:id')
  .get(settingsController.getState)
  .patch(settingsController.updateState)
  .delete(settingsController.deleteState);

module.exports = router;
