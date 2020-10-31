const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: [20, 'State name must be under 21 chars'],
    required: true,
    unique: true
  },
  order: {
    type: Number,
    unique: true
  }
});

const State = mongoose.model('State', stateSchema);

module.exports = State;
