const moment = require("moment");
const TipsSchema = require("../mongo/schema/Tips");

const transformBet = ({ betItem, betType }) => {
  const type = betType.toString();
  const item = betItem.toString();
  if (type.toString() === "CHL") {
    return {
      betType: "角球",
      betItem: item === "H" ? "大" : "細",
    };
  } else if (type === "HAD") {
    return {
      betType: "主客和",
      betItem: item === "H" ? "主" : item === "D" ? "和" : "客",
    };
  } else if (type === "HDC") {
    return {
      betType: "讓球",
      betItem: item === "H" ? "主" : "客",
    };
  }
};

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
        const { betItem, betType } = transformBet({
          betItem: t.betItem,
          betType: t.betType,
        });

        return {
          match: match[0],
          isStarted,
          ...t,
          betItem,
          betType,
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
