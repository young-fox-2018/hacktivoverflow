<template>
  <div class="columns">
    <div class="box column is-one-third">
      <div v-if="!success && notification" class="notification column is-warning">
        <button @click="notification = ''" class="delete"></button>
        {{ notification }}
      </div>

      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left">
          <input v-model="email" class="input" type="email" placeholder="Email address">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control has-icons-left">
          <input v-model="password" class="input" type="password" placeholder="Password">
          <span class="icon is-small is-left">
            <i class="fas fa-key"></i>
          </span>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button @click="login" class="button is-link">Login</button>
        </div>
        <!-- <div class="control">
          <router-link to="/">
            <button class="button is-text">Cancel</button>
          </router-link>
        </div>-->
        <div class="control">
          <div id="g-signin2" class="g-signin2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "@/config";

const gapi = window.gapi;

export default {
  name: "login",

  data() {
    return {
      email: "",
      password: "",
      success: false,
      notification: ""
    };
  },

  methods: {
    login() {
      api
        .request({
          url: "/users/login",
          method: "POST",
          data: {
            email: this.email,
            password: this.password
          }
        })
        .then(({ data }) => {
          this.notification = "";
          localStorage.setItem("access-token", data["access-token"]);
          localStorage.setItem("idProvider", "client");
          this.$emit("userLoggedIn", data);
          this.$router.push("/");
        })
        .catch(err => {
          this.notification = err.message;
        });
    },

    gSignIn(googleUser) {
      api
        .request({
          url: "/users/gsignin",
          method: "POST",
          data: {
            id_token: googleUser.getAuthResponse().id_token
          }
        })
        .then(({ data }) => {
          localStorage.setItem("access-token", data["access-token"]);
          localStorage.setItem("idProvider", "google");
          this.$emit("userLoggedIn", data);
          this.$router.push("/")
        })
        .catch(err => {
          console.error(err.message);
        });
    },
  },

  mounted() {
    gapi.signin2.render("g-signin2", {
      scope: "profile email",
      onsuccess: this.gSignIn,
      onfailure: (err) => alert(err.message)
    });
  }
};
</script>


<style scoped>
.columns {
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  min-height: 80vh;
}

.field:last-child {
  margin-top: 3rem;
}
</style>
