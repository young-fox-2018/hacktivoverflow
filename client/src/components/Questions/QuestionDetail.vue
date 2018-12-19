<template>
  <div v-if="!loading" class="pageContent">
    <!-- {{questionDetail}} -->
    <div class="title row" style="margin-right: 0px">
      <div class="col-1">
        <!-- Question Votes Section -->
        <div v-if="questionUpVote >= questionDownVote">
          <font-awesome-icon icon="smile" style="font-size:40px; color:green"/>
          {{questionUpVote - questionDownVote}}
        </div>
        <div v-else>
          <font-awesome-icon icon="sad-tear" style="font-size:40px;color:maroon"/>
          -{{questionDownVote - questionUpVote}}
        </div>
      </div>
      <div class="col-11">
        <h1>{{questionDetail.title}}</h1>
        <p class="subtitle">
          <span v-if="topUser" title="This user is in the Top 5"><font-awesome-icon icon="star" style="color:yellow"/></span>
          <font-awesome-icon v-else icon="user"/> {{questionDetail.op.name}}
          &nbsp;
          <font-awesome-icon icon="calendar-alt"/> {{questionDetail.createdDate}}
        </p>
      </div>
      <div class="col-1"> 
        <!--Intentionally blank-->
      </div>

      <div class="col-11">
        <vue-tags-input
          :tags="questionDetail.tags"
          v-model="tag"
          :allow-edit-tags="false"
          disabled
          placeholder= ''
          style="opacity: .9"
        />
      </div>

    </div>
    <div class="separator"></div>
    <div class="question" v-html="questionDetail.description">
    </div>
    <div class="votes">
      <font-awesome-icon icon="thumbs-up" class="pointer" style="color:green" @click="VoteQ('1')"/>
      {{questionUpVote}}
      &nbsp;
      <font-awesome-icon icon="thumbs-down" class="pointer" style="color:maroon" @click="VoteQ('-1')"/>
      {{questionDownVote}}
    </div>
    <div class="separator"></div>
    <h3>Answers</h3>
    <div class="addAnswer">
      <h4>Have Something to Share?</h4>
      <form>
        <div class="form-group">
          <label for="question_title">Answer Title</label>
          <input type="text" class="form-control" v-model="addA_title" placeholder="Enlighten Us, Teacher">
        </div>
        <div class="form-group">
          <label for="question_description">Answer Description</label>
          <wysiwyg v-model="addA_description" style="background-color:white"/>
        </div>

        <button v-if="token" type="submit" class="btn" style="background-color:#6610f2; color: white" @click.prevent="addAnswer()">Submit</button>
        <div v-else>
          <button disabled class="btn" style="background-color:#6610f2; color: white">Submit</button>
          <p>Only registered user may submit an Answer!</p>
        </div>
      </form>
    </div>

    <div class="separator"></div>

    <div class="title row answer" v-for="(answer,index) in questionDetail.answers" :key="index">
      <div class="col-1">
        <!-- Answer Vote Section -->
        <div v-if="countVote(answer.votes, 'answer', 1) >= countVote(answer.votes, 'answer', -1)">
          <font-awesome-icon icon="smile" style="font-size:40px; color:green"/>
          {{countVote(answer.votes, 'answer', 1) - countVote(answer.votes, 'answer', -1)}}
        </div>
        <div v-else>
          <font-awesome-icon icon="sad-tear" style="font-size:40px;color:maroon"/>
          -{{countVote(answer.votes, 'answer', -1) - countVote(answer.votes, 'answer', 1)}}
        </div>
      </div>
      <div class="col-11">
        <h3>{{answer.title}}</h3>
        <p class="subtitle">
          <font-awesome-icon icon="user"/> {{answer.poster.name}}
          &nbsp;
          <font-awesome-icon icon="calendar-alt"/> {{answer.createdDate}}</p>
      </div>
      
      <div class="separator col-12"></div>

      <div v-html="answer.description" class="col-12"></div>
      <div class="votes">
        <font-awesome-icon icon="thumbs-up" class="pointer" style="color:green" @click="VoteA(answer._id, '1')"/>
        {{countVote(answer.votes, 'answer', 1)}}
        &nbsp;
        <font-awesome-icon icon="thumbs-down" class="pointer" style="color:maroon" @click="VoteA(answer._id, '-1')"/>
        {{countVote(answer.votes, 'answer', -1)}}
      </div>
    </div>
  </div>
  <div v-else>
    <img src="../../assets/loading.gif" alt="loading">
  </div>
</template>

<script>
import axios from 'axios';
import {mapState} from 'vuex'
import VueTagsInput from '@johmun/vue-tags-input';
import Swal from 'sweetalert2'

