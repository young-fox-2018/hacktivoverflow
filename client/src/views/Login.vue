<template>
  <div class="container my-3">
    <div class="row">
      <div class="col-12 p-0 text-center">
        <h1>
          answer
          <span style="color:#00b33c;">Questions</span>
        </h1>
        <img src="../../images/signin-image.jpg" alt style="height:40%;">
        <h5 class="font-weight-light mb-3">Please input your data</h5>
        <h6>
          Belum punya akun ?
          <a>
            <router-link to="/register">
              Daftar
              di sini
            </router-link>
          </a>
        </h6>
        <div class="row">
          <div class="col-md-4 mx-auto">
            <form v-on:submit.prevent="login">
              <div class="form-group">
                <label for="exampleInputEmail1" class="text-left">Email address</label>
                <input
                  v-model="user_login.email"
                  type="email"
                  class="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                >
              </div>

              <div class="form-group">
                <label for="exampleInputEmail1">Password</label>
                <input
                  v-model="user_login.password"
                  type="password"
                  class="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter password"
                >
              </div>

              <button type="submit" class="btn btn-primary btn-block">
                Log
                In
              </button>
              <br>
              <div
                class="g-signin2"
                data-onsuccess="onSignIn"
                id="google-signin-button"
                style="width:365px"
              ></div>
            </form>
            <br>
            <h6>
              <a>
                <hr>
                <router-link to="/">Home</router-link>
                <hr>
              </a>
            </h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      user_login: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    onSignIn(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;
      axios({
        method: "post",
        url: "http://localhost:3000/users/glogin",
        data: {
          gtoken: id_token
        }
      })
        .then(result => {
          localStorage.setItem("token", result.data.token);
          this.$store.dispatch("userLogin", result.data.data),
            this.$router.push("/");
        })
        .catch(err => {
          console.log(err);
        });
    },

    login() {
      axios({
        method: "post",
        url: "http://localhost:3000/users/login",
        data: this.user_login
      })
        .then(result => {
          console.log(result.data.data);
          localStorage.setItem("token", result.data.token);
          this.$store.dispatch("userLogin", result.data.data),
            this.$router.push("/");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    gapi.signin2.render("google-signin-button", {
      onsuccess: this.onSignIn
    });
  }
};
</script>

    

