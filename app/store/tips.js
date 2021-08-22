const Tips = require("../graphql/module/Tips");

export const state = () => {
  return {
    matches: []
  };
};

export const mutations = {
  init(state, { matches }) {
    state.matches = matches;
  }
};

export const actions = {
  async init({ dispatch, commit, state }) {
    dispatch("theme/setLoading", { payload: true }, { root: true });
    const matches = await Tips.getTips({
      clients: this.app.apolloProvider.clients
    });

    dispatch("theme/setLoading", { payload: false }, { root: true });
    commit("init", {
      matches
    });
  }
};
