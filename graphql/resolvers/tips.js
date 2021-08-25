const moment = require("moment");
const get = require("lodash/get");
const map = require("lodash/map");
const reduce = require("lodash/reduce");
const upperCase = require("lodash/upperCase");
const head = require("lodash/head");
const compact = require("lodash/compact");
const MatchSchema = require("../mongo/schema/Match");
const { filterOdds } = require("../utils/odds");
const { isEmpty } = require("lodash");

const transformOdds = (odds) => {
  return reduce(
    odds,
    (obj, oddArray, key) => {
      obj[upperCase(key)] = head(
        filterOdds({
          odds: oddArray,
          args: { type: "FIRST" },
        })
      );
      return obj;
    },
    {}
  );
};

const findSameMatch = ({ HAD, name, side, history, leagueId }) => {
  const { H } = HAD;
  const [from, to] = [(H * 0.9).toFixed(2), (H * 1.1).toFixed(2)];

  return compact(
    map(history, (m) => {
      const { HAD, CHL } = transformOdds(m.odds);
      const { H } = HAD;
      const teamName = m[side].name;
      return parseFloat(from) <= parseFloat(H) &&
        parseFloat(to) >= parseFloat(H) &&
        name === teamName &&
        leagueId === m.league.id &&
        !isEmpty(CHL) &&
        get(m.result, "HAD", null) !== null
        ? m
        : false;
    })
  );
};

const fetchStat = (matches) => {
  return reduce(
    matches,
    (stat, match) => {
      if (get(match, "result.HAD")) {
        if (get(match, "result.CHL.first")) {
          stat.CHL[match.result.CHL.first] =
            stat.CHL[match.result.CHL.first] + 1;
        }
        stat.HIL[match.result.HIL.first] = stat.HIL[match.result.HIL.first] + 1;
        stat.CHL.percent =
          (stat.CHL.H / (stat.CHL.H + stat.CHL.L)).toFixed(2) * 100 || 0;
        stat.HIL.percent =
          (stat.HIL.H / (stat.HIL.H + stat.HIL.L)).toFixed(2) * 100 || 0;
      }
      return stat;
    },
    {
      CHL: {
        H: 0,
        L: 0,
        percent: 0,
      },
      HIL: {
        H: 0,
        L: 0,
        percent: 0,
      },
    }
  );
};

module.exports = {
  Query: {
    tips: async (obj, args, context, info) => {
      const { docs } = await MatchSchema.getSchedule({
        limit: 20,
      });

      const matches = await Promise.all(
        map(docs, async (m) => {
          const { home, away, datetime, league } = m;
          const homeHistory = await MatchSchema.getTeamHistory({
            _id: home._id,
            before: datetime,
          });
          const awayHistory = await MatchSchema.getTeamHistory({
            _id: away._id,
            before: datetime,
          });

          const { CHL, HAD } = transformOdds(m.odds);

          if (!CHL) {
            return false;
          }

          const homeSameMatches = findSameMatch({
            HAD,
            name: home.name,
            side: "home",
            history: homeHistory,
            leagueId: league.id,
          });
          const awaySameMatches = findSameMatch({
            HAD,
            name: away.name,
            side: "away",
            history: awayHistory,
            leagueId: league.id,
          });

          if (isEmpty(homeSameMatches) && isEmpty(awaySameMatches)) {
            return false;
          }

          const data = {
            match: {
              ...m,
              history: {
                home: homeSameMatches,
                away: awaySameMatches,
              },
            },
            stat: {
              home: fetchStat(homeSameMatches),
              away: fetchStat(awaySameMatches),
            },
          };

          if (
            data.stat.home.CHL.H === 0 &&
            data.stat.home.CHL.L === 0 &&
            data.stat.away.CHL.H === 0 &&
            data.stat.away.CHL.L === 0
          ) {
            return false;
          }
          if (
            data.stat.home.CHL.percent >= 75 ||
            (data.stat.home.CHL.percent <= 25 && data.stat.home.CHL.L > 0) ||
            data.stat.away.CHL.percent >= 75 ||
            (data.stat.away.CHL.percent <= 25 && data.stat.away.CHL.L)
          ) {
            return data;
          }
          return false;
        })
      );

      return {
        matches: compact(matches),
      };
    },
  },
};
