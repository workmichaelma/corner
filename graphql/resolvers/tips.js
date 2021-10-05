const map = require("lodash/map");
const compact = require("lodash/compact");
const MatchSchema = require("../mongo/schema/Match");

const fetchTips = require("../utils/tips");

module.exports = {
  Query: {
    tips: async (obj, args, context, info) => {
      const { docs } = await MatchSchema.getSchedule({
        limit: 30,
      });

      const matches = await Promise.all(
        map(docs, async (m) => {
          return fetchTips(m);
        })
      );

      return {
        matches: compact(matches),
      };
    },
  },
};
