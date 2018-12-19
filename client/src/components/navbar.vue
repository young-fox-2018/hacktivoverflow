<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="navbar" style=" margin-bottom:20px ">
    <a class="navbar-brand">
      <router-link to="/">
        answer
        <span style="color:#00b33c;">Questions</span>
      </router-link>
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto" id="link-nav"></ul>
      <div v-if="userLogin">
        <div>
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style="margin-right:60px"
            >Menu</button>
            <div class="dropdown-menu dropdown-menu-right">
              <a class="dropdown-item" href="#">
                <h6>
                  Welcome
                  <span style="color:#00b33c;">{{userLogin.first_name}}</span>
                </h6>
              </a>
              <div class="dropdown-divider"></div>
              <router-link to="/">
                <a @click="user_logout" class="dropdown-item">log Out</a>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <form class="form-inline my-2 my-lg-0">
        <div v-if="!userLogin">
          <router-link to="/login">
            <a class="btn btn-sm btn-outline-secondary" style="margin-right:10px">Sign in</a>
          </router-link>
          <router-link to="/register">
            <a class="btn btn-sm btn-outline-secondary" style="margin-right:20px">Sign up</a>
          </router-link>
        </div>
      </form>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    user_logout(param) {
      localStorage.removeItem("token");
      this.$store.dispatch("userLogin", "");
      this.$router.push("/");

      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        console.log("User signed out.");
      });
    }
  },
  computed: {
    userLogin() {
      if (this.$store.state.userLogin) {
        return this.$store.state.userLogin;
      }
    }
  }
};
</script>
<style>
</style>

