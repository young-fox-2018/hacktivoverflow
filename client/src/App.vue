<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <b-navbar toggleable="md" type="ligth" variant="light" class="border sticky-top">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <router-link to="/" tag="div">
      <div class="d-inline">
        <b-navbar-brand href="#">
          <a><img width="38vh" src="https://res-1.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1482132470/vfmmn0twb17nn2epblee.png"></a>
          <a><img src="https://img.icons8.com/metro/1600/stackoverflow.png" width="30vh"></a>
          <!-- Hacktiv Overflow -->
          </b-navbar-brand>
      </div>
      </router-link>

      <form class="mx-3 my-0 d-inline w-100 px-5" @submit.prevent="searchQuestion">
          <div class="input-group align-item-center">
              <input type="text" class="form-control" placeholder="Search something" v-model="search">
              <div class="input-group-append">
                  <button class="btn btn-danger" type="submit">
                  <span class="input-group-addon" style="width:1%;"><i class="fa fa-search"></i></span>
                  </button>
              </div>
          </div>
      </form>
      <b-navbar-nav>
        <router-link v-if="!isLogin" to="/login" tag="div"><b-nav-item href="#">Login</b-nav-item></router-link>
        <router-link v-if="!isLogin" to="/register" tag="div"><b-nav-item href="#">Register</b-nav-item></router-link>
        <router-link v-if="isLogin" to="/my" tag="div"><b-nav-item href="#" class="w-100">MyQuestion</b-nav-item></router-link>
        <b-nav-item href="#" id="logoutButton" v-if="isLogin" @click="logoutSend">Logout</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    
    <router-view @successlogin="successLogin"/>




    <FooterPage />
  </div>
</template>
<script>
// import FooterPage from '/@components/FooterPage.vue'
import FooterPage from '@/components/FooterPage.vue'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      search: ''
    }
  },
  components: {
    FooterPage
  },
  mounted() {
    this.$store.dispatch('checkLogin')
    this.$store.dispatch('readAllQuestion')
    this.$store.dispatch('readMyQuestion')
  },
  computed: {
    ...mapState(['isLogin']),
  },
  methods: {
    logoutSend() {

      gapi.load('auth2', function() {
        gapi.auth2.init();
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut()
      });
      
      this.$store.dispatch('logoutSend')
    },
    successLogin() {
      this.$store.dispatch('checkLogin')
      this.$router.push({name: 'home'})
    },
    searchQuestion() {
      // console.log(this.search)
      this.$store.dispatch('searchQuestion', this.search)
      // this.search = ''
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  background-color: #e5e5e5

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


.container {
  background-color: #ffffff
}

.container-fluid {
  background-color: #ffffff
}
</style>
