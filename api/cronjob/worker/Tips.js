const Match = require("../models/Match");
const moment = require("moment");
const TipsSchema = require("../models/Tips");

const {
  map,
  head,
  compact,
  includes,
  isEmpty,
  isString,
  isNull,
  get,
  reduce,
} = require("lodash");

const addDays = 1;
const subtractDays = 0;

const Tips = () => {
  const _ = {
    today: moment(moment().add(addDays, "days"))
      .subtract(subtractDays, "days")
      .format("YYYY-MM-DD"),
    async fetchMatchHistory(match) {
      const homeHistory =
        (await Match.getTeamHistory({
          _id: match.home,
          league: match.league,
          limit: 30,
          fields: "id home away league odds result datetime",
        })) || [];
      const awayHistory =
        (await Match.getTeamHistory({
          _id: match.away,
          league: match.league,
          limit: 30,
          fields: "id home away league odds result datetime",
        })) || [];

      return {
        ...match,
        homeHistory,
        awayHistory,
      };
    },
    async insertTips(tips) {
      try {
        return TipsSchema.insertTips(tips);
      } catch {
        console.log(`failed to insert tips - ${tips}`);
        return tips;
      }
    },
    async insertTipsResult(result) {
      try {
        return TipsSchema.insertTipsResult(result);
      } catch (err) {
        console.log(`failed to insert tips result - ${result}`);
        return {};
      }
    },
    async initUnexpectedWin(matches) {
      try {
        const fetchUnexpectedWinMatches = map(matches, async (m) => {
          return _.fetchUnexpectedWinMatch(m);
        });

        const unexpectedWinMatches = compact(
          await Promise.all(fetchUnexpectedWinMatches)
        );

        const unexpectedWinTips = compact(
          unexpectedWinMatches.map((m) => {
            return _.fetchUnexpectedWinMatchTips(m);
          })
        );

        const insertTips = unexpectedWinTips.map(async (tip) => {
          return _.insertTips({
            date: tip.date,
            matchId: tip.matchId,
            type: "UNEXPECTEDWIN",
            betType: tip.type,
            betItem: tip.item,
            betOdd: tip.odd,
            betGrade: tip.grade,
            betLine: tip.line,
          });
        });

        return Promise.all(insertTips);
      } catch (err) {
        return [];
      }
    },
    async initCorner(matches) {
      try {
        const cornerMatches = compact(
          matches.map((m) => _.fetchCornerMatch(m))
        );

        const insertTips = cornerMatches.map(async (tip) => {
          return _.insertTips({
            date: tip.date,
            matchId: tip.matchId,
            type: tip.type,
            betType: tip.type,
            betItem: tip.item,
            betOdd: tip.odd,
            betGrade: tip.grade,
            betLine: tip.line,
          });
        });
        return Promise.all(insertTips);
      } catch (err) {
        console.log(err);
        return [];
      }
    },
    /* For Unexpected Win */
    getUnexpectedWin: ({ HAD, result, id, teamId, home, away }) => {
      const { H, A } = HAD;

      if (H < A) {
        if (H <= 1.7 && teamId.toString() === away.toString()) {
          if (result === "D" || result === "A") {
            return { id };
          }
        }
      } else if (H > A) {
        if (A <= 1.7 && teamId.toString() === home.toString()) {
          if (result === "D" || result === "H") {
            return { id };
          }
        }
      }
      return false;
    },
    fetchUnexpectedWinMatch: async (match) => {
      try {
        const { homeHistory: _homeHistory, awayHistory: _awayHistory } =
          match || {};

        const homeHistory = head(_homeHistory);
        const awayHistory = head(_awayHistory);

        const home =
          homeHistory &&
          homeHistory.id &&
          moment(_.today).diff(homeHistory.datetime, "day") < 15
            ? _.getUnexpectedWin({
                id: homeHistory.id,
                HAD: homeHistory.odds.had[0],
                result: homeHistory.result.HAD,
                teamId: match.home,
                home: homeHistory.home._id,
                away: homeHistory.away._id,
              })
            : false;

        const away =
          awayHistory &&
          awayHistory.id &&
          moment(_.today).diff(awayHistory.datetime, "day") < 15
            ? _.getUnexpectedWin({
                id: awayHistory.id,
                HAD: awayHistory.odds.had[0],
                result: awayHistory.result.HAD,
                teamId: match.away,
                home: awayHistory.home._id,
                away: awayHistory.away._id,
              })
            : false;

        return (home === false && away === false) || (home && away)
          ? false
          : {
              home,
              away,
              match,
            };
      } catch (err) {
        return false;
      }
    },
    fetchUnexpectedWinMatchTips: (match) => {
      try {
        const { H, A } = get(match, "match.odds.had[0]");
        const HDC = get(match, "match.odds.hdc[0]");
        const { HHA_H, HHA_A, HG, AG } = get(match, "match.odds.hha[0]");
        const isHome = get(match, "home");
        const isAway = get(match, "away");
        const tips = {
          grade: "",
          type: "",
          item: "",
          line: "",
        };

        // 主隊上場受讓羸
        if (isHome) {
          // 主受讓
          if (HG > 0 && A > 1.6) {
            tips.type = HDC ? "HDC" : "HAD";
            tips.item = "A";
            tips.odd = tips.type === "HDC" ? HDC.A : A;
            tips.line = tips.type === "HDC" ? HDC.AG : "";
          } else if (AG > 0) {
            tips.type = HDC ? "HDC" : "HHA";
            tips.item = "A";
            tips.odd = tips.type === "HDC" ? HDC.A : HHA_A;
            tips.line = tips.type === "HDC" ? HDC.AG : AG;
          }

          if (tips.odd) {
            tips.grade = H > 3 ? "C" : H < 1.7 ? "B" : "A";
          }
        }
        // 客隊上場受讓羸
        if (isAway) {
          // 主受讓
          if (HG > 0) {
            tips.type = HDC ? "HDC" : "HHA";
            tips.item = "H";
            tips.odd = tips.type === "HDC" ? HDC.H : HHA_H;
            tips.line = tips.type === "HDC" ? HDC.HG : HG;
          } else if (AG > 0 && H > 1.6) {
            tips.type = HDC ? "HDC" : "HAD";
            tips.item = "H";
            tips.odd = tips.type === "HDC" ? HDC.H : H;
            tips.line = tips.type === "HDC" ? HDC.HG : "";
          }
          if (tips.odd) {
            tips.grade = A > 3 ? "C" : A < 1.7 ? "B" : "A";
          }
        }

        return tips.odd
          ? {
              date: _.today,
              matchId: match.match.id,
              ...tips,
            }
          : false;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    /* For Unexpected Win */
    /* For Corner */
    fetchCornerMatch: (match) => {
      const { odds, home, away, league, homeHistory, awayHistory } = match;

      const CHL = head(odds.chl || []);
      const HAD = head(odds.had || []);

      if (CHL && HAD) {
        const homeSameMatches = _.findSameMatch({
          HAD,
          teamId: home.toString(),
          side: "home",
          history: homeHistory,
          leagueId: league.toString(),
        });
        const awaySameMatches = _.findSameMatch({
          HAD,
          teamId: away.toString(),
          side: "away",
          history: awayHistory,
          leagueId: league.toString(),
        });

        if (isEmpty(homeSameMatches) && isEmpty(awaySameMatches)) {
          return false;
        }

        const tips = _.calcCornerTips(
          _.fetchStat(homeSameMatches),
          _.fetchStat(awaySameMatches),
          CHL
        );
        return tips
          ? {
              date: _.today,
              matchId: match.id,
              ...tips,
            }
          : false;
      }
      return false;
    },
    findSameMatch: ({ HAD, teamId, side, history, leagueId }) => {
      const { H, A } = HAD;

      return compact(
        map(history, (m) => {
          const _HAD = head(m.odds.had || []);
          const mTeamId = get(m, `[${side}]._id`, "").toString();
          const mLeagueId = get(m, "league._id", "").toString();

          return (_.withinOddRange(_HAD.H, H) || _.withinOddRange(_HAD.A, A)) &&
            mTeamId === teamId &&
            leagueId === mLeagueId &&
            !isEmpty(m.odds.chl) &&
            _.isValidResult(m.result)
            ? m
            : false;
        })
      );
    },
    isValidResult: (result) => {
      const { HAD } = result || {};
      return result && (HAD === "H" || HAD === "D" || HAD === "A");
    },
    withinOddRange: (odd, target) => {
      const [from, to] = [(target * 0.9).toFixed(2), (target * 1.1).toFixed(2)];
      return (
        parseFloat(from) <= parseFloat(odd) && parseFloat(to) >= parseFloat(odd)
      );
    },
    fetchStat: (matches) => {
      return reduce(
        matches,
        (stat, match) => {
          if (get(match, "result.HAD")) {
            if (get(match, "result.CHL.first")) {
              stat.CHL[match.result.CHL.first] =
                stat.CHL[match.result.CHL.first] + 1;
            }
            stat.HIL[match.result.HIL.first] =
              stat.HIL[match.result.HIL.first] + 1;
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
    },
    calcCornerTips: (home, away, CHL) => {
      const tips = {
        grade: "",
        type: "",
        item: "",
        line: "",
      };
      if (home.CHL.H + home.CHL.L > 2 || away.CHL.H + away.CHL.L > 2) {
        const CHLStat = (home.CHL.percent + away.CHL.percent) / 2;

        if (CHLStat < 25 || CHLStat > 75) {
          tips.type = "CHL";
          if (CHLStat < 25) {
            tips.item = "L";
            tips.odd = CHL.L;
            tips.line = CHL.LINE;
            tips.grade = "C";
            if (CHLStat < 10) {
              tips.grade = "B";
            }
            if (CHLStat < 5) {
              tips.grade = "A";
            }
          }
          if (CHLStat > 75) {
            tips.item = "H";
            tips.odd = CHL.H;
            tips.line = CHL.LINE;
            tips.grade = "C";
            if (CHLStat > 90) {
              tips.grade = "B";
            }
            if (CHLStat > 95) {
              tips.grade = "A";
            }
          }
        }
      }

      return tips.type ? tips : false;
    },
    fetchTipsResult: ({ result, betItem, betType }) => {
      const r = get(result, `[${betType}]`);
      const first = get(r, "first");
      if (isString(first) && first) {
        return includes(first, betItem) ? "W" : "L";
      } else if (isString(r) && r) {
        return includes(r, betItem) ? "W" : "L";
      }

      return null;
    },
    async init() {
      const today = moment(_.today).add(12, "hours");
      const matches = await Match.getMatchesWithDateRange({
        start: moment(today.subtract(8, "hours")),
        end: moment(moment(today).add(1, "days").subtract(1, "seconds")),
        fields: "id home away odds league num datetime",
      });

      const matchesWithHistoryCalls = matches.map(async (m) =>
        _.fetchMatchHistory(m)
      );

      const matchesWithHistory = await Promise.all(matchesWithHistoryCalls);

      return {
        unexpectedWin: await _.initUnexpectedWin(matchesWithHistory),
        corner: await _.initCorner(matchesWithHistory),
      };
    },
    async initResult() {
      const tips = await TipsSchema.getNoResultTips();

      const tipsResult = compact(
        tips.map((t) => {
          const { match = [], betItem, betType } = t || {};
          const { result, datetime } = head(match) || {};

          if (
            !isEmpty(result) &&
            moment(datetime).isBefore(moment().add(5, "hours"))
          ) {
            const r = _.fetchTipsResult({
              result,
              betItem,
              betType,
            });
            return isNull(r)
              ? false
              : {
                  _id: t._id,
                  result: r,
                };
          }

          return false;
        })
      );

      const insertTipsResultCalls = await tipsResult.map(async (r) => {
        return _.insertTipsResult(r);
      });

      return Promise.all(insertTipsResultCalls);
    },
  };
  return _;
};

module.exports = Tips;
