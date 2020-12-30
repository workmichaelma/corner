
const mongoose = require('mongoose');
const reduce = require('lodash/reduce')
const updateAt = require('mongoose-createdat-updatedat')
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
  }
});

TeamSchema.statics.find_Update_Insert = async _team => {
  try {
    const team = reduce(_team, (obj, v, k) => {
      if (v) {
        obj[k] = v
      }
      return obj
    }, {}) || {}
    if (team.id || team.winId) {
      return await Team.findOneAndUpdate({
        ...team.id ? {
          id: team.id
        } : {
          winId: team.winId
        }
      }, team, { upsert: true, new: true })
    }
  } catch (err) {
    console.log('TeamSchema.statics.find_Update_Insert() error: ', err)
    return {}
  }
}

TeamSchema.plugin(updateAt)

module.exports = Team = mongoose.model('team', TeamSchema);