<template>
  <div class="container details">
    <!-- <div v-if="success" class="alert alert-success" role="alert">{{successMsg}}</div> -->
    <div v-if="error" class="alert alert-danger" role="alert">{{errorMsg}}</div>
    <div class="row">
      <h4>{{this.question.title}}</h4>
      <router-link :to="`/question/edit/${question._id}`">
        <b-button variant="link">Edit</b-button>
      </router-link>
      <b-button variant="link" @click.prevent="deleteQuestion">Delete</b-button>
    </div>
    <hr>
    <div class="row">
      <div class="col-2 vote">
        <b-card no-body style="width: 5rem;">
          <p> {{(this.question.voteUp).length - (this.question.voteDown).length}} </p>
          <p> Vote </p>
        </b-card>
      </div>
      <div class="col-2">
        <div class="row"> <b-button size="sm" variant="warning" @click="vote('up')">Up</b-button></div>
        <br>
        <div class="row"> <b-button size="sm" variant="danger" @click="vote('down')">Down</b-button></div>
      </div>
      <div class="col-8">
        <p v-html="question.body"></p>
        <p>Posted on {{String(this.question.updatedAt).slice(0,10)}} by {{this.question.userId.name}}</p>
        <!-- {{this.question.userId.name}} -->
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/api.js'

export default {
  name: 'questiondetails',
  props: ['question'],
  data(){
    return {
      error: false,
      errorMsg: "",
    }
  },
  methods: {
    vote(status){
      let questionId = this.$route.params.questionId
      api
          .put(`/question/vote/${questionId}`, {status: status}, {
            headers: {
              authorization: localStorage.getItem('token')
            }
          })
          .then( vote => {
            this.$emit('voted')
          })
          .catch( error => {
            console.log('======errrorr')
            console.log(error.response)
            this.error = true
            this.errorMsg = error.response.data.message
            setTimeout(() => {
              this.error = false
              this.errorMsg = ''
            }, 2500);
          })
    },
    deleteQuestion(){
      let questionId = this.$route.params.questionId

      api
          .delete(`/question/${questionId}`,{
            headers: {
              authorization: localStorage.getItem('token')
            }
          })
          .then( () => {
            this.$router.push('/question')
          })
          .catch( error => {
            console.log('======errrorr')
            console.log(error.response)
            this.error = true
            this.errorMsg = error.response.data.message
            setTimeout(() => {
              this.error = false
              this.errorMsg = ''
            }, 2500);
          })
    }
  }

}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.details{
  text-align: left;
}

.vote{
  text-align: center;
}
</style>


