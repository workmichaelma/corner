const moment = require("moment");
const TipsSchema = require("../mongo/schema/Tips");

module.exports = {
  Query: {
    tips: async (obj, args, context, info) => {
      const today = moment().format("YYYY-MM-DD");
      const tips = await TipsSchema.getTips({
        date: today,
      });

      return tips.map(({ match, ...t }) => {
        const { datetime } = match[0];
        const isStarted = moment(datetime).isBefore(moment());

        return {
          match: match[0],
          isStarted,
          ...t,
        };
      });
      // const { docs } = await MatchSchema.getSchedule({
      //   limit: 30,
      // });

      // const matches = await Promise.all(
      //   map(docs, async (m) => {
      //     return fetchTips(m);
      //   })
      // );

      // return {
      //   matches: compact(matches),
      // };
    },
  },
};
