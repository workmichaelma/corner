const moment = require("moment");
const MatchSchema = require("../mongo/schema/Match");

module.exports = {
  Query: {
    schedule: async (obj, args, context, info) => {
      const { ended, page } = args;
      if (ended) {
        const { docs, ...metadata } = await MatchSchema.getEndedMatches({
          page,
        });
        return {
          docs,
          metadata,
        };
      } else {
        const { docs, ...metadata } = await MatchSchema.getSchedule({ page });
        return {
          docs,
          metadata,
        };
      }
    },
  },
};
