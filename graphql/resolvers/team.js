const TeamSchema = require('../mongo/schema/Team')
const MatchSchema = require('../mongo/schema/Match')

module.exports = {
  Query: {
    team: async (obj, args, context, info) => {
      const { id, name } = args
      const {
        _id,
        teamId,
        winId,
        teamName,
      } = await TeamSchema.getTeam({
        id,
        name
      })

      return {
        teamId,
        winId,
        teamName,
        history: await MatchSchema.getTeamHistory({ _id })
      }
    }
  }
}