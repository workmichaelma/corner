const {
  head,
  get,
  isUndefined,
  reduce,
  upperCase,
  isObject,
} = require("lodash");
const moment = require("moment");
const axios = require("axios");
const graphqlFields = require("graphql-fields");
const MatchSchema = require("../mongo/schema/Match");

const { formatDate, getWeekdayChin } = require("../utils/date");
const { filterOdds } = require("../utils/odds");
const { trimLeagueName } = require("../utils/league");
const { matchResultPreprocess, getMatchHistory } = require("../utils/match");
const fetchTips = require("../utils/tips");

const handleOdds = (match, args) => {
  try {
    const { odds, result } = match;
    return reduce(
      odds,
      (obj, oddArray, key) => {
        obj[upperCase(key)] = filterOdds({ odds: oddArray, args });
        return obj;
      },
      {
        result,
      }
    );
  } catch (err) {
    return {};
  }
};

const handleResult = (match) => {
  try {
    const { result } = match || {};
    return matchResultPreprocess(result);
  } catch (err) {
    return {};
  }
};

const handleResultByOdds = (match, args) => {
  const { orderBy = "ASC" } = args || {};
  try {
    const { result: _result } = match || {};
    const result = matchResultPreprocess(_result);
    if (!isUndefined(result)) {
      const field = orderBy === "DESC" ? "latest" : "first";
      return {
        ...result,
        HHA: get(result, `HHA.${field}`),
        HDC: get(result, `HDC.${field}`),
        HIL: get(result, `HIL.${field}`),
        FHL: get(result, `FHL.${field}`),
        CHL: get(result, `CHL.${field}`),
      };
    }
    return null;
  } catch (err) {
    return {};
  }
};

module.exports = {
  Query: {
    match: async (obj, args, context, info) => {
      const { id } = args;
      const { future, against } = graphqlFields(info);
      const match = await MatchSchema.get({
        id,
      });
      if ((future || against) && match.winId) {
        const { data } = await axios.get(
          `http://crawler:8082/win/match?id=${match.winId}`
        );
        return {
          ...match,
          ...data,
        };
      }
      return match;
    },
    matchOdds: async (obj, args, context, info) => {
      const { id } = args;
      const match =
        (await MatchSchema.get({
          id,
        })) || {};

      if (isObject(match) && get(match, "odds")) {
        return match;
      }
      return null;
    },
    matchResult: async (obj, args, context, info) => {
      const { id } = args;
      const match =
        (await MatchSchema.get({
          id,
        })) || {};

      if (isObject(match) && get(match, "result")) {
        return { result: match.result };
      }
      return null;
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
      const { day } = parent;
      const { format } = args;

      return format === "CHIN" ? getWeekdayChin(day) : day;
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
        const { limit = 20 } = args || {};
        const { home, away, datetime, history } = parent;
        if (history) {
          return history;
        }
        const homeHistory = await MatchSchema.getTeamHistory({
          _id: home._id,
          before: datetime,
          limit,
        });
        const awayHistory = await MatchSchema.getTeamHistory({
          _id: away._id,
          before: datetime,
          limit,
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
      return handleResult(parent);
    },
    resultByOdds: async (parent, args, context, info) => {
      return handleResultByOdds(parent, args);
    },
    odds: async (parent, args, context, info) => {
      return handleOdds(parent, args);
    },
    isResultValid: async (parent, args, context, info) => {
      try {
        const { result } = parent;
        return get(result, "HAD", null) !== null;
      } catch (err) {
        return null;
      }
    },
    tips: async (parent, args, context, info) => {
      try {
        const history = getMatchHistory(parent);

        return fetchTips({
          ...parent,
          history,
        });
      } catch (err) {
        console.log("Graphql -> Resolvers -> Match -> Tips, Error");
        return null;
      }
    },
  },
  MatchResult: {
    result: async (parent, args, context, info) => {
      return handleResult(parent);
    },
    resultByOdds: async (parent, args, context, info) => {
      return handleResultByOdds(parent, args);
    },
  },
  MatchOdds: {
    odds: async (parent, args, context, info) => {
      return handleOdds(parent, args);
    },
    odd: async (parent, args, context, info) => {
      const odds = handleOdds(parent, args);
      return reduce(
        odds,
        (obj, odd, item) => {
          obj[item] = head(odd);
          return obj;
        },
        {}
      );
    },
  },
};
