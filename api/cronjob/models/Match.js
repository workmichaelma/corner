const mongoose = require('mongoose');
const Schema = mongoose.Schema
const moment = require('moment')
const updateAt = require('mongoose-createdat-updatedat')
const Result = require('./Result')
// const Update = require('./update')

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
  winId: String,
  result: Result
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

MatchSchema.statics.updateResult = async result => {
  try {
    return await Match.findOneAndUpdate({
      id: result.id
    }, {
      result
    }, { new: true, runValidators: true })
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

MatchSchema.statics.getMatchesWithDateRange = async ({start: _start, end: _end = moment(), odds = false, result = false}) => {
  try {
    const start = moment(_start)
    const end = moment(_end)

    if (start.isValid() && end.isValid()) {
      return Match.find({
        datetime: {
          $gte: start.format(),
          $lt: end.format()
        }
      }).lean()
    }
  } catch (err) {
    console.log(err)
    return []
  }
}

MatchSchema.statics.getNoResultMatchesWithDateRange = async ({start: _start, end: _end = moment()}) => {
  try {
    const start = moment(_start)
    const end = moment(_end)

    if (start.isValid() && end.isValid()) {
      return Match.find({
        datetime: {
          $gte: start.format(),
          $lt: end.format()
        },
        result: {
          $exists: false
        }
      }).lean()

      return Match.aggregate([
        {
          $match: {
            datetime: {
              $gte: start.toDate(),
              $lt: end.toDate()
            }
          }
        },
        {
          $lookup: {
            from: 'results',
            localField: 'id',
            foreignField: 'id',
            as: 'result'
          }
        },
        // {
        //   $unwind: '$result'
        // },
        // {

        // }
      ])
    }
  } catch (err) {
    console.log(err)
    return []
  }
}

MatchSchema.plugin(updateAt)

module.exports = Match = mongoose.model('match', MatchSchema);