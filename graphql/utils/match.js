const { get } = require("lodash");
const MatchSchema = require("../mongo/schema/Match");

const matchResultPreprocess = (result) => {
  if (result) {
    const { corner } = result || {};
    if (corner && get(corner, "half", null) === null) {
      return {
        ...result,
        corner: {
          full: {
            total: get(corner, "full.total", null),
            home: -1,
            away: -1,
          },
          half: {
            total: -1,
            home: -1,
            away: -1,
          },
        },
      };
    }
    return result;
  }
};

const getMatchHistory = async (match) => {
  try {
    const { home, away, datetime, history } = match;
    if (history) {
      return history;
    }
    const homeHistory = await MatchSchema.getTeamHistory({
      _id: home._id,
      before: datetime,
    });
    const awayHistory = await MatchSchema.getTeamHistory({
      _id: away._id,
      before: datetime,
    });
    return {
      home: homeHistory,
      away: awayHistory,
    };
  } catch (err) {
    console.log("resolver.match.history() error: ", { parent }, err);
    return {};
  }
};

module.exports = { matchResultPreprocess, getMatchHistory };
