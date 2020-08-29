
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
  }
});

TeamSchema.statics.find_Update_Insert = async team => {
  try {
    return await Team.findOneAndUpdate({
      id: team.id
    }, team, { upsert: true, new: true })
  } catch (err) {
    return {}
  }
}

module.exports = Team = mongoose.model('team', TeamSchema);