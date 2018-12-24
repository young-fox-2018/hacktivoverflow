<template>
  <div class="container ">
    <nav class="navbar is-widescreen" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link :to="'/'" class="navbar-item">
          <img src="https://cdn5.vectorstock.com/i/1000x1000/97/09/dots-logo-points-star-logo-template-dotted-vector-16869709.jpg" width="40" height="28"> HacktivOverflowing

        </router-link>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="field has-addons">
          <div class="control is-expanded">
            <input class="input" type="text" placeholder="Search...">
          </div>
          <div class="control">
            <a class="button is-info"> Search </a>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable" v-if="isLoggedIn">
            <a class="navbar-link is-arrowless">
              <i class="fas fa-user fa-lg"></i>
            </a>
            <div class="navbar-dropdown">
              <router-link to="/profile" class="navbar-item">Profile</router-link>
              <a class="navbar-item" @click="userLogout">
                Log Out
              </a>
            </div>
          </div>
          <div class="navbar-item" v-if="isLoggedIn">
            <div class="buttons">
              <router-link to="/new-question" class="button is-info">Add New Question</router-link>
            </div>
          </div>
          <div class="navbar-item" v-if="!isLoggedIn">
            <div class="buttons">
              <login-form/>
              <register-form/>
            </div>
          </div>
        </div>
      </div>
    </nav>

  </div>

</template>

<script>
import axios from '@/assets/dotapi';
import store from "../store.js";
import LoginForm from '@/components/LoginForm.vue';
import RegisterForm from '@/components/RegisterForm.vue';
import { mapState } from 'vuex';

export default {
  name: 'Navigation',
  components: {
    LoginForm,
    RegisterForm,
  },
  computed: {
    ...mapState(['isLoggedIn']),
  },
  methods: {
    userLogout() {
      this.$store.commit('setUserLoggedIn', false);
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>
.field.has-addons {
  align-items: center;
  margin: 0;
  width: 50vw;
}
.field.has-addons .control.is-expanded {
  flex-grow: .5;
}
.container {
  margin-bottom: 2rem;
  padding: 0;
}
.notification {
  padding: .5rem;
}
.navbar-link.is-arrowless img {
  border-radius: 50%;
}
.navbar-brand, .navbar-end {
  border: 0;
  margin-right: .5rem;
}

</style>
