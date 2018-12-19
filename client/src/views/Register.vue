<template>
  <div>
    <div class="columns">
      <div class="box column is-one-third">
        <div v-if="success" class="notification column is-success">
          <button class="delete"></button>
          Congratulation, you are successfully registered.
        </div>
        <div v-else-if="!success && notification" class="notification column is-warning">
          <button @click="notification = ''" class="delete"></button>
          {{ notification }}
        </div>
        <div class="field">
          <label class="label">Name</label>
          <div class="control has-icons-left">
            <input v-model="name" class="input" type="text" placeholder="Your fullname">
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
          </div>
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

        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input v-model="agree" type="checkbox">
              I agree to the
              <a href="#">terms and conditions</a>
            </label>
          </div>
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button ref="registerButton" @click="register" class="button is-link" disabled>Register</button>
          </div>
          <div class="control">
            <router-link to="/">
              <button class="button is-text">Cancel</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "@/config";

export default {
  name: "register",

  data() {
    return {
      name: "",
      email: "",
      password: "",
      agree: false,
      success: false,
      notification: ""
    };
  },

  computed: {
    dataComplete() {
      return this.name && this.email && this.password && this.agree;
    }
  },

  watch: {
    dataComplete() {
      if (this.dataComplete) {
        this.$refs.registerButton.removeAttribute("disabled");
      } else {
        this.$refs.registerButton.setAttribute("disabled", true);
      }
    }
  },

  methods: {
    register() {
      api
        .request({
          url: "/users/register",
          method: "POST",
          data: {
            name: this.name,
            email: this.email,
            password: this.password
          }
        })
        .then(() => {
          this.name = "";
          this.email = "";
          this.password = "";
          this.agree = false;
          this.success = true;
          this.notification = "";
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
}

.columns:last-child {
  min-height: 80vh;
}

.field:last-child {
  margin-top: 3rem;
}
</style>
