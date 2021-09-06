import { map, isUndefined } from "lodash";

import Match from "../graphql/module/match";

export const state = {};

export const actions = {
  async fetchMatch({ dispatch, commit, state }, { id }) {
    if (isUndefined(state[id])) {
      const match = await Match.fetchMatch({
        clients: this.app.apolloProvider.clients,
        id
      });
      commit("addMatch", match);
      return !isUndefined(match);
    }
    return true;
  }
};

export const mutations = {
  addMatch: (state, match) => {
    const { id } = match || {};
    state[id] = match;
  },
  addMatches: (state, matches) => {
    map(matches, match => {
      const { id } = match || {};
      if (id && isUndefined(state[id])) {
        state[id] = match;
      }
    });
  }
};
