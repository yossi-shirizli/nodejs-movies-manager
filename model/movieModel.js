const mongoose = require('mongoose');
//const slugify = require('slugify');
//const User = require('./userModel');
//const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: [true, 'A movie must have status'],
      enum: {
        values: [
          'Done',
          'Check Subtitle',
          'Build',
          'Download',
          'Que',
          'Search',
          'Deleted'
        ],
        message:
          'Status is either: Done, Check Sub, Build, Download, Que, Search or Deleted'
      }
    },
    title: {
      type: String,
      required: [true, 'A movie must have a titile'],
      unique: false,
      trim: true,
      maxlength: [100, 'A tour name must have less then 100 chars']
    },
    imdbLink: {
      type: String,
      required: [true, 'A movie must have an IMDB link'],
      unique: false,
      trim: true
    },
    releaseDate: Date,
    ratingsAverage: {
      type: Number,
      min: [0, 'Rating must be above 0.0'],
      max: [10, 'Rating must be below 10.0'],
      set: val => Math.round(val * 10) / 10
    },
    ratingsQuantity: Number,
    duration: Number,
    isKids: {
      type: Boolean,
      default: false
    },
    isClassic: {
      type: Boolean,
      default: true
    },
    plot: {
      type: String,
      trim: true
    },
    mpaa: {
      type: String,
      trim: true
    },
    geners: [String],
    poster: {
      type: String,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    lastModified: {
      type: Date,
      default: Date.now(),
      select: false
    },
    slug: String
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
