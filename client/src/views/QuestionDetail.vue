<template>

    <div class="container-fluid">
        <div class="panel-group" style="box-shadow: 0 15px 30px">
          <div class="panel panel-success">
            <div class="panel-heading">
                <strong>{{question.title}}</strong>
            </div>
            <div class="panel-body">
              <h3 v-html="question.question"> </h3><hr>    
              <h5> <strong>Submitted By:</strong> {{question.username}}</h5>
              <h5> <strong>Created At:</strong> {{ new Date(question.createdAt).getDate() }} - {{ new Date(question.createdAt).getMonth() }} - {{ new Date(question.createdAt).getFullYear() }}</h5> <br>
              <button v-if="notOwn(question.username) && logIn" class="btn fa fa-thumbs-up icon" v-on:click="upvote(question)"> </button>
              <button v-if="!notOwn(question.username)" class="btn" data-toggle="modal" data-target="#myModalQuestion"> <strong> Edit </strong> </button>
              <span class="label label-primary"> {{ question.votes }}</span>
              <button v-if="notOwn(question.username) && logIn" class="btn fa fa-thumbs-down icon" v-on:click="downvote(question)">  </button>
              <button v-if="!notOwn(question.username)" class="btn" v-on:click="delQuestion(question)"> <strong> Delete </strong> </button>
            </div>
          </div>
        </div>
        <hr>
        <answer-box />
        <hr>
        <answers-list />

    <div id="myModalQuestion" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              <div class="modal-header">
              </div>
              <div class="modal-body">
                  Title:
                <input style='width: 75%; margin: 0 auto;' type='text' v-model='title' placeholder='' name='title' required><br><br>
                <h4 class="modal-title">Your Question:</h4>
                <form @submit.prevent='editQuestion()'>
                    <wysiwyg v-model="myHTML" />
                    <button type='submit' class='addbtn' >Edit Answer</button>
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import axios from '@/helpers/axios'
import AnswersList from '@/components/AnswersList.vue'
import AnswerBox from '@/components/AnswerBox.vue'

export default {
  name: 'QuestionDetail',
  data(){
    return {
        question: {},
        questionId: null,
        title: "",
        myHTML: ""
    }
  },
  components:{
    AnswersList,
    AnswerBox
  },
  methods: {
    getQuestion(){
        axios.get(`/questions/${this.$route.params.id}`)
        .then(response => {
            this.title = response.data.details.title
            this.myHTML = response.data.details.question
            this.question = response.data.details
        })
        .catch(err => {
            this.$store.dispatch('errmsg', err.response.data)
        })
    },
    upvote(input) {
      this.upvoted = !this.upvoted;
      this.downvoted = false;
      
      if(this.upvoted){
        input.votes++
        this.updVote(input)
      }
      else{
        input.votes--
        this.updVote(input)
      }
      
    },
    downvote(input) {
      this.downvoted = !this.downvoted;
      this.upvoted = false;
      if(this.downvoted){
        input.votes--
        this.updVote(input)
      }
      else{
        input.votes++
        this.updVote(input)
      }
    },
    updVote(question){
      axios.patch(`/questions/vote/${question._id}`, {votes: question.votes}, {headers: { token: localStorage.token} })
      .then(response => {
        this.$store.dispatch('okmsg', {msg: "You have successfully voted"})
      })
      .catch(err => {
        this.$store.dispatch('errmsg', err.response.data) 
      })
    },
    notOwn(username){
      return localStorage.username !== username
    },
    delQuestion(question){
      axios.delete(`/questions/${question._id}`, {headers: { token: localStorage.token} })
      .then(response => {
        this.$router.push('/')
        this.$store.dispatch('okmsg', {msg: "You have successfully deleted the question"})
      })
      .catch(err => {
        this.$store.dispatch('errmsg', err.response.data) 
      })
    },
    editQuestion(){
      axios.patch(`/questions/${this.$route.params.id}`, {
          input: {
            title: this.title,
            question: this.myHTML
          } 
        },
        {
            headers: {
                token: localStorage.token
            }
        })
      .then(response => {
        $('#myModalQuestion').modal('toggle')
        this.getQuestion()
        this.$store.dispatch('okmsg', {msg: "You have successfully edited the question"})
      })
      .catch(err => {
        this.$store.dispatch('errmsg', err.response.data) 
      })
    }
  },
  created(){
    this.getQuestion()
  },
  computed: {
    logIn(){
      return this.$store.state.logIn
    }
  }
}
</script>
