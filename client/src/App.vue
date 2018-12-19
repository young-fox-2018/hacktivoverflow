<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: { Navbar },
  created() {
    this.$store.dispatch('checkToken')
    this.$store.dispatch('getQuestions')
    this.$store.dispatch('getTags')
    this.$store.dispatch('getPopularUsers')
  }
}
</script>

