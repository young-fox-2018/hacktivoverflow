<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        <strong>Hacktiv Overflow</strong>
      </router-link>
      <a
        @click="toggleMenu"
        role="button"
        class="navbar-burger burger"
        :class="active"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="active">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">Home</router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div v-if="!user" class="buttons">
            <router-link to="/register" class="button is-primary">
              <strong>Register</strong>
            </router-link>
            <router-link to="/login" class="button is-light">Log in</router-link>
          </div>
          <div v-else class="buttons">
            <button @click="logout" class="button is-warning">Log out</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "navbar",

  data() {
    return {
      menuActive: false
    };
  },

  computed: {
    active() {
      return this.menuActive ? "is-active" : "";
    },

    ...mapState({
      user: state => state.user
    })
  },

  methods: {
    toggleMenu() {
      this.menuActive = !this.menuActive;
    },

    logout() {
      localStorage.removeItem("access-token");
      this.$store.dispatch("setUser", null);
    }
  }
};
</script>
