
const mongoose = require('mongoose');
const Schema = mongoose.Schema

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
    type: Number,
    required: true
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
});

ResultSchema.methods.insertResult = async r => {
  
}

ResultSchema.pre('validate', function (next) {
  try {
    this.HHA = 'H'
    this.HDC = 'H'
    this.HIL = 'H'
    this.FHL = 'H'
    this.CHL = 'H'
    next()
  } catch (err) {
    console.log(err)
    next(new Error(err))
  }
})

ResultSchema.pre('save', function (next) {
  try {
    console.log(this)
    next()
  } catch (err) {
    console.log(err)
    next(new Error(err))
  }
})

module.exports = ResultSchema