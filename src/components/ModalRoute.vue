<template>
  <section>
    <form @submit.prevent="SetRoute">
        <div class="modal-card" style="width: 500px">
            <header class="modal-card-head">
                <p class="modal-card-title">Set Route</p>
            </header>

            <section class="modal-card-body">
              <b-field label="From">
                  <b-input
                      ref="routeFrom"
                      v-model="from.input"
                      type="text"
                      placeholder="From"
                      required>
                  </b-input>
              </b-field>

              <b-field label="To">
                  <b-input
                      ref="routeTo"
                      v-model="to.input"
                      type="text"
                      placeholder="To"
                      required>
                  </b-input>
              </b-field>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-primary" >Set Route</button>
                <button class="button" type="button" @click="$parent.close()">Close</button>
            </footer>
        </div>
    </form>
  </section>
</template>

<script>
export default {
  data () {
    return {
      map: null,
      directionsService: null,
      directionsDisplay: null,
      bounds: null,
      from: {
        input: null,
        autocomplete: null,
        coords: null
      },
      to: {
        input: null,
        autocomplete: null,
        coords: null
      }
    }
  },
  computed: {
    markers () {
      return this.$store.getters.getrouteMarkers
    }
  },
  methods: {
    SetRoute () {
      // this.directionsDisplay.setDirections(null)
      this.clearRoute()

      if (this.from.coords && this.from.coords) {
        const pointA = new window.google.maps.Marker({ // eslint-disable-line no-new
          position: this.from.coords,
          map: this.map
        })
        const pointB = new window.google.maps.Marker({ // eslint-disable-line no-new
          position: this.to.coords,
          map: this.map
        })

        this.$store.commit('setrouteMarkers', pointA)
        this.$store.commit('setrouteMarkers', pointB)

        this.map.fitBounds(this.bounds.extend(this.from.coords))
        this.map.fitBounds(this.bounds.extend(this.to.coords))
        let vm = this
        this.directionsService.route({
          origin: this.from.coords,
          destination: this.to.coords,
          avoidTolls: true,
          avoidHighways: false,
          travelMode: window.google.maps.TravelMode.DRIVING
        }, function (response, status) {
          if (status === window.google.maps.DirectionsStatus.OK) {
            vm.directionsDisplay.setDirections(response)
            vm.$store.commit('setRouteSet')
          } else {
            console.log('Directions request failed due to ' + status)
          }
        })
      }
      this.$parent.close()
    },
    clearRoute () {
      if (this.markers.length > 0) {
        for (var i = 0; i < this.markers.length; i++) {
          this.markers[i].setMap(null)
        }
        this.$store.commit('clearrouteMarkers')
        // console.log("finish" + this.markers.length)
      }
    },
    onFromChanged () {
      var place = this.from.autocomplete.getPlace()
      if (!place.geometry) {
        console.log("No details available for input: '" + place.name + "'")
      } else {
        this.from.coords = place.geometry.location
      }
    },
    onToChanged () {
      var place = this.to.autocomplete.getPlace()
      if (!place.geometry) {
        console.log("No details available for input: '" + place.name + "'")
      } else {
        this.to.coords = place.geometry.location
      }
    }
  },
  mounted () {
    this.map = this.$store.getters.getMap

    this.bounds = new window.google.maps.LatLngBounds()

    this.from.autocomplete = new window.google.maps.places.Autocomplete(this.$refs.routeFrom.$refs.input)
    this.to.autocomplete = new window.google.maps.places.Autocomplete(this.$refs.routeTo.$refs.input)

    this.from.autocomplete.addListener('place_changed', this.onFromChanged)
    this.to.autocomplete.addListener('place_changed', this.onToChanged)

    this.directionsService = new window.google.maps.DirectionsService()
    this.directionsDisplay = new window.google.maps.DirectionsRenderer({
      map: this.map
      // suppressPolylines: true
    })
  },
  created () {

  }
}
</script>
