const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Update = require('./update')

const MatchSchema = new Schema({
  id: String,
  num: String,
  day: String,
  date: String,
  time: String,
  datetime: String,
  league: {
    type: Schema.Types.ObjectId,
    ref: 'League'
  },
  home: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  away: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }
});

MatchSchema.plugin(Update)

module.exports = Match = mongoose.model('match', MatchSchema);