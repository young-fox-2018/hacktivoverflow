<template>
  <div class="container">
    <div class="row"> 
      <div class="col-md-8">
          <router-view></router-view>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-header" style="background-color: #34db8a;">
            Top Users
          </div>
          <ul>
            under maintenanced
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import {mapState, mapActions} from 'vuex'

export default {
  name: 'home',
  methods:{
    ...mapActions(['getQuestions']),
  },
  computed:{
    isLogin (){
        return this.$store.state.isLogin
    },
    ...mapState(['userId','email'])
  },
  created() {
    this.getQuestions()
  },
  components: {
  }
}
</script>



