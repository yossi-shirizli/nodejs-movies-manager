const mongoose = require('mongoose');

const releaseSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: [true, 'A release must have status'],
      enum: {
        values: [
          'Done',
          'Check Subtitles',
          'Working',
          'Build',
          'Downloading',
          'Que',
          'Deleted'
        ],
        message:
          'Status is either: Done, Check-Subtitles, Working, Build, Downloading, Que or Deleted'
      }
    },
    name: {
      type: String,
      required: [true, 'A release must have a name'],
      trim: true
    },
    category: {
      //720p,1080,4k
      type: String
    },
    source: {
      //BluRay,DVD,WEB
      type: String
    },
    durationSec: {
      //greater then 0
      type: Number,
      min: 1
    },
    sizeByte: {
      //greater then 0
      type: Number,
      min: 1
    },
    hdr: {
      //HDR,DV
      type: String
    },
    chapters: {
      type: Boolean
    },
    bitrate: {
      //MBps
      type: Number
    },
    location: {
      type: String,
      trim: true
    },
    movie: {
      type: mongoose.Schema.ObjectId,
      ref: 'Movie',
      required: [true, 'Release must belong to a movie']
    }
    // videos: [
    //   {
    //     sizeMB: {
    //       type: Number
    //     },
    //     codec: {
    //       type: String,
    //       trim: true
    //     },
    //     resW: {
    //       type: Number
    //     },
    //     resH: {
    //       type: Number
    //     },
    //     scanType: {
    //       type: String,
    //       maxlength: [1, 'scan is "i" or "p"']
    //     },
    //     colors: {
    //       type: Number
    //     },
    //     chroma: {
    //       type: String,
    //       trim: true
    //     },
    //     fps: {
    //       type: Number
    //     },
    //     bitrate: {
    //       //MBps
    //       type: Number
    //     }
    //   }
    // ],
    // audios: [
    //   {
    //     sizeMB: {
    //       type: Number
    //     },
    //     language: {
    //       type: String,
    //       trim: true
    //     },
    //     codec: {
    //       type: String,
    //       trim: true
    //     },
    //     channels: {
    //       type: Number
    //     },
    //     bitrate: {
    //       //KBps
    //       type: Number
    //     },
    //     bitDepth: {
    //       type: Number
    //     },
    //     sampleRate: {
    //       type: Number
    //     }
    //   }
    // ]
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtuals
//main-name
//main-bitrate(MB)
//Video-calcBitrate
//Audio-calcBitrate

//middleware pre/post
releaseSchema.pre(/^find/, function(next) {
  // this.populate({
  //   path: 'movie',
  //   select: 'title'
  // });
  next();
});

const Release = mongoose.model('Release', releaseSchema);

module.exports = Release;
