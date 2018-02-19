<template>
  <div id="app" class="container">
    <nav class="navbar is-primary">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">Vue, GoogleMap Playground</a>
        <div class="navbar-burger burger" v-bind:class="[isBurgerActive ? 'is-active' : '']" v-on:click="toggleBurger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div class="navbar-menu" v-bind:class="[isBurgerActive ? 'is-active' : '']">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control"><a class="button is-info is-small is-rounded" href="#" @click="AddUser"><span>Add</span></a></p>
              <p class="control"><a class="button is-success is-small is-rounded " href="#" @click="EditUser" :disabled="!isActiveRow" ><span>Edit</span></a></p>
              <p class="control"><a class="button is-danger is-small is-rounded" href="#" @click="confirmDelete" :disabled="!isActiveRow" ><span>Delete</span></a></p>
              <p class="control"><a class="button is-small is-rounded" href="#" @click="getRoute" ><span>Get Route</span></a></p>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div id="table">
      <UsersTable/>
    </div>
    <div id="map">
      <GoogleMap/>
    </div>

    <b-loading :active.sync="this.$store.getters.loading" :canCancel="true"></b-loading>
  </div>
</template>

<script>
import UsersTable from './components/UsersTable'
import GoogleMap from './components/GoogleMap'
import ModalUser from './components/ModalUser'
import ModalRoute from './components/ModalRoute'

export default {
  name: 'App',
  data: function () {
    return {
      isBurgerActive: false
    }
  },
  methods: {
    toggleBurger () {
      this.isBurgerActive = !this.isBurgerActive
    },
    AddUser () {
      this.$modal.open({
        parent: this,
        component: ModalUser,
        hasModalCard: true,
        props: {
          mode: 'Add'
        }
      })
    },
    EditUser () {
      if (this.$store.getters.getSelectedRow) {
        const activeUserData = this.$store.getters.getSelectedRow
        this.$modal.open({
          parent: this,
          component: ModalUser,
          hasModalCard: true,
          props: {
            mode: 'Edit',
            user: {
              id: activeUserData.id,
              firstname: activeUserData.firstname,
              lastname: activeUserData.lastname,
              age: activeUserData.age,
              available: activeUserData.available,
              koord: activeUserData.koord
            }
          }
        })
      }
    },
    confirmDelete () {
      const vm = this
      if (vm.$store.getters.getSelectedRow) {
        vm.$dialog.confirm({
          title: 'Deleting user',
          message: 'Are you sure you want to <b>delete</b> ?',
          confirmText: 'Delete user',
          type: 'is-danger',
          onConfirm: function () {
            vm.$store.dispatch('removeUser', vm.$store.getters.getSelectedRow.id).then(() => {
              vm.$toast.open('User deleted!')
            })
          }
        })
      }
    },
    getRoute () {
      this.$modal.open({
        parent: this,
        component: ModalRoute,
        hasModalCard: true
      })
    }
  },
  computed: {
    isActiveRow () {
      return this.$store.getters.getSelectedRow
    }
  },
  components: {
    UsersTable,
    GoogleMap,
    ModalUser,
    ModalRoute
  },
  mounted () {
    this.$store.dispatch('createMap')
    // console.log(this.isRouteSet)
    /*
    //this.bounds = new google.maps.LatLngBounds();
    const element = document.getElementById('map')
    const options = {
      center: new google.maps.LatLng(0, 0),
      zoom: 1
    }
    this.$store.state.map = new google.maps.Map(element, options);
    /*
    this.markerCoordinates.forEach((coord) => {
      const position = new google.maps.LatLng(coord.latitude, coord.longitude);
      const marker = new google.maps.Marker({
        position,
        map: this.map
      });
      this.markers.push(marker)
      this.map.fitBounds(this.bounds.extend(position))
    });
    */
  }
}
</script>

<style scoped>
#app {

  height: 100%;
  margin: 0 auto;

  #background-color: pink;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

#table {
  width: 100%;
  height: 46%;
  overflow:auto;
  background-color: white;
}

#map {
  height: 46%;
  background-color: green;
}

</style>
