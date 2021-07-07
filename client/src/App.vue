<template>
  <v-app>
    <v-layout column>
      <navigation />
        <router-view />
    </v-layout>
  </v-app>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import Banner from '@/components/Banner.vue';
import database from '@/assets/config.js';

export default {
  components: {
    Navigation,
    Banner,
  },
  data() {
    return {
      answers: {},
      tesFireStore: [],
    };
  },
  created() {
    this.getAll();
    this.checkUserLoggedIn();
  },
  methods: {
    checkUserLoggedIn() {
      if(localStorage.token) {
        this.$store.commit('setUserLoggedIn', true);
      }
    },
    getAll() {
      this.$store.dispatch('getAllData');
    },
  },
};
</script>


<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  justify-content: center;
}
.column {
  padding: 0;
}
/* nav { */
  /* padding: 30px; */
  /* font-size: 1rem;
  width: 100%;
  border: 1px solid black;
}

.field.has-addons {
  align-items: center;
  margin: 0;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
