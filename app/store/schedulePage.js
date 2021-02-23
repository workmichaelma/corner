const Schedule = require('../graphql/module/schedule')
const { find, map, uniq } = require('lodash')

export const state = {
  ended: [],
  future: []
}

export const mutations = {
  init(state, { type, matches }) {
    state[type] = matches
  },
}

export const actions = {
  async init ({ dispatch, commit, state }, { ended }) {
    const stateType = ended ? 'ended' : 'future'
    const matches = await Schedule.getSchedule({
      apolloProvider: this.app.apolloProvider.clients.defaultClient,
      ended
    })

    commit('init', {
      type: stateType,
      matches
    })
  }
}