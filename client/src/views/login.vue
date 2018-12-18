<template>
  <div id="login">
    <h3 class="text-center text-white pt-5">Login form</h3>
    <div class="container">
      <div id="login-row" class="row justify-content-center align-items-center">
        <div id="login-column" class="col-md-6">
          <div id="login-box" class="col-md-12">
            <form id="login-form" class="form" @submit.prevent="submitLogin">
              <h3 class="text-center text-info">Login</h3>
              <div class="form-group">
                <label for="username" class="text-info">Email:</label>
                <br>
                <input
                  v-model="email"
                  type="text"
                  name="username"
                  id="username"
                  class="form-control"
                >
              </div>
              <div class="form-group">
                <label for="password" class="text-info">Password:</label>
                <br>
                <input
                  v-model="password"
                  type="password"
                  name="password"
                  id="password"
                  class="form-control"
                >
              </div>
              <div class="form-group">
                <input type="submit" name="submit" class="btn btn-info btn-md" value="submit">
              </div>
              <div id="register-link" class="text-right">
                <router-link to="/register">Register here</router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api/hacktiv.js";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
      submitLogin(){
        //   console.log('masuk')
          api
            .post('/users/login', {
                email: this.email,
                password: this.password
            })
            .then(data => {
                localStorage.setItem('token', data.data.token)
                this.$store.dispatch('login')
                this.email=""
                this.password = ""
                this.$router.push('/')
            })
            .catch(err => {
                console.log(err)
            })
      }
  }
};
</script>

<style>
</style>
