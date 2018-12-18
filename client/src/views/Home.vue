<template>
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div> -->
  
  <div class="container py-2 my-2 rounded">
    <div class="row">
      <SuccessAlert />
      <div class="col-2 border-right">
        <!-- <ul class="list-group sticky-top sticky-offset">
            <li>Menu item..</li>
            <li>Menu item..</li>
        </ul> -->
        <div class="list-group sticky-offset" id="list-tab" role="tablist">
          <a class="list-group-item list-group-item-action" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">Home</a>
          <a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">Profile</a>
          <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#list-messages" role="tab" aria-controls="messages">Messages</a>
          <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#list-settings" role="tab" aria-controls="settings">Settings</a>
        </div>
      </div>
      <div class="col-10">
        <div class="row my-2 mx-1">
          <div class="col text-right">
            <b-button variant="primary" @click="addQuestion" v-if="isLogin">Ask Question</b-button>
          </div>
        </div>
        <div v-if="$route.path == '/'">
          <QuestionAll v-for="(question, i) in questionList" :key="i" :question="question"/>
        </div>
        <div v-if="$route.path == '/my'">
          <QuestionAll v-for="(question, i) in myQuestionList" :key="i" :question="question"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SuccessAlert from '@/components/SuccessAlert.vue'
import QuestionAll from '@/components/QuestionAll.vue'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    SuccessAlert,
    QuestionAll
  },
  computed: {
    ...mapState(['questionList', 'myQuestionList', 'isLogin'])
  },
  methods: {
    addQuestion() {
      this.$router.push('/addquestion')
    }
  }
}
</script>

<style>
.sticky-offset {
    top: 15vh;
    position: sticky;
    /* z-index: 1020; */
}
</style>
