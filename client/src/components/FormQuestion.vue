<template>
  <div>
    <SuccessCard v-if="successMessage.status" :msg="successMessage.message"/>
    <div class="box">
      <div class="well"> 
        <form class="form-horizontal" role="form" @submit.prevent="addQuestion">
          <h4>What is your question?</h4>
            <div class="form-group" style="padding:14px;">
              <textarea class="form-control" placeholder="Enter your question.." v-model="question"></textarea>
              <hr>
              <button class="btn btn-primary pull-right" type="submit">Post</button>
            </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '../config.js'
import SuccessCard from '@/components/SuccessCard.vue'
import { setTimeout } from 'timers';

export default {
  components: {
    SuccessCard
  },
  data() {
    return {
      question: '',
      dataUser: '',
      successMessage: {
        status: false,
        message: 'Your question has been posted!'
      },
    }
  },
  methods: {
    addQuestion() {
      var id = firebase.ref().child('question').push().key;
      this.dataUser = this.$store.state.dataUser
      var data = {
        id: id,
        user: {
          id: this.dataUser._id,
          name: this.dataUser.name,
          email: this.dataUser.email
        },
        question: this.question,
        answer: '',
        like: '',
        dislike: ''
      }
      var updates = {};
      updates['/question/' + id] = data;
      firebase.ref().update(updates);
      this.question = ''
      this.successMessage.status = true
      setTimeout(() => {
        this.successMessage.status = false
      }, 2000)
    }
  }
}
</script>

