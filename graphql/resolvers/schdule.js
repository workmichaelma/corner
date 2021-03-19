const moment = require("moment");
const MatchSchema = require("../mongo/schema/Match");

module.exports = {
  Query: {
    schedule: async (obj, args, context, info) => {
      const { ended, page, limit } = args;
      if (ended) {
        const { docs, ...metadata } = await MatchSchema.getEndedMatches({
          page,
          limit,
        });
        return {
          docs,
          metadata,
        };
      } else {
        const { docs, ...metadata } = await MatchSchema.getSchedule({
          page,
          limit,
        });
        return {
          docs,
          metadata,
        };
      }
    },
  },
};
