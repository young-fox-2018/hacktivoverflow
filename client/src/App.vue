<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "parent",
  methods: {
    isLogin() {
      let V_TOKEN = localStorage.getItem("token");
      if (V_TOKEN) {
        axios({
          method: "get",
          url: "http://localhost:3000/users",
          headers: {
            token: V_TOKEN
          }
        })
          .then(result => {
            this.$store.dispatch("userLogin", result.data.user);
          })
          .catch(err => {});
      } else {
        this.$router.push("/");
      }
    },
    getQuestions() {
      this.$store.dispatch("getQuestions");
    }
  },
  created() {
    this.isLogin();
    this.getQuestions();
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
