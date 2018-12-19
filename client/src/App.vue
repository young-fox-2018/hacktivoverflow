<template>
  <div id="app">
    <Header></Header>
    <div v-if="registerSuccess" class="alert alert-success alert-dismissible fade show" role="alert" style="z-index : 1;">
      <strong>Registration Success</strong> Please login to continue
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <Register v-show="!isLogin && !registerSuccess" />
    <div class="mt-5"></div>
    <router-view :questionList="questionList" />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Register from '@/components/Register.vue'
import { mapState } from 'vuex'

export default {
  components : {
    Header,
    Register
  },
  computed : mapState({
    isLogin : state => state.isLogin ,
    registerSuccess : state => state.registerSuccessAlert,
    questionList: state => state.questionList
  }),
  methods : {
    checkToken () {
      if (localStorage.getItem('token')) {
        this.$store.dispatch('isLogged')
      }
    }
  },
  created () {
    this.checkToken()
    this.$store.dispatch('getQuestion')
  }  
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

