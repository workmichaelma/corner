
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

module.exports = ResultSchema