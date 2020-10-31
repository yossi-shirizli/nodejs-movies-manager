const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  //name, res, minres,max res
  name: {
    type: String,
    trim: true,
    maxlength: [10, 'Category name must be less then 11 chars']
  },
  resolution: {
    type: Number,
    unique: true
  },
  display: {
    type: String,
    enum: {
      values: ['name', 'resolution'],
      message: 'Display is either: Name or Resolution'
    }
  },
  minimum: {
    type: Number
  },
  maximum: {
    type: Number
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
