<template>
  <div class="columns">
    <div class="box column is-one-quarter">
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
        <div class="control">
          <router-link to="/">
            <button class="button is-text">Cancel</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "@/config";

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
          this.$emit("userLoggedIn", data);
          this.$router.push("/");
        })
        .catch(err => {
          this.notification = err.message;
        });
    }
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
