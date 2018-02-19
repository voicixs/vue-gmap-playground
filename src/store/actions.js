import * as firebase from 'firebase'

export default {
  loadUsersFromDatabase ({commit}) {
    commit('setLoadingTrue')
    firebase.database().ref('users').once('value')
      .then((data) => {
        const user = data.val()
        for (let key in user) {
          commit('createUser', {
            id: key,
            firstname: user[key].firstname,
            lastname: user[key].lastname,
            age: user[key].age,
            available: user[key].available,
            koord: user[key].koord
          })
        }
        commit('setLoadingFalse')
      })
      .catch(
        (error) => {
          console.log(error)
          commit('setLoadingFalse')
        }
      )
  },
  setSelectedRow ({commit}, row) {
    commit('setSelectedRow', row)
  },
  async saveUser ({commit, getters}, payload) {
    commit('setLoadingTrue')
    const user = payload
    if (user.id) {
      firebase.database().ref('users').child(user.id).update({
        firstname: user.firstname,
        lastname: user.lastname,
        age: user.age,
        koord: user.koord,
        available: user.available ? user.available : null
      })
        .then((data) => {
          commit('updateUser', user)
          commit('setLoadingFalse')
        })
        .catch((error) => {
          console.log(error)
          commit('setLoadingFalse')
        })
    } else {
      firebase.database().ref('users').push(user)
        .then((data) => {
          const key = data.key
          commit('createUser', {
            ...user,
            id: key
          })
          commit('setLoadingFalse')
        })
        .catch((error) => {
          console.log(error)
          commit('setLoadingFalse')
        })
    }
  },
  async removeUser ({commit}, payload) {
    commit('setLoadingTrue')
    const userkey = payload
    firebase.database().ref('users/' + userkey).remove()
      .then((data) => {
        commit('removeUser', userkey)
        commit('setLoadingFalse')
      })
      .catch((error) => {
        console.log(error)
        commit('setLoadingFalse')
      })
  },
  createMap ({commit}) {
    commit('createMap')
  }
}
