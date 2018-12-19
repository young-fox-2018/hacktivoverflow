<template>
  <!--Main Navigation-->
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark unique-color text">
      <div class="container">
        <a class="navbar-brand" href="#">
          <img style="max-height: 40px" src="@/assets/logo.png" alt>
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
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link to="/">
                <a class="nav-link" href="#">
                  Home
                  <span class="sr-only">(current)</span>
                  <i class="fa fa-home" aria-hidden="true"></i>
                </a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/myquestions">
                <a class="nav-link" href="#">
                  My Questions
                  <i class="fa fa-question" aria-hidden="true"></i>
                </a>
              </router-link>
            </li>
          </ul>

          <form @submit.prevent="submitSearch" class="form-inline">
            <div class="md-form my-0">
              <input
                v-model="searchQuest"
                class="form-control mr-sm-2"
                type="text"
                placeholder="Search Question"
                aria-label="Search"
              >
            </div>
          </form>

          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/login">
                <a v-if="isLogin == false" class="nav-link">Login</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/register">
                <a v-if="isLogin == false" class="nav-link">Register</a>
              </router-link>
            </li>
            <li v-if="isLogin" @click="logout" class="nav-item">
              <a class="nav-link">Logout</a>
            </li>
          </ul>
        </div>
      </div>
      <div style="display: none" id="g-signin">

      </div>
    </nav>
  </header>

  <!--Main Navigation-->
</template>

<script>
import { mapState } from "vuex";
import miniToastr from "mini-toastr";
export default {
  name: "navbar",
  data() {
    return {
      searchQuest: ""
    };
  },
  computed: {
    ...mapState(["isLogin"])
  },
  methods: {
    submitSearch() {
      if (this.searchQuest) {
        this.$store.dispatch(
          "searchQuestion",
          `/questions?title=${this.searchQuest}`
        );
      } else {
        this.$store.dispatch("searchQuestion", `/questions`);
      }
    },
    logout() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        console.log("User signed out.");
        miniToastr.info("logedout");
        localStorage.removeItem("token");
        this.$store.dispatch("logout");
        this.$router.push("/");
      });
    }
  },
  mounted() {
    gapi.signin2.render("g-signin", {});
  }
};
</script>

<style scoped>
</style>
