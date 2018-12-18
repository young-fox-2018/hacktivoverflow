<template>
  <div id="app">
    <Navbar />
    <b-alert :show="dismissCountDown"
                v-if="success"
                dismissible
                @dismissed="dismissCountDown=0"
                @dismiss-count-down="countDownChanged">
            <p>{{successMessage}}</p>
        </b-alert>
    <div class="row">
      <div class="col-3">
        <tags/>
      </div>
      <div class="col-9">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Tags from '@/components/Tags.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Tags
  },
  data: function() {
    return{
      
    }
  },
  computed: {
      isLoggedIn(){
          return this.$store.state.isLoggedIn
      },
      success(){
          return this.$store.state.success
      },
      successMessage(){
          return this.$store.state.successMessage
      }
  },
  methods: {
    countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown;
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
