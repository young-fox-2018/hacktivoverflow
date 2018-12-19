<template>
  <div class="home">
    <div class="text-center">
    </div>
    <Login />
    <Register />
    <div class="container">
      <div class="row">
        <div class="col-md-3 col-sm-6"></div>
        <div class="col-md-6 col-sm-6">
          <div v-if="route">
            <FormQuestion />
            <CardQuestion />
          </div>
          <router-view v-else/>
        </div>
        <div class="col-md-3 col-sm-6">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import CardQuestion from '@/components/CardQuestion.vue'
import FormQuestion from '@/components/FormQuestion.vue'

export default {
  name: 'home',
  components: {
    Login,
    Register,
    CardQuestion,
    FormQuestion
  },
  data() {
    return {
      login: '',
      route: true
    }
  },
  methods: {

  },
  computed: {
    statusLogin() {
      return this.$store.state.statusLogin
    },
    statusRegister() {
      return this.$store.state.statusRegister
    } 
  },

  watch: {
    $route() {
      if (this.route) this.route = false
      else this.route = true
    },
    statusLogin(v) {
      if (v) $('#login').modal('show');
    },
    statusRegister(v) {
      if (v) $('#register').modal('show');
    }
  }
}
</script>
