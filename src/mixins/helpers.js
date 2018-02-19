export default {
  computed: {
    getActiveLat: function () {
      const input = this.$store.getters.getSelectedRow.koord.split(',')
      if (input.length !== 2 || !Number.isFinite(input[0] * 1)) {
        return 0
      } else {
        return input[0]
      }
    },
    getActiveLon: function () {
      const input = this.$store.getters.getSelectedRow.koord.split(',')
      if (input.length !== 2 || !Number.isFinite(input[1] * 1)) {
        return 0
      } else {
        return input[1]
      }
    }
  }
}
