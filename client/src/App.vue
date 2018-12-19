<template>
  <div id="app">
    <div id="nav">
  <v-toolbar dark v-show="!isLogin">
      
        <v-toolbar-title><img src="./assets/overflow.png" alt="" style="max-height:45%; max-width:45%; padding-top:20px; padding-right: 20px;"></v-toolbar-title>
        <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-sm-and-down">
             <router-link to="/">
             <v-btn block floating true>Home</v-btn>
             </router-link>
             <router-link to="/signup">
              <v-btn block floating true>Sign Up</v-btn>
             </router-link>
              <router-link to="/signin">
              <v-btn block floating true>Sign In</v-btn>
             </router-link>
             
          </v-toolbar-items>
  </v-toolbar>
   <v-toolbar dark v-show="isLogin">
        <v-toolbar-title><img src="./assets/overflow.png" alt="" style="max-height:45%; max-width:45%; padding-top:20px; padding-right: 20px;"></v-toolbar-title>
        <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-sm-and-down">
             <router-link to="/">
             <v-btn block floating true>Home</v-btn>
             </router-link>
              <v-btn block floating true @click="signOut">Sign Out</v-btn>
          </v-toolbar-items>
  </v-toolbar>
    </div>
    <router-view/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      
    }
  },
  created () {
    this.isLoggedIn()
    this.statusLogIn()
  },
  computed: {
    statusLogIn () {
      if (this.$store.state.isLogin){
        return this.$store.state.isLogin
      }
    },
    ...mapState(['isLogin'])
  },
  mounted() {
    return this.$store.state.isLogin
  },
   methods: {
    isLoggedIn: function () {
      if (localStorage.getItem('token')) {
        this.$store.dispatch('actionUserLogIn')
      } else {
       this.$store.dispatch('actionUserLogOut')
      }
    },
     signOut() {
            localStorage.clear()
            this.$store.dispatch('actionUserLogOut')
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
              console.log('user sign out')
            });
            this.$router.push('/')
    },
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
