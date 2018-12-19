<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>-->
      <b-navbar toggleable="md" type="light" variant="light">

        <b-container>

          <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

          <b-navbar-brand href="#"><img src="@/assets/logo.png" style="max-height: 50px;"></b-navbar-brand>

          <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
              <b-nav-item><router-link style="text-decoration: none; color: grey;" to="/"><i class="fa fa-home" aria-hidden="true"></i> Home</router-link></b-nav-item>
              <b-nav-item v-if="loginCheck"><router-link style="text-decoration: none; color: grey;" to="/myQuestion"><i class="fa fa-question-circle" aria-hidden="true"></i> My Question</router-link></b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto ml-">
              <b-nav-item right v-if="!loginCheck"><router-link style="text-decoration: none; color: grey;" to="/login"><i class="fa fa-sign-in" aria-hidden="true"></i> Login</router-link></b-nav-item>
              <b-nav-item right v-if="!loginCheck"><router-link style="text-decoration: none; color: grey;" to="/register"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Register</router-link></b-nav-item>
              <b-nav-item @click="logout" right v-if="loginCheck"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</b-nav-item>
            </b-navbar-nav>
          </b-collapse>

        </b-container>

      </b-navbar>
    </div>

    <router-view style="min-height: 100vh;"/>
    
    <footer>
      <div style="height: 80px; background-color: #f8f9fa;">
      <b-container>
        <b-row class="text-center">
          <b-col></b-col>
          <b-col style="margin-top: 2.5%;">
            <p style="color: grey;">© 2018 Hacktiv Overflow, all rights reserved.</p>
          </b-col>
          <b-col></b-col>
        </b-row>
      </b-container>
      </div>
    </footer>
  </div>
</template>

<script>
const gapi = window.gapi
export default {
  methods: {
    checkLogin() {
      if (localStorage.getItem('token')) {
        this.$store.dispatch('actionUserLoggedIn')
      }
      else {
        this.$store.dispatch('actionUserLoggedOut')
      }
    },
    logout() {
      var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
          localStorage.removeItem('token')
          this.$store.dispatch('actionUserLoggedOut')
          this.checkLogin()
          this.$router.push('/')
        })
    }
  },

  computed: {
    loginCheck() {
      return this.$store.state.isLogin
    }
  },

  created() {
    this.checkLogin()
    this.$store.dispatch('actionUserProfile', localStorage.getItem('token'))
  }
}
</script>
