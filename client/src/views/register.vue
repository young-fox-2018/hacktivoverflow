<template>
  <div id="login">
    <h3 class="text-center text-white pt-5">Login form</h3>
    <div class="container">
      <div id="login-row" class="row justify-content-center align-items-center">
        <div id="login-column" class="col-md-6">
          <div id="login-box" class="col-md-12">
            <form id="login-form" class="form" @submit.prevent="submit">
              <h3 class="text-center text-info">Register</h3>
              <div class="form-group">
                <label for="username" class="text-info">Name:</label>
                <br>
                <input v-model="name" type="text" class="form-control">
              </div>
              <div class="form-group">
                <label for="username" class="text-info">Email:</label>
                <br>
                <input v-model="email" type="text" class="form-control">
              </div>
              <div class="form-group">
                <label for="password" class="text-info">Password:</label>
                <br>
                <input v-model="password" type="password" class="form-control">
              </div>
              <div class="form-group">
                <label for="password" class="text-info">Avatar:</label>
                <br>
                <input @change="uploadHandle" type="file" class="form-group">
              </div>
              <div class="form-group">
                <input type="submit" name="submit" class="btn btn-info btn-md" value="submit">
              </div>
              <div id="register-link" class="text-right">
                <router-link to="/login">Login Here</router-link>
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
import miniToastr from "mini-toastr";
export default {
  name: "register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      avatar: ""
    };
  },
  methods: {
    uploadHandle(e) {
      this.avatar = e.target.files[0];
    },
    submit() {
      let user = new FormData();
      user.append("img", this.avatar);
      user.append("name", this.name);
      user.append("password", this.password);
      user.append("email", this.email);

      api
        .post('/users/register',user)
        .then(data => {
          console.log(data);
          this.name = ''
          this.password = ''
          this.email=''
          this.avatar = ''
          miniToastr.success('register succes, please go to login page')
        })
        .catch(err => {
          miniToastr.info('something wrong, please enter another email or try again later')
          console.log(err);
        });
    }
  },
  mounted(){
    miniToastr.init()
  }
};
</script>

<style>
</style>
