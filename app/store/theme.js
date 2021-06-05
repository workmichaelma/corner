const Schedule = require("../graphql/module/schedule");
const { find, map, uniq } = require("lodash");

export const state = {
  loading: false
};

export const mutations = {
  setLoading(state, { payload }) {
    state.loading = payload;
  }
};

export const actions = {
  async setLoading({ dispatch, commit, state }, { payload }) {
    commit("setLoading", {
      payload
    });
  }
};
