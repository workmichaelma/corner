const mongoose = require('mongoose');
const Schema = mongoose.Schema

const LeagueSchema = new Schema({
  id: String,
  name: String,
  winId: String
});

LeagueSchema.statics.find_Update_Insert = async league => {
  try {
    return await League.findOneAndUpdate({
      id: league.id
    }, league, { upsert: true, new: true })
  } catch (err) {
    return {}
  }
}

module.exports = League = mongoose.model('league', LeagueSchema);