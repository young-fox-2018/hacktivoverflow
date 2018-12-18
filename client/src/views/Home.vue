<template>
  <div class="home">
    <Banner v-on:loggedin="changeStatus"/>
    <QuestionList/>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import Banner from '@/components/Homepage/Banner.vue'
import QuestionList from '@/components/Homepage/QuestionList.vue'

export default {
  name: 'home',
  components: {
    Banner,
    QuestionList
  },
  methods: {
    changeStatus: function() {
      this.$emit('loggedin')
    }
  },
  mounted: function() {
    this.$store.dispatch("resetError")
  }
}
</script>
