<template>
  <div id="app">
    <img alt="forum logo" src="./assets/logo-forum.png">
    <div id="nav">
      <ul>
        <li class="nav-item" ><router-link to="/">Home</router-link></li>
        <li class="nav-item" v-if="!$store.state.token"><a href="#" data-toggle="modal" data-target="#registerModal">Register</a></li>
        <li class="nav-item" v-if="!$store.state.token"><a href="#" data-toggle="modal" data-target="#loginModal">Login</a></li>
        <li class="nav-item" v-if="!$store.state.token"><fb:login-button scope="public_profile,email" onlogin="checkLoginState"></fb:login-button></li>
        <li class="nav-item" v-if="$store.state.token"><a href="#" @click.prevent="logout">Log Out</a></li>
        <RegisterModal></RegisterModal>
        <LoginModal></LoginModal>
      </ul>
    </div>
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import axios from '@/apis/axios'
import RegisterModal from './components/RegisterModal.vue';
import LoginModal from './components/LoginModal.vue';

export default {
  name: 'app',
  data() {
    return {
      localToken: localStorage.getItem('token')
    }
  },
  components: {
    RegisterModal,
    LoginModal,
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$store.state.token = ""
    },
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#nav {
  padding: 10px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
