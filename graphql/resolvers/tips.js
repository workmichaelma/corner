const { range, map } = require("lodash");
const moment = require("moment");
const TipsSchema = require("../mongo/schema/Tips");

const { prettyHDCLine } = require("../utils/odds");

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
  } else if (type === "HHQ") {
    return {
      betType: "讓球主客和",
      betItem: item === "H" ? "主" : "客",
    };
  }
};

module.exports = {
  Query: {
    tips: async (obj, args, context, info) => {
      const { days = 1 } = args || {};
      const dates = map(range(days), (day) => {
        return moment()
          .subtract(day - 1, "days")
          .format("YYYY-MM-DD");
      });

      const tips = await TipsSchema.getTips({
        dates,
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
          betLine: t.betType === "HDC" ? prettyHDCLine(t.betLine) : t.betLine,
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
