<template>
  <div>
    <SideBar/>
    <router-view/>
  </div>
</template>

<script>
import SideBar from '@/components/Questions/SideBar.vue'
import NavBar from '@/components/NavBar.vue'


export default {
  name: "questions",
  components: {
    SideBar,
    NavBar,
  },
  data() {
    return {
      articleDetail: "",

    };
  },
  methods: {
    // sendQuestionId: function(question) {
    //   // this.$store.dispatch('viewedQuestion_Action', question)
    // },
  },
  mounted: function() {
    this.$store.dispatch("resetError")
  }
};
</script>

<style scoped>


</style>