const { get, reduce, upperCase } = require("lodash");
const moment = require("moment");
const MatchSchema = require("../mongo/schema/Match");

const { formatDate } = require("../utils/date");
const { filterOdds } = require("../utils/odds");
const { trimLeagueName } = require("../utils/league");

module.exports = {
  Query: {
    match: async (obj, args, context, info) => {
      const { id } = args;
      return MatchSchema.get({
        id,
      });
    },
  },
  Match: {
    matchNum: async (parent, args, context, info) => {
      return parent.num;
    },
    matchDatetime: async (parent, args, context, info) => {
      const { datetime } = parent;
      const { format } = args;
      return formatDate({ datetime, format });
    },
    matchDay: async (parent, args, context, info) => {
      return parent.day;
    },
    ended: async (parent, args, context, info) => {
      const current = moment();
      return current.diff(moment(parent.datetime)) > 0;
    },
    homeTeam: async (parent, args, context, info) => {
      const { home, homeRank } = parent;
      return get(home, "id")
        ? {
            teamId: home.id,
            teamName: home.name,
            winId: home.winId,
            rank: (homeRank || "").replace(/[^a-z\d\s]+/gi, ""),
            image: home.image,
          }
        : null;
    },
    awayTeam: async (parent, args, context, info) => {
      const { away, awayRank } = parent;
      return get(away, "id")
        ? {
            teamId: away.id,
            teamName: away.name,
            winId: away.winId,
            rank: (awayRank || "").replace(/[^a-z\d\s]+/gi, ""),
            image: away.image,
          }
        : null;
    },
    league: async (parent, args, context, info) => {
      const { league } = parent;
      return get(league, "id")
        ? {
            leagueId: league.id,
            winId: league.winId,
            name: trimLeagueName(league.name),
            image: "",
          }
        : null;
    },
    history: async (parent, args, context, info) => {
      try {
        const { home, away, datetime } = parent;
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
    },
    result: async (parent, args, context, info) => {
      try {
        const { result } = parent;
        return result;
      } catch (err) {
        return {};
      }
    },
    resultInLatestOdds: async (parent, args, context, info) => {
      try {
        const { result } = parent;
        return {
          ...result,
          HHA: get(result, "HHA.latest"),
          HDC: get(result, "HDC.latest"),
          HIL: get(result, "HIL.latest"),
          FHL: get(result, "FHL.latest"),
          CHL: get(result, "CHL.latest"),
        };
      } catch (err) {
        return {};
      }
    },
    odds: async (parent, args, context, info) => {
      try {
        const { odds } = parent;
        return reduce(
          odds,
          (obj, oddArray, key) => {
            obj[upperCase(key)] = filterOdds({ odds: oddArray, args });
            return obj;
          },
          {}
        );
      } catch (err) {
        return {};
      }
    },
  },
};
