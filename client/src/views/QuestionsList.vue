<template>
  <div class="container" style="height: 100vh; overflow: scroll;">
    <div class="row">
      <div class="col-lg-5">
        <div v-for="question in questions" :key="question._id" class="panel-group" style="max-width: 650px; box-shadow: 0 15px 30px">
          <div class="panel panel-success">
            <div class="panel-heading">
              <router-link :to="'/questions/' + question._id" class="btn" style="text-colour: black;">
                <strong>{{question.title}}</strong>
              </router-link>
            </div>
            <div class="panel-body">    
              <h5> <strong>Submitted By:</strong> {{question.username}}</h5>
              <h5> <strong>Created At:</strong> {{ new Date(question.createdAt).getDate() }} - {{ new Date(question.createdAt).getMonth() }} - {{ new Date(question.createdAt).getFullYear() }}</h5> <br>
              <button v-if="notOwn(question.username) && logIn" class="btn glyphicon glyphicon-menu-up" v-on:click="upvote(question)"> </button>
              <button v-if="!notOwn(question.username)" class="btn" v-on:click="editQuestion(question)"> <strong> Edit </strong> </button>
              <span class="label label-primary"> {{ question.votes }}</span>
              <button v-if="notOwn(question.username) && logIn" class="btn glyphicon glyphicon-menu-down" v-on:click="downvote(question)">  </button>
              <button v-if="!notOwn(question.username)" class="btn" v-on:click="delQuestion(question)"> <strong> Delete </strong> </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-7">
        <div v-for="n in 2" :key=n style="border: 1px solid black">
          <h3>This could be your company's ads here!!</h3>
          <img src="https://picsum.photos/350/400/?random" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/helpers/axios'

export default {
  name: 'questionsList',
  data: function(){
    return {
      questions: [],
      upvoted: false,
      downvoted:false,
      initialVote: 0,
    }
  },
  created(){
    this.allQuestions()
  },
  methods:{
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
    allQuestions(){
      axios.get('/questions')
      .then( response => {
        this.questions = response.data.details
      })
      .catch( err => {
        this.$store.dispatch('errmsg', err.response.data) 
      })
    },
    notOwn(username){
      return localStorage.username !== username
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
    delQuestion(input){
      axios.delete(`/questions/${input._id}`, {headers: {token: localStorage.token} })
      .then(response => {
        this.allQuestions()
        this.$store.dispatch('okmsg', {msg: "You have succesffully deleted a Question"})
      })
      .catch(err => {
        this.$store.dispatch('errmsg', err.response.data)
      })
    }
  },
  computed: {
    logIn(){
      return this.$store.state.logIn
    }
  }
}
</script>
