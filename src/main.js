import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import { store } from './store/index'
import Config from './config.js'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

Vue.use(Buefy)
Vue.config.productionTip = false

new Vue({ // eslint-disable-line no-new
  el: '#app',
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp(Config.googleFirebase)
    this.$store.dispatch('loadUsersFromDatabase')
  }
})
