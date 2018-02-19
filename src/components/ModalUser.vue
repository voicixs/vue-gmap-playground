<template>
  <section>
    <form @submit.prevent="SaveUser">
        <div class="modal-card" style="width: 500px">
            <header class="modal-card-head">
                <p class="modal-card-title">{{ mode }} User</p>
            </header>

            <section class="modal-card-body">

                <b-field label="First name">
                    <b-input
                        v-model="user.firstname"
                        type="text"
                        placeholder="First name"
                        required>
                    </b-input>
                </b-field>

                <b-field label="Last name">
                    <b-input
                        v-model="user.lastname"
                        type="text"
                        placeholder="Last name"
                        required>
                    </b-input>
                </b-field>

                <b-field label="Age">
                    <b-input
                        v-model="user.age"
                        type="number"
                        placeholder="Age"
                        required>
                    </b-input>
                </b-field>

                <b-field label="Koord">
                    <b-input
                        v-model="user.koord"
                        type="text"
                        placeholder="Koord"
                        required>
                    </b-input>
                </b-field>

                <div class="field">
                    <b-checkbox v-model="user.available">Available</b-checkbox>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-primary" >{{ mode }}</button>
                <button class="button" type="button" @click="$parent.close()">Close</button>
            </footer>
        </div>
    </form>
  </section>
</template>

<script>
export default {
  props: {
    mode: {
      type: String
    },
    user: {
      type: Object,
      default: function () {
        return {
          user: {
            id: null,
            firstname: null,
            lastname: null,
            age: null,
            available: null,
            koord: null
          }
        }
      }
    }
  },
  methods: {
    SaveUser () {
      this.$store.dispatch('saveUser', this.user).then(() => {
        this.$parent.close()
      })
    }
  }
}
</script>
