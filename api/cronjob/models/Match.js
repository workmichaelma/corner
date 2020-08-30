const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Update = require('./update')

const MatchSchema = new Schema({
  id: String,
  num: String,
  day: String,
  datetime: Date,
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
  },
  homeRank: String,
  awayRank: String,
  winId: String
});

MatchSchema.statics.find_Update_Insert = async match => {
  try {
    return await Match.findOneAndUpdate({
      id: match.id
    }, match, { upsert: true, new: true })
  } catch (err) {
    return {}
  }
}

MatchSchema.statics.getFutureMatches = async () => {
  try {
    return Match.find({
      datetime: {
        $gte: new Date()
      }
    })
  } catch (err) {
    console.log(err)
    return []
  }
}

MatchSchema.plugin(Update)

module.exports = Match = mongoose.model('match', MatchSchema);