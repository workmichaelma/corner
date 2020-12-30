
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const TeamSchema = new Schema({  
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  winId: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
});

module.exports = Team = mongoose.model('team', TeamSchema, 'teams');