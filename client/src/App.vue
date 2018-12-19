<template>
  <div id="app">
    <mynavbar :jtoken = "jtoken" @logout="logout" @login="login"></mynavbar>
    <router-view/>
  </div>
</template>
<script>
import mynavbar from '@/components/mynavbar.vue'
export default {
  components : {
    mynavbar
  },
  data(){
    return {
      jtoken : localStorage.getItem('token') ? localStorage.getItem('token') : false,
      user_id : localStorage.getItem('user_id') ? localStorage.getItem('user_id') : false
    }
  },
  methods : {
    login : function(){
      this.jtoken = localStorage.getItem('token')
      this.user_id = localStorage.getItem('user_id')
    },
    logout : function(){
      this.jtoken = false
      this.user_id = false
    },
   
  },
}
</script>

