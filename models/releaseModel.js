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
          'Search',
          'Deleted'
        ],
        message:
          'Status is either: Done, Check-Subtitles, Working, Build, Downloading, Que, Search or Deleted'
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
    durationMs: {
      //greater then 0
      Type: Number
    },
    sizeByte: {
      //greater then 0
      type: Number
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
    videos: [
      {
        sizeMB: {
          type: Number
        },
        codec: {
          type: String,
          trim: true
        },
        resW: {
          type: Number
        },
        resH: {
          type: Number
        },
        scanType: {
          type: String,
          maxlength: [1, 'scan is "i" or "p"']
        },
        colors: {
          type: Number
        },
        chroma: {
          type: String,
          trim: true
        },
        fps: {
          type: Number
        },
        bitrate: {
          //MBps
          type: Number
        }
      }
    ],
    audios: [
      {
        sizeMB: {
          type: Number
        },
        language: {
          type: String,
          trim: true
        },
        codec: {
          type: String,
          trim: true
        },
        channels: {
          type: Number
        },
        bitrate: {
          //KBps
          type: Number
        },
        bitDepth: {
          type: Number
        },
        sampleRate: {
          type: Number
        }
      }
    ]
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

const Release = mongoose.model('Release', releaseSchema);

module.exports = Release;
