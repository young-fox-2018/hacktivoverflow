<template>
  <div id="app">
    <navigation />
    <!-- <banner /> -->
    <router-view/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import Banner from '@/components/Banner.vue';

export default {
  components: {
    Navigation,
    Banner,
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
