<template>
  <div id="app">
    <img alt="forum logo" src="./assets/logo-forum.png">
    <div id="nav">
      <ul>
        <li class="nav-item" ><router-link to="/">Home</router-link></li>
        <li class="nav-item" v-if="!localStorageToken"><a href="#" data-toggle="modal" data-target="#registerModal">Register</a></li>
        <li class="nav-item" v-if="!localStorageToken"><a href="#" data-toggle="modal" data-target="#loginModal">Login</a></li>
        <li class="nav-item" v-if="localStorageToken"><a href="#" @click.prevent="logout">Log Out</a></li>
        <RegisterModal></RegisterModal>
        <LoginModal @resetToken="localStorageToken = $event"></LoginModal>
      </ul>
    </div>
    <div>
      <router-view :token="localStorageToken"/>
    </div>
  </div>
</template>

<script>
import RegisterModal from './components/RegisterModal.vue';
import LoginModal from './components/LoginModal.vue';

export default {
  name: 'app',
  data() {
    return {
      localStorageToken: localStorage.getItem("token"),
    }
  },
  components: {
    RegisterModal,
    LoginModal,
  },
  methods: {
    logout() {
      localStorage.clear()
      this.localStorageToken = ""
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
