const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    jobType: {
      type: String,
      required: [true, 'A job must have a type'],
      enum: {
        values: ['retriveMovieInfo', 'retruveReleaseInfo'],
        message: 'Type is either: retriveMovieInfo or retruveReleaseInfo'
      }
    },
    data: {
      type: String,
      required: [true, 'A job must have data']
      // validator - isJSON(str [, options])
    },
    CreateAt: {
      type: Date,
      default: Date.now()
    },
    finishedAt: {
      type: Date,
      default: undefined
    },
    status: {
      type: String,
      enum: {
        values: ['Pending', 'Executing', 'Completed', 'Abourted', 'Failed'],
        message:
          'Status is either: Pending, Executing, Completed, Abourted or Failed'
      },
      default: 'Pending'
    },
    reason: {
      type: String,
      default: undefined
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtuals
jobSchema.virtual('duration').get(function() {
  if (!this.finishedAt) return 'N/A';

  const duration = this.finishedAt - this.CreateAt;
  return duration;
});

// Middlewares

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
