<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import {server} from '@/config.js'
import Navbar from '@/components/Navbar'

export default {
  components: {
    Navbar
  },
  methods: {
    getDataUser() {
      console.log('masukkkkk')
      if (localStorage.getItem('access_token')) {
        server.request({
          method: 'GET',
          url: '/users',
          headers: {
            token: localStorage.getItem('access_token')
          }
        })
          .then(({data}) => {
            console.log(data, 'data')
            this.$store.dispatch('setDataUser', data)
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  },
  mounted() {
    this.getDataUser()
    if (localStorage.getItem('access_token')) {
      this.$store.dispatch('loginState', true)
      this.$store.dispatch('setDataUser', localStorage.getItem('user'))
    } else {
      this.$store.dispatch('loginState', false)
    }
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
