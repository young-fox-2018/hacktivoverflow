<template>
  <div class="container">
    <div class="row">
      <router-view />
      <Sidebar />
    </div>
    <div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import QuestionList from '@/components/QuestionList.vue'
import Sidebar from '@/components/Sidebar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'home',
  components: {
    QuestionList,
    Sidebar,
    Footer
  },
  created() {
    
  },
  watch: {
    '$route.path' : function() {
      if(this.$route.path == '/') {
        this.$store.dispatch('getQuestion')
      }
    }
  }
}
</script>
