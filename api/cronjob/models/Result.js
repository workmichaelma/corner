
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const { every, isObject, get } = require('lodash');

const ResultSchema = new Schema({
  FT: {
    home: {
      type: Number,
      required: true
    },
    away: {
      type: Number,
      required: true
    },
  },
  HT: {
    home: {
      type: Number,
      required: true
    },
    away: {
      type: Number,
      required: true
    },
  },
  corner: {
    full: {
      total: {
        type: Number,
        required: false
      },
      home: {
        type: Number,
        required: false
      },
      away: {
        type: Number,
        required: false
      },
    },
    half: {
      total: {
        type: Number,
        required: false
      },
      home: {
        type: Number,
        required: false
      },
      away: {
        type: Number,
        required: false
      },
    },
  },
  HAD: {
    type: String,
    required: true
  },
  FHA: {
    type: String,
    required: true
  },
  HHA: {
    first: {
      type: String,
      required: true
    },
    latest: {
      type: String,
      required: true
    }
  },
  HDC: {
    first: {
      type: String,
      required: true
    },
    latest: {
      type: String,
      required: true
    }
  },
  HIL: {
    first: {
      type: String,
      required: true
    },
    latest: {
      type: String,
      required: true
    }
  },
  FHL: {
    first: {
      type: String,
      required: true
    },
    latest: {
      type: String,
      required: true
    }
  },
  CHL: {
    first: {
      type: String,
      required: true
    },
    latest: {
      type: String,
      required: true
    }
  },
}, {
  strict: false
});

// ResultSchema.pre('validate', function (next) {
//   const pass = every([
//     this.HAD === 'H' || this.HAD === 'A' || this.HAD === 'D',
//     this.FHA === 'H' || this.FHA === 'A' || this.FHA === 'D',
//     this.HHA === 'H' || this.HHA === 'A' || this.HHA === 'D',
//     this.HDC === 'H' || this.HDC === 'A',
//     this.HIL === 'H' || this.HIL === 'L',
//     this.FHL === 'H' || this.FHL === 'L',
//     this.CHL === 'H' || this.CHL === 'L',
//     this.OOE === 'O' || this.OOE === 'E',
//     this.corner.total > -1
//   ])
//   if (pass) {
//     next()
//   } else {
//     next(new Error(`Result schema check Error: ${JSON.stringify(this)}`))
//   }
// })

module.exports = ResultSchema