const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const head = require('lodash/head')
const LeagueSchema = require('./League')
const TeamSchema = require('./Team')

const populate = [
  {
    path: 'home',
    model: TeamSchema
  },
  {
    path: 'away',
    model: TeamSchema
  },
  {
    path: 'league',
    model: LeagueSchema
  }
]

const MatchSchema = new Schema({
  id: String,
  matchTime: Date
});

MatchSchema.statics.get = async ({ id, winId }) => {
  return Match.findOne({
    id
  }).populate(populate).lean()
}


MatchSchema.statics.getTeamHistory = async ({ _id, teamId, before, after }) => {
  let team_id = _id
  if (!team_id) {
    if (teamId) {
      const { _id } = await TeamSchema.findOne({
        id: teamId
      }) || {}
      if (_id) {
        team_id = _id
      }
    }
  }
  if (team_id) {
    return Match.find({
      datetime: {
        $lt: before ? new Date(before) : new Date(),
        ...(after ? {
          $gt: new Date(after)
        } : {})
      },
      $and: [
        {
          home: team_id
        },
        {
          away: team_id
        }
      ]
    }).sort({ datetime: -1 }).populate(populate).lean() || []
  }
  return []
}

MatchSchema.statics.getSchedule = async () => {
  return Match.find({
    datetime: {
      $gte: new Date()
    }
  }).sort({datetime: 1, num: 1}).populate(populate).lean()
}

MatchSchema.statics.getEndedMatches = async () => {
  return Match.find({
    datetime: {
      $lt: new Date()
    }
  }).sort({ datetime: -1, num: 1 }).populate(populate).lean()
}

module.exports = Match = mongoose.model('match', MatchSchema, 'matches');