const mongoose = require('mongoose');
const Schema = mongoose.Schema

const LeagueSchema = new Schema({
  id: String,
  name: String,
  winId: String
});

module.exports = League = mongoose.model('league', LeagueSchema, 'leagues');