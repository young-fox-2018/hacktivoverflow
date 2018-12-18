<template>
  <div>
    <b-navbar toggleable="md" type="light" class="navbar-prop" variant="warning">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand>Quora Destroyer</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav class="ml-auto">
        <div v-if="isLogin">
          <b-navbar-nav>
            <b-button v-b-modal="'questionModal'" size="sm" variant="danger">Add Question</b-button>
            <b-nav-item class="text-dark" @click.prevent="signout">Sign out</b-nav-item>
          </b-navbar-nav>
        </div>
        <div v-else>
          <b-navbar-nav>
            <b-nav-item  v-b-modal="'registerModal'" class="text-dark">Register</b-nav-item>
            <b-nav-item v-b-modal="'signinModal'" class="text-dark">Sign in</b-nav-item>
          </b-navbar-nav>
        </div>
      </b-navbar-nav>
      </b-collapse>
  </b-navbar>
  <AddQuestion :modal="questionModal" />
  <RegisterModal :modal="registerModal" />
  <LoginModal :modal="signinModal" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import AddQuestion from '@/components/AddQuestion.vue'
import RegisterModal from '@/components/RegisterModal.vue'
import LoginModal from '@/components/LoginModal.vue'
export default {
  components: {
    AddQuestion,
    RegisterModal,
    LoginModal
  },
  mounted() {
    if (localStorage.getItem('token')) {
      this.$store.dispatch('checkToken', localStorage.getItem('token'))
    } 
  },
  data () {
    return {
      questionModal: 'questionModal',
      registerModal: 'registerModal',
      signinModal: 'signinModal'
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    })
  },
  methods: {
    signout() {
      localStorage.removeItem('token')
      this.$store.commit('changeLoginState', false)
      this.$router.push('/')
    }
  }
}
</script>
<style>
  .navbar-prop {
    width: 100vw;
    position: fixed;
  }
</style>
