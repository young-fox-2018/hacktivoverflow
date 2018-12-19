<template>
    <div id="nav" class="row" style="margin-right:0px">
        <div class="col-6" style="text-align:left">
        <router-link to="/">Home</router-link> |
        <router-link to="/questions">Questions</router-link> |
        <router-link to="/popularity">Popular Users</router-link> |        
        <router-link to="/dashboard/questions" v-if="status"> Dashboard</router-link> 

      </div>
      <div class="col-2">
        <div id="google-signin-button" data-onsuccess="onSignIn"></div>
      </div>
      <div class="col-4">
        <div>
        <router-link to="/register">Register</router-link> |
        <router-link v-if="!status" to="/login">Login</router-link>
        <h3 id="nav" v-else v-on:click="logout()"><b>Logout</b></h3>
        </div>
      </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'NavBar',
  props: ['status'],
  data() {
    return {
      
    }
  },
  methods: {
    logout: function() {
      localStorage.removeItem('token');
      this.$emit('loggedin')
      let auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
      this.$router.push('/')

    },
    onSignIn (user) {
      const profile = user.getBasicProfile()
      let google_token = user.getAuthResponse().id_token
      this.$emit('loggedin')
      console.log('signed in')

      axios({
        method: "Post",
        url: "https://xavier-ho-server.thenile.online/ho/Gsignin",
        data: {google_token: google_token}
      })
      .then((response) => {
        console.log('respnse', response)
        localStorage.setItem('token', response.data.token)
        this.$store.dispatch("decode");
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  mounted() {
    onLoad()
    gapi.signin2.render('google-signin-button', {
      onsuccess: this.onSignIn
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#nav {
  padding: 20px;
  margin-bottom: 20px;
  background-color: indigo;
  color: white

}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.banner {
  margin-bottom: 10px;
  height: 200px
}
h3#nav {
  color:white; 
  font-size:16px; 
  display:inline;
  padding: 0px
}

h3#nav :hover {
  cursor: pointer;
  text-decoration: underline 
}

#google-signin-button {
  display: inline
}

</style>