export default {
  name: "question-detail",
  components: {
    VueTagsInput
  },
  data() {
    return {
      token: localStorage.getItem('token'),
      addA_title: "",
      addA_description:"",
      error_status: false,
      error_msg: "",
      loading: true,
      questionDetail: {},
      questionUpVote: 0,
      questionDownVote: 0,
      tag: "",
      topUser : false
    }
  },
  computed: mapState({
    top5Users: state => state.top5Users,

  }),
  methods: {
    countVote(data, type, sign) {
      // filter semua data nya yang sign === sign (-1, 1)
      let filter = []
      if(type === 'question') {
        filter = questionDetail.votes.filter((datum) => datum.vote == sign)
      } else if(type === 'answer') {
        filter = data.filter((datum) => datum.vote == sign)
      }
      return filter.length
    },
    VoteQ: function(vote) {
      let token = localStorage.getItem("token");
      if(token) {
        let data = {
          questionId: this.questionDetail._id,
          vote: vote,
          token: token,
        }
        axios({
          method: "post",
          url: `https://xavier-ho-server.thenile.online/ho/questions/vote`,
          headers: { token: data.token },
          data: {
            questionId: data.questionId,
            vote: data.vote
          },
        })    
        .then(response => {
          Swal({
            title: response.data.message,
            type: 'success',
            position:'top-end',
            toast: true,
            timer: 3000,
          })
          this.getQuestionDetail()
        })   
        .catch(err => {
          console.log(err.response)
          Swal({
            title: err.response.data.message ,
            type: 'warning',
            position:'top-end',
            toast: true,
            timer: 3000,
          })
        }) 
      } else {
        Swal({
          title: 'Only Registered user can vote' ,
          type: 'warning',
          position:'top-end',
          toast: true,
          timer: 3000,
        })
      }
    },

    VoteA: function(id, vote) {
      let token = localStorage.getItem("token");
      if(token) {
        let data = {
          questionId: this.questionDetail._id,
          answerId: id,
          vote: vote,
          token: token,
        }
        axios({
          method: "post",
          url: `https://xavier-ho-server.thenile.online/ho/answers/vote`,
          headers: { token: data.token },
          data: {
            answerId: data.answerId,
            vote: data.vote
          },
        })
        .then(response => {
          Swal({
            title: response.data.message,
            type: 'success',
            position:'top-end',
            toast: true,
            timer: 3000,
          })
          this.getQuestionDetail()
        })   
        .catch(err => {
          console.log(err.response)
          Swal({
            title: err.response.data.message ,
            type: 'warning',
            position:'top-end',
            toast: true,
            timer: 3000,
          })
        })
      } else {
        Swal({
          title: 'Only Registered user can vote' ,
          type: 'warning',
          position:'top-end',
          toast: true,
          timer: 3000,
        })
      }
    },
    addAnswer: function() {
      let data = {
          title: this.addA_title,
          description: this.addA_description,
          questionId: this.questionDetail._id
        }
      let token = localStorage.getItem("token");
      axios({
        method: "post",
        url: "https://xavier-ho-server.thenile.online/ho/answers/add",
        headers: { token: token },
        data: data
      })
      .then((response) => {
        Swal({
          title: response.data.message,
          type: 'success',
          position:'top-end',
          toast: true,
          timer: 3000,
        })
        this.getQuestionDetail()
        this.addA_title = "",
        this.addA_description = "" 
      })
      .catch(err => {
        console.log(err.response);
        let timerInterval
        Swal({
          title: err.response.data.message,
          html: 'Auto close in <b></b> seconds.',
          type: 'error',
          confirmButtonText: 'Ok',
          backdrop: false,
          allowOutsideClick: false,
          timer: 3000,
          onBeforeOpen: () => {
            timerInterval = setInterval(() => {
              Swal.getContent().querySelector('b')
                  .textContent = (Swal.getTimerLeft()/1000)
                    .toFixed(0)
              }, 100)
          },
          onClose: () => {
              clearInterval(timerInterval)
          }
          }).then((result) => {
          if (
              // Read more about handling dismissals
              result.dismiss === Swal.DismissReason.timer
          ) {
              console.log('I was closed by the timer')
          }
        })
      });
    },
    getQuestionVotes() {
      this.questionUpVote = 0
      this.questionDownVote = 0
      this.questionDetail.votes.forEach(vote => {
        if (vote.vote == 1) {
          this.questionUpVote += 1
        } else if (vote.vote == -1) {
          this.questionDownVote += 1
        }
      });
    },
    getQuestionDetail() {
      // this.loading = true
      axios({
        method: "GET",
        url: "https://xavier-ho-server.thenile.online/ho/questions"
      })
      .then(response => {
        let allQuestion = response.data.data
        let creatorId =""
        allQuestion.forEach(question => {
          if(question.slug === this.$route.params.slug) {
            this.questionDetail = question
            creatorId = question.op._id
            this.loading = false
          }
        });
        // window.history.pushState(null, "", `${this.questionDetail.title}`);
        this.getQuestionVotes()
        this.$store.dispatch("updatePopularUser")      
        this.loading = false
      })
      .catch(err => {
        console.log(err);
        this.loading = false
      });
    }
  },
  created: function() {
    this.$store.dispatch("updatePopularUser")      
  },
  mounted: function() {
    this.loading = true
    this.getQuestionDetail()
  },
  watch: {
    $route() {
      this.topUser = false
      this.loading = true
      this.getQuestionDetail()
    },
    top5Users() {
      this.top5Users.forEach(user => {
        if(user._id == this.questionDetail.op._id) {
          this.topUser = true
        }
      })
    }
  }
};
</script>

<style scoped>
.title, .question {
  text-align: left;
  margin-left: 20px;
  margin-bottom: 20px
}
.separator {
  border: 1px solid lightgray;
  margin: 10px
}
.pageContent {
  margin-left: 180px
}
.votes {
  text-align: left;
  margin-left: 20px
}
.answer {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid lightseagreen;
}

.pointer {
  cursor: pointer;
}

</style>
