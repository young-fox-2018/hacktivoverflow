<template>
    <div class="row">
        <div v-for="answer in answers" :key="answer.details._id" style="margin: 0 auto;" class="panel panel-white post panel-shadow">
            <div class="post-heading">
                <div class="pull-left image">
                    <img src="http://bootdey.com/img/Content/user_1.jpg" class="img-circle avatar" alt="user profile image">
                </div>
                <div>
                    <div class="title h5">
                      <p class="meta" style="text-align: left;"><b>{{ answer.details.username }}</b> answered: </p>
                      <p style="display: inline;" v-html="answer.details.answer"> </p>
                    </div>
                </div>
            </div> 
            <div class="post-description"> 
              <button v-if="notOwn(answer.details.username)" class="btn fa fa-thumbs-up icon" v-on:click="upvote(answer)"> </button>
              <button v-if="!notOwn(answer.details.username)" class="btn"  v-on:click="getAnswer(answer.id)" data-toggle="modal" data-target="#myModalAnswer"> <strong> Edit </strong> </button>
              <span class="label label-primary"> {{ answer.details.votes }}</span>
              <button v-if="notOwn(answer.details.username)" class="btn fa fa-thumbs-down icon" v-on:click="downvote(answer)">  </button>
              <button v-if="!notOwn(answer.details.username)" class="btn" v-on:click="delAnswer(answer.id)"> <strong> Delete </strong> </button>
            </div>
        </div>

        <div id="myModalAnswer" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Your Answer:</h4>
              </div>
              <div class="modal-body">
                <form @submit.prevent='editAnswer'>
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
import axios from '@/helpers/axios.js'
import Firebase from '@/config/keyfile.js'
var database = Firebase.database()

export default {
  name: "AnswersList",
  data: function() {
    return {
      answers: [],
      myHTML: "",
      selectedAnswer: ""
    }
  },
  created() {
    this.allAnswers()
  },
  methods:{
    upvote(input) {
      this.upvoted = !this.upvoted;
      this.downvoted = false;
      if(this.upvoted){
        input.details.votes++
        this.updVote(input)
      }
      else{
        input.details.votes--
        this.updVote(input)
      }
    },
    downvote(input) {
      this.downvoted = !this.downvoted;
      this.upvoted = false;
        
      if(this.downvoted){
        input.details.votes--
        this.updVote(input)
      }
      else{
        input.details.votes++
        this.updVote(input)
      }
    },
    notOwn(username){
      return localStorage.username !== username
    },
    allAnswers(){
      database.ref('answers/' + this.$route.params.id).on('value', snapshot => {
        this.answers = []
        let answersIds = Object.keys ( snapshot.val() )
        answersIds.forEach(answerId => {
          database.ref(`answers/${this.$route.params.id}/${answerId}`).on('value', (snapshot) => {
            this.answers.push({details: snapshot.val(),  id: answerId})
          })
        })
      })
    },
    delAnswer(id){
      database.ref(`answers/${this.$route.params.id}/${id}`).remove()
      this.allAnswers()
      this.$store.dispatch('okmsg', {msg: "You have succesffully deleted an Answer"})
    },
    getAnswer(id){
      this.selectedAnswer = id
      database.ref(`answers/${this.$route.params.id}/${id}`).once('value', (snapshot) =>{
        this.myHTML = snapshot.val().answer
      })
    },
    editAnswer(){
      database.ref(`answers/${this.$route.params.id}/${this.selectedAnswer}`).update({
        answer: this.myHTML
      })
      $('#myModalAnswer').modal('toggle')
      this.allAnswers()
      this.$store.dispatch('okmsg', {msg: "You have succesffully edited the Answer"})
    },
    updVote(input){
      database.ref(`answers/${this.$route.params.id}/${input.id}`).update({
        votes: input.details.votes
      })
      .then(response => {
        this.$store.dispatch('okmsg', {msg: "You have successfully voted"})
      })
      .catch(err => {
        this.$store.dispatch('errmsg', err.response.data) 
      })
    },
  }
}
</script>

<style scoped>

.panel-shadow {
    box-shadow: rgba(0, 0, 0, 0.3) 7px 7px 7px;
}
.panel-white {
  border: 1px solid #dddddd;
}
.panel-white  .panel-heading {
  color: #333;
  background-color: #fff;
  border-color: #ddd;
}
.panel-white  .panel-footer {
  background-color: #fff;
  border-color: #ddd;
}

.post .post-heading {
  height: 95px;
  padding: 20px 15px;
}
.post .post-heading .avatar {
  width: 60px;
  height: 60px;
  display: block;
  margin-right: 15px;
}
.post .post-heading .meta .title {
  margin-bottom: 0;
}
.post .post-heading .meta .title a {
  color: black;
}
.post .post-heading .meta .title a:hover {
  color: #aaaaaa;
}
.post .post-heading .meta .time {
  margin-top: 8px;
  color: #999;
}
.post .post-image .image {
  width: 100%;
  height: auto;
}
.post .post-description {
  padding: 15px;
}
.post .post-description p {
  font-size: 17px;
}
.post .post-description .stats {
  margin-top: 20px;
}
.post .post-description .stats .stat-item {
  display: inline-block;
  margin-right: 15px;
}
.post .post-description .stats .stat-item .icon {
  margin-right: 8px;
}
.post .post-footer {
  border-top: 1px solid #ddd;
  padding: 15px;
}
.post .post-footer .input-group-addon a {
  color: #454545;
}
.post .post-footer .comments-list {
  padding: 0;
  margin-top: 20px;
  list-style-type: none;
}
.post .post-footer .comments-list .comment {
  display: block;
  width: 100%;
  margin: 20px 0;
}
.post .post-footer .comments-list .comment .avatar {
  width: 35px;
  height: 35px;
}
.post .post-footer .comments-list .comment .comment-heading {
  display: block;
  width: 100%;
}
.post .post-footer .comments-list .comment .comment-heading .user {
  font-size: 14px;
  font-weight: bold;
  display: inline;
  margin-top: 0;
  margin-right: 10px;
}
.post .post-footer .comments-list .comment .comment-heading .time {
  font-size: 12px;
  color: #aaa;
  margin-top: 0;
  display: inline;
}
.post .post-footer .comments-list .comment .comment-body {
  margin-left: 50px;
}
.post .post-footer .comments-list .comment > .comments-list {
  margin-left: 50px;
}
</style>
