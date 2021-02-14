const { get, reduce, upperCase } = require('lodash')
const moment = require('moment')
const MatchSchema = require('../mongo/schema/Match')

const { formatDate } = require('../utils/date')
const { filterOdds } = require('../utils/odds')

module.exports = {
  Query: {
    match: async (obj, args, context, info) => {
      const { id } = args
      return MatchSchema.get({
        id
      })
    }
  },
  Match: {
    matchNum: async (parent, args, context, info) => {
      return parent.num
    },
    matchDatetime: async (parent, args, context, info) => {
      const { datetime } = parent
      const { format } = args
      return formatDate({ datetime, format })
    },
    matchDay: async (parent, args, context, info) => {
      return parent.day
    },
    ended: async (parent, args, context, info) => {
      const current = moment()
      return current.diff(moment(parent.datetime)) > 0
    },
    homeTeam: async (parent, args, context, info) => {
      const { home, homeRank } = parent
      return get(home, 'id') ? {
        teamId: home.id,
        teamName: home.name,
        winId: home.winId,
        rank: homeRank,
        image: home.image
      } : null
    },
    awayTeam: async (parent, args, context, info) => {
      const { away, awayRank } = parent
      return get(away, 'id') ? {
        teamId: away.id,
        teamName: away.name,
        winId: away.winId,
        rank: awayRank,
        image: away.image,
      } : null
    },
    league: async (parent, args, context, info) => {
      const { league } = parent
      return get(league, 'id') ? {
        leagueId: league.id,
        winId: league.winId,
        name: league.name,
        image: ''
      } : null
    },
    history: async (parent, args, context, info) => {
      try {
        const { home, away, matchTime } = parent
  
        const homeHistory = await MatchSchema.getTeamHistory({ _id: home._id, after: matchTime })
        const awayHistory = await MatchSchema.getTeamHistory({ _id: away._id, after: matchTime })
        return {
          home: homeHistory,
          away: awayHistory
        }
      } catch (err) {
        console.log('resolver.match.history() error: ', { parent }, err)
        return {}
      }
    },
    result: async (parent, args, context, info) => {
      try {
        const { result } = parent
        return result
      } catch (err) {
        return {}
      }
    },
    odds: async (parent, args, context, info) => {
      try {
        const { odds } = parent
        return reduce(odds, (obj, oddArray, key) => {
          obj[upperCase(key)] = filterOdds({ odds: oddArray, args })
          return obj
        }, {})
      } catch (err) {
        return {}
      }
    }
  }
}