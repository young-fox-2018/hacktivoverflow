<template>
  <div>
    <SideBar v-on:sendQuestionId="sendQuestionId"/>
    <router-view v-on:sendQuestionId="sendQuestionId"/>
  </div>
</template>

<script>
import SideBar from '@/components/Questions/SideBar.vue'
import NavBar from '@/components/NavBar.vue'
import Error from '@/components/Error.vue';


export default {
  name: "questions",
  components: {
    SideBar,
    NavBar,
    Error,
  },
  data() {
    return {
      error_status: false,
      error_msg: "",
      articleDetail: "",

    };
  },
  methods: {
    sendQuestionId: function(question) {
      // this.$store.dispatch('viewedQuestion_Action', question)
    },
  },
  mounted: function() {
    this.$store.dispatch("resetError")
  }
};
</script>

<style scoped>


</style>