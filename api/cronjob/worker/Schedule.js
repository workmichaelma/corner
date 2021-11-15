const Match = require("../models/Match");
const League = require("../models/League");
const Team = require("../models/Team");
const { API_DOMAIN } = require("../../config");
const axios = require("axios");
const { compact, map, filter, includes } = require("lodash");
const moment = require("moment");

const Schedule = () => {
  const _ = {
    url: `${API_DOMAIN}/schedule`,
    current: [],
    future: [],
    newMatches: [],
    async init() {
      await _.getFuture();
      await _.getCurrent();
      _.getNewMatches();
      await _.buildMatches();
      return _.insertNewMatches();
    },
    async getFuture() {
      _.future = await axios
        .get(_.url)
        .then((res) => {
          return res.data && res.data.length ? res.data : [];
        })
        .catch((err) => {
          console.log("Scehdule -> getFuture");
          return [];
        });
    },
    async getCurrent() {
      _.current = await Match.getFutureMatches();
    },
    getNewMatches() {
      const currentIds = map(_.current, "id");
      _.newMatches = filter(_.future, (m) => {
        return !includes(currentIds, m.id);
      });
    },
    async buildMatches() {
      const req = await compact(
        map(_.newMatches, async (m) => {
          return _.buildMatch(m);
        })
      );

      _.newMatches = await Promise.all(req);
    },
    async buildMatch(m) {
      try {
        const home = await _.mapTeam(m.home);
        const away = await _.mapTeam(m.away);
        const league = await _.mapLeague(m.league);

        return {
          ...m,
          home,
          away,
          league,
          datetime: moment(m.datetime).toDate(),
        };
      } catch (err) {
        console.log({ err });
        return null;
      }
    },
    async mapTeam({ name, id }) {
      const { _id } = (await Team.findTeamByName(name)) || {};

      if (_id) {
        return _id;
      } else {
        const { _id } = await Team.insertTeam({
          name,
          id,
        });
        return _id;
      }
    },
    async mapLeague({ name, id }) {
      const { _id } = (await League.findLeagueByName(name)) || {};

      if (_id) {
        return _id;
      } else {
        const { _id } = await League.insertLeague({
          name,
          id,
        });
        return _id;
      }
    },
    async insertNewMatches() {
      try {
        const req = await map(_.newMatches, async (m) => {
          return Match.saveMatch(m);
        });

        return Promise.all(req);
      } catch (err) {
        console.log("Profile -> insertNewMatches() error: ");
        return [];
      }
    },
  };

  return _;
};

module.exports = Schedule;
