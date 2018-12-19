<template>
  <div id="app">
    <navbar></navbar>
    <div class="row" style="margin-top: 50px; margin-right: 0px;">
      <div class="col-3">
        <sidebar></sidebar>
      </div>
      <div class="col-9">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "@/components/Navbar.vue";
import sidebar from "@/components/Sidebar.vue";
import api from '@/api/api.js'

export default {
  name: "app",
  components: {
    navbar,
    sidebar
  },
  data(){
    return{
      questions: []
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
