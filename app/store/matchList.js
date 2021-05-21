const Schedule = require("../graphql/module/schedule");
const { find, map, uniq } = require("lodash");

export const state = () => ({
  upcoming: [
    "2c87579b-c8fa-4fc2-abe8-599a7680ed02",
    "d258fda1-aa59-4f8d-ade6-13ea43cac3bc"
  ],
  ended: [
    // 'a93b869d-2a69-4227-b890-93dff1fd0c3a',
    // '9b3c5c5c-e544-4aa5-b8e4-bf8dbc61d0bc',
    // '032c13b4-1be0-4f68-ad2e-7beab2d5cc7b',
  ]
});

export const mutations = {
  init(state, { type, matchIds }) {
    state[type] = [...state[type], ...matchIds];
  }
};

export const actions = {
  async init({ dispatch, commit, state }, { ended }) {
    const stateType = ended ? "ended" : "upcoming";
    const matches = await Schedule.getSchedule({
      apolloProvider: this.app.apolloProvider.clients,
      ended: "FUCK",
      limit: 20
    });

    const matchIds = uniq([...state[stateType], ...map(matches, "id")]);
    commit("init", {
      type: stateType,
      matchIds
    });
    commit(
      "match/addMatches",
      map(matchIds, id => {
        return find(matches, { id });
      }),
      { root: true }
    );
  }
};
