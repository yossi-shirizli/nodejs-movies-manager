const mongoose = require('mongoose');

const sourceSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: [10, 'Source name must be less then 11 chars'],
    unique: true
  }
});

const Source = mongoose.model('Source', sourceSchema);

module.exports = Source;
