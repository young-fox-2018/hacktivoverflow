<template>
  <div id="app">
    <navbar> </navbar>
    <section class="content">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
export default {
  computed:{
    ...mapState([
      'isLogin','userId','email'
    ])
  },
  methods:{
    ...mapActions([
      'signOut','checkToken','getQuestions'
    ]),
  },
  mounted() {
    this.checkToken()
    this.getQuestions()
  },
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #363838;
}
.content {
  margin-top: 80px;
  background-color: #ecf0f1;
}
</style>
