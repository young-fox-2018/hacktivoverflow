<template>
  <div id="app">
    <navbar class="has-background-light" style="margin-bottom: 1rem"></navbar>
    <div class="container">
      <div class="columns">
        <div class="column is-9">
          <router-view @userLoggedIn="getUser"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "@/config";
import navbar from "@/components/navbar";

export default {
  components: {
    navbar
  },

  methods: {
    getUser() {
      api
        .request({
          url: "/users",
          method: "GET",
          headers: {
            "access-token": localStorage.getItem("access-token")
          }
        })
        .then(({ data }) => {
          this.$store.dispatch('setUser', data)
        })
        .catch(err => {
          console.error(err.message);
        });
    },
  },

  created() {
    if (localStorage.getItem("access-token")) {
      this.getUser();
    }
  }
};
</script>


<style scoped>
.columns {
  justify-content: center
}
</style>
