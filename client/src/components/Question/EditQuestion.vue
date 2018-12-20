<template>
  <div class="container form">
    <b-button type="submit" variant="link" to="/question">See All Question</b-button>
    <hr>
    <b-form>
      <!-- <div v-if="success" class="alert alert-success" role="alert">{{successMsg}}</div> -->
      <div v-if="error" class="alert alert-danger" role="alert">{{errorMsg}}</div>
      <b-form-group label="Title" label-for="titlequestion">
        <b-form-input
          id="titlequestion"
          type="text"
          placeholder="Whats your programming question? be specific"
          required
          v-model="question.title">
        </b-form-input>
      </b-form-group>
      <b-form-group label="Body" label-for="bodyquestion">
        <wysiwyg v-model="question.body"/>
      </b-form-group>
      <b-form-group label="Tags" label-for="tagquestion">
        <b-form-input
          id="tagquestion"
          type="text"
          placeholder="e.g.(vue-cli, javascript)"
          v-model="question.tags"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" @click.prevent="editQuestion">Edit Question</b-button>
    </b-form>
  </div>
</template>

<script>
import api from "@/api/api.js";

export default {
  name: 'editquestion',
  data(){
    return{
      question: {
        title: '',
        body: ''
      },
      // success: false,
      // successMsg: "",
      error: false,
      errorMsg: "",
    }
  },
  created(){
    this.getDataQuestion()
  },
  methods: {
    getDataQuestion(){
      let questionId = this.$route.params.questionId
      api
          .get(`/question/${questionId}`)
          .then( question => {
            this.question = question.data.question
          })
          .catch( error => {
            console.log(error)
          })
    },
    editQuestion(){
      let questionId = this.$route.params.questionId

      api
          .put(`/question/${questionId}`, this.question, {
            headers: {
              authorization: localStorage.getItem('token')
            }
          })
          .then( question => {
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
.form {
  text-align: left;
}
</style>

