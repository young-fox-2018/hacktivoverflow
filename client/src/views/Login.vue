<template>
  <div>
    <b-container class="mt-5">
      <b-row>
        <b-col cols="3"></b-col>
        <b-col cols="6">
          <b-card title="Login">
            <hr>
            <b-form>

              <b-form-group label="Email address:">
                <b-form-input v-model="email" placeholder="user@mail.com" type="email"></b-form-input>
              </b-form-group>

              <b-form-group label="Password:">
                <b-form-input v-model="password" placeholder="letmein123!@#" type="password"></b-form-input>
              </b-form-group>

              <b-button @click.prevent="login" type="submit" class="mt-4 mb-4" variant="secondary" block>Login</b-button>
              <b-row>
                <b-col cols="4"></b-col>
                <b-col cols="4">
                  <div id="gButton" class="g-signin2" sty></div>
                </b-col>
                <b-col cols="4"></b-col>
              </b-row>
              
              <p class="text-muted mt-3" style="text-align: center;">First time visit? <router-link to="/register" style="text-decoration: none;">register</router-link> here.</p>
            </b-form>
            
          </b-card>
        </b-col>
        <b-col cols="3"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import db from '@/api/server.js'

const gapi = window.gapi

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    login() {
      let data = {
        email: this.email,
        password: this.password
      }
      db.request({
        url: 'users/login',
        method: 'POST',
        data
      })
      .then(({data}) => {
        localStorage.setItem('token', data)
        this.email = ''
        this.password = ''
        this.$store.dispatch('actionUserLoggedIn')
        this.$router.push('/')
      })
      .catch(error => {
        console.log(error)
      })
    },
    onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        var id_token = googleUser.getAuthResponse().id_token;
        db.request({
            url: 'users/login',
            method: 'POST',
            headers: {
                token: id_token
            }
        })
        .then(({data}) => {
            localStorage.setItem('token', data)
            this.$store.dispatch('actionUserLoggedIn')
            this.$router.push('/')
        })
        .catch(error => {
            console.log(error)
        })
    }
  },
  mounted() {
   gapi.signin2.render("gButton", {
     scope: "profile email",
     onsuccess: this.onSignIn,
     onfailure: (err) => alert(err.message)
   })
 }
}
</script>
