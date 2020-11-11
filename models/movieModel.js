const mongoose = require('mongoose');
const slugify = require('slugify');
//const User = require('./userModel');
const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: [true, 'A movie must have status'],
      enum: {
        values: [
          'Done',
          'Check Subtitles',
          'Working',
          'Build',
          'Downloading',
          'Que',
          'Search'
        ],
        message:
          'Status is either: Done, Check-Subtitles, Working, Build, Downloading, Que or Search'
      }
    },
    title: {
      type: String,
      required: [true, 'A movie must have a titile'],
      unique: false,
      trim: true,
      maxlength: [200, 'A movie title must have less then 200 chars']
    },
    imdbLink: {
      type: String,
      unique: true,
      trim: true,
      validate: [validator.isURL, 'IMDB must be a valid URL']
      // validator - isURL(str [, options])
    },
    releaseDate: Date,
    // year: Number,
    ratingsAverage: {
      type: Number,
      min: [0, 'Rating must be above 0.0'],
      max: [10, 'Rating must be below 10.0'],
      set: val => Math.round(val * 10) / 10
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      min: [10, 'Duration must be above 10'],
      max: [300, 'Duration must be below 300']
    },
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
    geners: [
      {
        type: String,
        trim: true,
        maxlength: [20, 'A movie gener must have less then 20 chars']
      }
    ],
    poster: {
      type: String,
      trim: true
    },
    //Child ref
    /**
     * releases:[
     *  {
     *    type:mongoose.Schema.ObjectId,
     *    ref: 'Release
     *  }
     * ]
     */
    slug: String
  },
  // { timestamps: true },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtuals
movieSchema.virtual('durationString').get(function() {
  if (!this.duration) return 'N/A';
  if (this.duration === 0) return 'N/A';
  if (this.duration < 60) return `${this.duration}min`;

  const hours = Math.floor(this.duration / 60);
  const min = this.duration - hours * 60;
  return `${hours}h ${min}min`;
});

movieSchema.virtual('displayTitle').get(function() {
  //console.log(this.title, this.releaseDate, this.releaseDate.getFullYear());
  //console.log(str);
  //new Date(this.releaseDate).getFullYear();
  //return `${this.title} (${new Date(this.releaseDate).getFullYear()})`;
  return `${this.title} (${new Date(this.releaseDate).getFullYear()})`;
  //return str;
});

// Virtaul Populate
movieSchema.virtual('releases', {
  //console.log('Virtual Ref');
  ref: 'Release',
  //The name of the field on the other model (Release) that points to this model is stored
  foreignField: 'movie',
  //where that id is stored in this current (Movie) model
  localField: '_id'
});

// Middlewares
// movieSchema.pre('save', async function(next) {
//   console.log(this.bStatus);
//   const bState = await State.find({ name: this.bStatus });
//   console.log(bState);
//   if (!bState) {
//     console.log('I am in');
//     const query = await State.find()
//       .sort('order')
//       .limit(1);
//     console.log(query);
//     //this.bState = await State.find({ $min: 'order' });
//   }
//   this.bStatus = bState;
//   next();
// });
movieSchema.pre('save', function(next) {
  this.slug = slugify(`${this.title} ${this.releaseDate.getFullYear()}`, {
    lower: true
  });
  next();
});
// movieSchema.pre(/^find/, function(next) {
//   if (this._update.releaseDate)
//     this._update.year = new Date(this._update.releaseDate).getFullYear();
//   console.log(this);
//   next();
// });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
