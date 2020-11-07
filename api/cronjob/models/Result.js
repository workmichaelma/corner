
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
    home: {
      type: Number,
      required: true
    },
    away: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
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
    type: String,
    required: true
  },
  HDC: {
    type: String,
    required: true
  },
  HIL: {
    type: String,
    required: true
  },
  FHL: {
    type: String,
    required: true
  },
  CHL: {
    type: String,
    required: true
  },
  OOE: {
    type: String,
    required: true
  },
}, {
  strict: false
});

ResultSchema.methods.buildResult = r => {
  if (isObject(r) && get(r, 'HAD') && isObject(r.FT) && (~~get(r, 'corner.total', -1) > -1)) {
    const { HAD, FHA, OOE, HT, FT, corner } = r
    return {
      HAD,
      FHA,
      HHA: 'H',
      HDC: 'H',
      HIL: 'H',
      FHL: 'H',
      CHL: 'H',
      OOE,
      HT,
      FT,
      corner: {
        home: corner.home,
        away: corner.away,
        total: corner.total
      }
    }
  }
  return {}
}

ResultSchema.pre('validate', function (next) {
  const pass = every([
    this.HAD === 'H' || this.HAD === 'A' || this.HAD === 'D',
    this.FHA === 'H' || this.FHA === 'A' || this.FHA === 'D',
    this.HHA === 'H' || this.HHA === 'A' || this.HHA === 'D',
    this.HDC === 'H' || this.HDC === 'A',
    this.HIL === 'H' || this.HIL === 'L',
    this.FHL === 'H' || this.FHL === 'L',
    this.CHL === 'H' || this.CHL === 'L',
    this.OOE === 'O' || this.OOE === 'E',
    this.corner.total > -1
  ])
  if (pass) {
    next()
  } else {
    next(new Error(`Result schema check Error: ${JSON.stringify(this)}`))
  }
})

module.exports = ResultSchema