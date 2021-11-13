const Match = require("../models/Match");
const moment = require("moment");
const TipsSchema = require("../models/Tips");

const { map, head, compact, get } = require("lodash");

const Tips = () => {
  const _ = {
    today: moment(moment().add(1, "days")).format("YYYY-MM-DD"),
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
        const subtract15Days = moment(_.today).subtract(15, "days");
        const homeHistory = head(
          (await Match.getTeamHistory({
            _id: match.home,
            league: match.league,
            limit: 1,
            fields: "id home away league odds result datetime",
            start: subtract15Days,
          })) || []
        );

        const home =
          homeHistory && homeHistory.id
            ? _.getUnexpectedWin({
                id: homeHistory.id,
                HAD: homeHistory.odds.had[0],
                result: homeHistory.result.HAD,
                teamId: match.home,
                home: homeHistory.home._id,
                away: homeHistory.away._id,
              })
            : false;

        const awayHistory = head(
          await Match.getTeamHistory({
            _id: match.away,
            league: match.league,
            limit: 1,
            fields: "id home away league odds result datetime",
            start: subtract15Days,
          })
        );

        const away =
          awayHistory && awayHistory.id
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
        };

        // 主隊上場受讓羸
        if (isHome) {
          // 主受讓
          if (HG > 0 && A > 1.6) {
            tips.type = HDC ? "HDC" : "HAD";
            tips.item = "A";
            tips.odd = tips.type === "HDC" ? HDC.A : A;
          } else if (AG > 0) {
            tips.type = HDC ? "HDC" : "HHA";
            tips.item = "A";
            tips.odd = tips.type === "HDC" ? HDC.A : HHA_A;
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
          } else if (AG > 0 && H > 1.6) {
            tips.type = HDC ? "HDC" : "HAD";
            tips.item = "H";
            tips.odd = tips.type === "HDC" ? HDC.H : H;
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
    async init() {
      const today = moment(_.today).add(12, "hours");
      const matches = await Match.getMatchesWithDateRange({
        start: moment(today.subtract(8, "hours")),
        end: moment(moment(today).add(1, "days").subtract(1, "seconds")),
        fields: "id home away odds league num datetime",
      });

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
        return TipsSchema.insertTips({
          date: tip.date,
          matchId: tip.matchId,
          type: "UNEXPECTEDWIN",
          betType: tip.type,
          betItem: tip.item,
          betOdd: tip.odd,
          betGrade: tip.grade,
        });
      });

      return Promise.all(insertTips);
    },
  };
  return _;
};

module.exports = Tips;
