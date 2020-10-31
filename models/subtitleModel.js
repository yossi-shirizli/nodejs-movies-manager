const mongoose = require('mongoose');

const subtitleSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: [10, 'Source name must be less then 11 chars'],
    unique: true
  }
});

const Subtitle = mongoose.model('Subtitle', subtitleSchema);

module.exports = Subtitle;
