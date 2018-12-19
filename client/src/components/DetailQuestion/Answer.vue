<template>
  <div class="container details">
    <div v-for="answer in answers" :key="answer._id">
      <div v-if="success" class="alert alert-success" role="alert">{{successMsg}}</div>
      <div v-if="error" class="alert alert-danger" role="alert">{{errorMsg}}</div>
      <div class="row">
        <div class="col-2 vote">
          <b-card no-body style="width: 5rem;">
            <p>{{(answer.voteUp).length - (answer.voteDown).length}}</p>
            <p>Vote</p>
          </b-card>
        </div>
        <div class="col-2">
          <div class="row">
            <b-button size="sm" variant="warning" @click="vote('up',answer._id)">Up</b-button>
          </div>
          <br>
          <div class="row">
            <b-button size="sm" variant="danger" @click="vote('down',answer._id)">Down</b-button>
          </div>
        </div>
        <div class="col-8">
          <!-- <p>{{this.question._id}}</p> -->
          <p v-html="answer.content"></p>
          <p>Posted on {{answer.createdAt.slice(0,10)}} by {{answer.userId.name}}</p>
          <p>Updated on {{answer.updatedAt.slice(0,10)}}</p>
        </div>
        <div class="col-2">
          <router-link :to="`/answer/edit/${answer.questionId}/${answer._id}`">
            <b-button variant="link">Edit</b-button>
          </router-link>
        </div>
      </div>
      <hr>
    </div>
    <hr>
    <div class="form">
      <h4>Your Answer</h4>
      <div v-if="success" class="alert alert-success" role="alert">{{successMsg}}</div>
      <div v-if="error" class="alert alert-danger" role="alert">{{errorMsg}}</div>
      <b-form>  
        <wysiwyg v-model="content"/>
        <br>
        <b-button type="submit" variant="primary" @click.prevent="postAnswer">Post Your Answer</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import api from "@/api/api.js";

export default {
  name: "answerdetails",
  // props: ["answers"],
  data() {
    return {
      content: '',
      success: false,
      successMsg: "",
      error: false,
      errorMsg: "",
      answers: []
    };
  },
  created(){
    this.getAllAnswer()
  },
  methods:{
    getAllAnswer(){
      let questionId = this.$route.params.questionId
      api
      .get(`/answer/${questionId}`)
      .then( answers => {
        this.answers = answers.data.answers
      })
      .catch( error => {
        console.log(error)
      })
    },
    postAnswer(){
      let questionId = this.$route.params.questionId
      api
          .post('/answer', {content: this.content, questionId: questionId}, {
            headers: {
              authorization: localStorage.getItem('token')
            }
          })
          .then( answer => {
            this.content = ''
            this.getAllAnswer()
            this.success = true
            this.successMsg = answer.data.message
            setTimeout(() => {
              this.clearMessage()
            }, 2000);
          })
          .catch( error => {
            console.log(error.response)
            this.error = true
            this.errorMsg = error.response.data.message
            setTimeout(() => {
              this.clearMessage()
            }, 2500);
          })
    },
    vote(status,answerId){
      api
          .put(`/answer/vote/${answerId}`, {status: status}, {
            headers: {
              authorization: localStorage.getItem('token')
            }
          })
          .then( vote => {
            this.getAllAnswer()
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
    clearMessage() {
      this.success = false
      this.successMsg = ""
      this.error = false
      this.errorMsg = ""
    }
  }
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.details {
  text-align: left;
}

.vote {
  text-align: center;
}
</style>
