
const { isUndefined } = require('lodash');
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

TeamSchema.statics.getTeam = async ({ id, team }) => {
  if (!isUndefined(id) || !isUndefined(team)) {
    const { _id, id: teamId, winId, name: teamName } = await Team.findOne({
      $or: [
        {
          id
        },
        {
          team
        }
      ]
    })

    if (teamId && teamName) {
      return {
        _id,
        teamId,
        winId,
        teamName,
      }
    }
    return {}
  }
  return {}
}

module.exports = Team = mongoose.model('team', TeamSchema, 'teams');