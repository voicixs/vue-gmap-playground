<template>
  <section></section>
</template>

<script>
import helpers from '../mixins/helpers'

export default {
  data: function () {
    return {
      markers: [],
      bounds: null
    }
  },
  computed: {
    koords () {
      return this.$store.getters.getSelectedRow
    }
  },
  watch: {
    koords: function (val) {
      if (val) {
        let map = this.$store.getters.getMap
        this.bounds = new window.google.maps.LatLngBounds()

        if (this.markers.length > 0) {
          this.markers[0].setMap(null)
          this.markers = []
        }

        const lat = this.getActiveLat
        const lon = this.getActiveLon

        if (lat === 0 && lon === 0) {
          map.setZoom(1)
        } else {
          const position = new window.google.maps.LatLng(lat, lon)
          this.bounds.extend(position)
          const marker = new window.google.maps.Marker({
            position,
            map: map,
            icon: '/static/marker.png'
          })
          map.panTo(position)
          this.markers.push(marker)
          // map.fitBounds(this.bounds);
          if (map.getZoom() === 1) map.setZoom(16)
          map.panToBounds(this.bounds)
        }
      }
    }
  },
  mixins: [helpers]
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
