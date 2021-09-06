import Vue from "vue";

export const state = {
  scheduleData: {}
};

export const mutations = {
  setScheduleData(state, { data, datePicked }) {
    if (data) {
      Vue.set(state.scheduleData, "data", data);
    }
    if (datePicked) {
      Vue.set(state.scheduleData, "datePicked", datePicked);
    }
  }
};

export const actions = {
  async setScheduleData({ dispatch, commit, state }, { data, datePicked }) {
    commit("setScheduleData", { data, datePicked });
  }
};
