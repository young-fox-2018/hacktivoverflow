<template>
  <div id="app">
    <NavBar :status="loggedStatus" v-on:loggedin="changeStatus"></NavBar>
    <router-view v-on:loggedin="changeStatus"/>
  </div>
</template>

<script>
import axios from 'axios';
import NavBar from '@/components/NavBar.vue'
import {mapState} from 'vuex'

export default {
  name: 'App',
  components: {
    NavBar,
  },
  data () {
    return {
      loggedStatus: null
    }
  },
  methods: {
    changeStatus: function() {
      if(this.loggedStatus) {
        this.loggedStatus = false
        this.$store.dispatch('changeLogStatus', 'false')
      } else {
        this.loggedStatus = true
        this.$store.dispatch('changeLogStatus', 'true')
      }
    }
  },
  mounted: function() {
    let token = localStorage.getItem('token')
    if(token) {
      this.loggedStatus = true
    } else {
      this.loggedStatus = false
    }
    this.$store.dispatch("decode");
  },
  computed: mapState({

  }),
  created: function() {
    this.$store.dispatch('storeQuestions_Action')
    this.$store.dispatch('getAllTags')
  },

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
  color: white;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
body {
  background-color: white
}
.subtitle {
  font-size: 14px;
  color: lightslategray;
}
</style>
