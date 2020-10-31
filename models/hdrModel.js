const mongoose = require('mongoose');

const hdrSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: [15, 'HDR name must be less then 16 chars'],
    unique: true
  }
});

const HDR = mongoose.model('HDR', hdrSchema);

module.exports = HDR;
