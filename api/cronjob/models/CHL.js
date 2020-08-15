const mongoose = require('mongoose');
const Schema = mongoose.Schema

const CHLSchema = new Schema({
  datetime: String,
  H: String,
  L: String,
  LINE: String
});

module.exports = CHL = mongoose.model('CHL', CHLSchema);