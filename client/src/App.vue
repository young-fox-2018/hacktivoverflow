<template>
  <div id="app">
    <b-container fluid>
      <div class="row">
        <NavBar />
      </div>
      <Alert :message="message" :type="type" :countDownTime="countDownTime" @count-down-finish="countDownFinish" />
      <router-view/>
    </b-container>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue'
import Alert from '@/components/Alert.vue'
import { mapState} from 'vuex'
export default {
  components: {
    NavBar,
    Alert
  },
  computed: {
     ...mapState({
      message: 'message',
      type: 'type',
      countDownTime: 'countDownTime'
    })
  },
  methods: {
    countDownFinish (payload) {
    this.$store.commit('dismissCountDown', payload)
    }
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #FAFAFA !important;
  width: 100%;
  height: 100%;
}
</style>
