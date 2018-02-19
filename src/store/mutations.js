import Vue from 'vue'
export default {
  setLoadingTrue (state) {
    state.loading = true
  },
  setLoadingFalse (state) {
    state.loading = false
  },
  setSelectedRow (state, payload) {
    state.selectedRow = payload
  },
  createUser (state, payload) {
    state.users.unshift(payload)
  },
  updateUser (state, payload) {
    Vue.set(state.users, state.users.map(item => item.id).indexOf(payload.id), payload)
    state.selectedRow = null
  },
  removeUser (state, payload) {
    state.users.splice(state.users.map(item => item.id).indexOf(payload), 1)
    state.selectedRow = null
  },
  createMap (state) {
    state.map = new window.google.maps.Map(document.getElementById('map'), {
      center: new window.google.maps.LatLng(0, 0),
      zoom: 1
    })
  },
  setRouteSet (state) {
    state.isRouteSet = true
  },
  clearRouteSet (state) {
    state.isRouteSet = false
  },
  setrouteMarkers (state, payload) {
    state.routeMarkers.push(payload)
  },
  clearrouteMarkers (state) {
    state.routeMarkers = []
  }
}
