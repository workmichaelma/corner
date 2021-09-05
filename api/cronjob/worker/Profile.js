const axios = require("axios");
const moment = require("moment");
const Match = require("../models/Match");
const Team = require("../models/Team");
const { API_DOMAIN } = require("../../config");
const { compact, get, map, reduce, filter } = require("lodash");

const Profile = () => {
  const _ = {
    current: [],
    win: {},
    winByWinTeamName: {},
    winByWinTeamId: {},
    winByTeamId: {},
    matches: [],
    m: [],
    async init() {
      await _.getCurrent();
      if (_.current.length > 0) {
        await _.getWin();
        await _.buildWinsBy();
        await _.mapMatches();
        return _.saveMatches();
      }
      return _;
    },
    async getCurrent() {
      const matches = await Match.getFutureMatches();

      const req = await map(matches, async (m) => {
        const needUpdate = await _.isMatchNeedUpdate(m);
        return needUpdate ? m : false;
      });

      _.current = compact(await Promise.all(req));
    },
    async isMatchNeedUpdate(m) {
      try {
        const home = await Team.findTeamByObjectId(m.home);
        const away = await Team.findTeamByObjectId(m.away);
        return !(home.winId && away.winId && m.winId);
      } catch (err) {
        return false;
      }
    },
    async getWin() {
      _.win = await axios
        .get(`${API_DOMAIN}/win/schedule`)
        .then((res) => {
          return res.data && res.data.length ? res.data : [];
        })
        .catch((err) => {
          console.error("Schedule -> getWin() error", err);
        });
    },
    async buildWinBy(w) {
      try {
        const { id: homeId, name: homeName } = get(w, "winHomeTeam", {});
        const { id: awayId, name: awayName } = get(w, "winAwayTeam", {});
        const winId = get(w, "winId");
        if (winId) {
          const homeTeamId = await _.getTeamObjectIdByWinId(homeId);
          const awayTeamId = await _.getTeamObjectIdByWinId(awayId);

          // Team Model 有紀錄
          if (homeTeamId || awayTeamId) {
            if (homeTeamId) {
              _.winByTeamId[homeTeamId] = [
                ...(_.winByTeamId[homeTeamId] || []),
                w,
              ];
            }
            if (awayTeamId) {
              _.winByTeamId[awayTeamId] = [
                ...(_.winByTeamId[awayTeamId] || []),
                w,
              ];
            }
          } else {
            if (homeId) {
              _.winByWinTeamId[homeId] = [
                ...(_.winByWinTeamId[homeId] || []),
                w,
              ];
            }
            if (homeName) {
              _.winByWinTeamName[homeName] = [
                ...(_.winByWinTeamName[homeName] || []),
                w,
              ];
            }
            if (awayId) {
              _.winByWinTeamId[awayId] = [
                ...(_.winByWinTeamId[awayId] || []),
                w,
              ];
            }
            if (awayName) {
              _.winByWinTeamName[awayName] = [
                ...(_.winByWinTeamName[awayName] || []),
                w,
              ];
            }
          }
        }
      } catch (err) {
        console.log("Schedule -> buildWinBy(), error");
      }
    },
    async buildWinsBy() {
      const req = map(_.win, async (w) => {
        if (w.winId) {
          await _.buildWinBy(w);
        }
      });

      await Promise.all(req);
    },
    async getTeamObjectIdByWinId(winId) {
      const { _id } = (await Team.findTeamByWinId(winId)) || {};
      if (_id) {
        return _id;
      }
      return false;
    },
    async mapMatches() {
      const req = await map(_.current, async (m) => {
        const winMatch = await _.mapMatch(m);
        if (winMatch === null) {
          return false;
        }
        if (winMatch) {
          return {
            ...m._doc,
            winMatch,
          };
        }
      });

      _.matches = compact(await Promise.all(req));
    },
    async mapMatch(m) {
      try {
        const { home, away } = m || {};
        let winMatch = null;
        if (!!_.winByTeamId[home]) {
          winMatch = _.pairMatchByDate(m, _.winByTeamId[home]);
        }
        if (!!_.winByTeamId[away]) {
          winMatch = _.pairMatchByDate(m, _.winByTeamId[away]);
        }

        if (winMatch === null) {
          const homeTeam = (await Team.findTeamByObjectId(home)) || {};
          const awayTeam = (await Team.findTeamByObjectId(away)) || {};
          if (_.winByWinTeamId[homeTeam.winId]) {
            winMatch = _.pairMatchByDate(m, _.winByWinTeamId[homeTeam.winId]);
          }
          if (_.winByWinTeamName[homeTeam.name]) {
            winMatch = _.pairMatchByDate(m, _.winByWinTeamName[homeTeam.name]);
          }
          if (_.winByWinTeamId[awayTeam.winId]) {
            winMatch = _.pairMatchByDate(m, _.winByWinTeamId[awayTeam.winId]);
          }
          if (_.winByWinTeamName[awayTeam.name]) {
            winMatch = _.pairMatchByDate(m, _.winByWinTeamName[awayTeam.name]);
          }
        }
        return winMatch;
      } catch (err) {
        return null;
      }
    },
    pairMatchByDate(match, wins = []) {
      const datetime = moment(match.datetime);
      return reduce(
        wins,
        (result, m) => {
          if (moment(parseInt(m.winDatetime)).diff(datetime, "days") < 2) {
            result = m;
          }
          return result;
        },
        null
      );
    },
    async saveMatches() {
      const req = await map(_.matches, async (m) => {
        await _.updateTeam(m);

        return Match.updateMatchWinProfile({
          _id: m._id,
          winId: get(m.winMatch, "winId"),
          homeRank: get(m.winMatch, "winHomeTeam.rank"),
          awayRank: get(m.winMatch, "winAwayTeam.rank"),
        });
      });

      return Promise.all(req);
    },
    async updateTeam(match) {
      const { winMatch, home, away } = match || {};

      if (get(winMatch, "winHomeTeam.id")) {
        await Team.updateTeam(home, {
          winId: get(winMatch, "winHomeTeam.id"),
        });
      }
      if (get(winMatch, "winAwayTeam.id")) {
        await Team.updateTeam(away, {
          winId: get(winMatch, "winAwayTeam.id"),
        });
      }
    },
  };

  return _;
};

module.exports = Profile;
