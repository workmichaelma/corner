const axios = require("axios");

export const state = {
  matches: []
};

export const mutations = {
  init(state, { matches }) {
    state.matches = matches;
  }
};

export const actions = {
  async init({ dispatch, commit, state }) {
    dispatch("theme/setLoading", { payload: true }, { root: true });
    const { data } = await axios.get(
      "https://ds04s2074b.execute-api.ap-east-1.amazonaws.com/api/heibai?all=true"
    );
    dispatch("theme/setLoading", { payload: false }, { root: true });
    commit("init", {
      matches: data
    });
  }
};
