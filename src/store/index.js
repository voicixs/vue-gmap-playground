import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loading: false,
    users: [],
    selectedRow: null,
    map: null,
    routeMarkers: []
  },
  getters,
  mutations,
  actions
})
