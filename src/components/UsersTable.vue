<template>
  <div>
    <b-table
        :data="data"
        :selected.sync="selected"
        >
        <template slot-scope="props">
          <b-table-column field="firstname" label="First Name" sortable>
              {{ props.row.firstname }}
          </b-table-column>

          <b-table-column field="lastname" label="Last Name" sortable>
              {{ props.row.lastname }}
          </b-table-column>

          <b-table-column field="age" label="Age" centered sortable numeric>
              {{ props.row.age }}
          </b-table-column>

          <b-table-column field="available" label="Available" centered>
              <b-checkbox v-model="props.row.available" disabled></b-checkbox>
          </b-table-column>

          <b-table-column field="koord" label="Koord (lat, lon)" centered>
              {{ props.row.koord }}
          </b-table-column>

        </template>

        <template slot="empty">
            <section class="section">
                <div class="content has-text-grey has-text-centered">
                    <p>Nothing here.</p>
                </div>
            </section>
        </template>

    </b-table>

  </div>
</template>

<script>
export default {
  data () {
    const data = this.$store.getters.users
    return {
      data,
      selected: null
    }
  },
  watch: {
    selected: function (val) {
      this.$store.dispatch('setSelectedRow', val)
    }
  }
}
</script>

<style scoped>

</style>
