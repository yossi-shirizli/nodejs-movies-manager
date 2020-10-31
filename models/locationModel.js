const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  display: {
    type: String,
    trim: true,
    required: true
  },
  fullPath: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    trim: true
  },
  isKids: Boolean,
  isClassic: Boolean
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
