const Category = require('../models/categoryModel');
const Hdr = require('../models/hdrModel');
const Source = require('../models/sourceModel');
const Subtitle = require('../models/subtitleModel');
const Location = require('../models/locationModel');
const State = require('../models/stateModel');
const factory = require('./handlerFactory');

//Categories
exports.getAllCategories = factory.getAll(Category);
exports.getCategory = factory.getOne(Category);
exports.createCategory = factory.createOne(Category);
exports.updateCategory = factory.updateOne(Category);
exports.deleteCategory = factory.deleteOne(Category);

//HDR
exports.getAllHDR = factory.getAll(Hdr);
exports.getHDR = factory.getOne(Hdr);
exports.createHDR = factory.createOne(Hdr);
exports.updateHDR = factory.updateOne(Hdr);
exports.deleteHDR = factory.deleteOne(Hdr);

//Source
exports.getAllSources = factory.getAll(Source);
exports.getSource = factory.getOne(Source);
exports.createSource = factory.createOne(Source);
exports.updateSource = factory.updateOne(Source);
exports.deleteSource = factory.deleteOne(Source);

//Subtitle
exports.getAllSubtitles = factory.getAll(Subtitle);
exports.getSubtitle = factory.getOne(Subtitle);
exports.createSubtitle = factory.createOne(Subtitle);
exports.updateSubtitle = factory.updateOne(Subtitle);
exports.deleteSubtitle = factory.deleteOne(Subtitle);

//Location
exports.getAllLocations = factory.getAll(Location);
exports.getLocation = factory.getOne(Location);
exports.createLocation = factory.createOne(Location);
exports.updateLocation = factory.updateOne(Location);
exports.deleteLocation = factory.deleteOne(Location);

//Location
exports.getAllStates = factory.getAll(State);
exports.getState = factory.getOne(State);
exports.createState = factory.createOne(State);
exports.updateState = factory.updateOne(State);
exports.deleteState = factory.deleteOne(State);
