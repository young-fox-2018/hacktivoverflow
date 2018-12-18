<template>
  <div class="container my-2 rounded">
    <h1 class="text-muted text-center">{{title}}</h1>
    <Register v-if="$route.path == '/register' && !isLogin" @formtitle="setTitle"/>
    <Login v-else-if="$route.path == '/login' && !isLogin" @formtitle="setTitle" @loginsuccess="loginSuccess"/>
    <QuestionAdd v-else-if="$route.path == '/addquestion' && isLogin" @formtitle="setTitle"/>
    <QuestionUpdate v-else-if="$route.path == `/${$route.params.questionId}/update` && isLogin"  @formtitle="setTitle"/>
    <!-- <QuestionUpdate v-else-if="$route.path == `/${route.params.questionId}/update` && isLogin" @formtitle="setTitle"/> -->
    <!-- <QuestionAdd v-else-if="$route.path == '/questionadd' && isLogin" /> -->
  </div>
</template>

<script>
import Register from '@/components/Register.vue'
import Login from '@/components/Login.vue'
import QuestionAdd from '@/components/QuestionAdd.vue'
import QuestionUpdate from '@/components/QuestionUpdate.vue'
import { mapState } from 'vuex'

export default {
  name: 'formpage',
  data() {
    return {
      title: ''
    }
  },
  components: {
    Register,
    Login,
    QuestionAdd,
    QuestionUpdate
  },
  methods: {
    setTitle(payload) {
      this.title = payload
    },
    loginSuccess() {
      this.$emit('successlogin')
    }
  },
  computed: {
    ...mapState(['isLogin'])
  }
}
</script>

<style>

</style>
