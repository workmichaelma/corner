const moment = require('moment')
const MatchSchema = require('../mongo/schema/Match')

module.exports = {
  Query: {
    schedule: async (obj, args, context, info) => {
      const { ended } = args
      if (ended) {
        return MatchSchema.getEndedMatches()
      } else {
        return MatchSchema.getSchedule()
      }
    }
  }
}