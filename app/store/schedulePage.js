const Schedule = require("../graphql/module/schedule");
const { find, map, uniq, isEmpty } = require("lodash");

export const state = {
  ended: [],
  future: []
};

export const mutations = {
  init(state, { type, matches }) {
    state[type] = matches;
  }
};

export const actions = {
  async init({ dispatch, commit, state }, { ended }) {
    const stateType = ended ? "ended" : "future";

    if (isEmpty(state[stateType])) {
      dispatch("theme/setLoading", { payload: true }, { root: true });
      const matches = await Schedule.getSchedule({
        clients: this.app.apolloProvider.clients,
        ended,
        limit: 100
      });

      dispatch("theme/setLoading", { payload: false }, { root: true });

      commit("init", {
        type: stateType,
        matches
      });
    }
  }
};
