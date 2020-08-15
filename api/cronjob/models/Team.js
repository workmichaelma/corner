
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const TeamSchema = new Schema({  
  id: String,
  name: String
});

module.exports = Team = mongoose.model('team', TeamSchema);