<template>
  <div class="container">
    <h1>{{ questionDetail.title }}</h1>
    <hr>
    <p v-html="questionDetail.content"></p>
    <div class="columns" id="userInfo">
      <div class="column is-1">
        <span class="icon" v-bind:class="{ 'has-text-info': upvoted }" @click="upvoteQuestion">
          <i class="far fa-thumbs-up fa-2x"></i> {{getQuestionUpvotes}}
        </span>
      </div>
      <div class="column is-1">
        <span class="icon" v-bind:class="{ 'has-text-danger': downvoted }" @click="downvoteQuestion">
          <i class="far fa-thumbs-down fa-2x"></i> {{getQuestionDownvotes}}
        </span>
      </div>
      <div class="column is-6"></div>
      <div class="column">
        <p>Posted at: {{ questionDetail.posted_at }}</p>
        <p>By: {{questionDetail.authorId.name}}</p>
      </div>
    </div>
    <div class="columns comment">
      Answers:
    </div>
    <div class="columns comment">
      <input v-model="newAnswer" class="input" type="text" placeholder="Answer here...">
      <a class="button is-info" @click="postAnswer">Post Answer</a>
    </div>
    <div class="columns comment" v-for="(eachAnswer, index) in getAllAnswers" :key="index">
      <div class="column is-2" id="fullname">
        {{eachAnswer.name}}:
      </div>
      <div class="column bubble me" id="answerContent">
        <div class="columns">
          <div class="column is-9">
            {{eachAnswer.answer}}
          </div>
          <div class="column">
            <span class="icon" v-bind:class="{ 'has-text-info': answerUpvoted }" @click="upvoteAnswer(eachAnswer, index)">
              <i class="far fa-thumbs-up"></i>{{ getAnswerUpvotes(getAnswerUpvotesFromStore, index) }}
            </span>
          </div>
          <div class="column">
            <span class="icon" v-bind:class="{ 'has-text-danger': answerDownvoted }" @click="downvoteAnswer(eachAnswer, index)">
              <i class="far fa-thumbs-down"></i>{{ getAnswerDownvotes(getAnswerDownvotesFromStore, index) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/assets/dotapi';
import database from '@/assets/config.js';

export default {
  name: 'QuestionDetail',
  data() {
    return {
      questionDetail: {
        authorId: {},
      },
      newAnswer: '',
      upvoted: false,
      downvoted: false,
      answerUpvoted: false,
      answerDownvoted: false,
      answerUpvotedTotal: 0,
      answerDownvotedTotal: 0,
    };
  },
  created() {
    this.getQuestionDetail();
  },
  methods: {
    postAnswer() {
      this.$store.dispatch('postAnswer',
        {
          questionId: this.questionDetail._id,
          answer: this.newAnswer,
          name: localStorage.name,
          userId: localStorage.current_user,
        });
      this.newAnswer = '';
    },
    getQuestionDetail() {
      axios.get(`/questions/${this.$route.params.id}`)
        .then(({ data }) => {
          this.questionDetail = data.question;
          this.questionDetail.posted_at = new Date(this.questionDetail.posted_at).toISOString().substring(0, 10);
        })
        .catch((err) => {
          console.log('error getting question detail');
          console.log(err.response);
        });
    },
    upvoteQuestion() {
      if(this.questionDetail.authorId._id !== localStorage.current_user) {
        this.$store.dispatch('upvoteQuestion', {
          questionId: this.questionDetail._id,
          userId: localStorage.current_user,
          name: localStorage.name,
        });
      }
    },
    downvoteQuestion() {
      if(this.questionDetail.authorId._id !== localStorage.current_user) {
        this.$store.dispatch('downvoteQuestion', {
          questionId: this.questionDetail._id,
          userId: localStorage.current_user,
          name: localStorage.name,
        });
      }
    },
    upvoteAnswer(answer, index) {
      if(answer.userId !== localStorage.current_user) {
        this.$store.dispatch('upvoteAnswer', {
          answerId: index,
          userId: localStorage.current_user,
          name: localStorage.name,
        });
      } else {
        console.log('Cannot upvote your own answer.');
      }
    },
    downvoteAnswer(answer, index) {
      if(answer.userId !== localStorage.current_user) {
        this.$store.dispatch('downvoteAnswer', {
          answerId: index,
          userId: localStorage.current_user,
          name: localStorage.name,
        });
      } else {
        console.log('Cannot downvote your own answer.');
      }
    },
    getAnswerUpvotes(allUpvotes, index) {
      let totalUpvoter = 0;
      for (let key in allUpvotes[index]) {
        totalUpvoter++;
      }
      return totalUpvoter;
    },
    getAnswerDownvotes(allDownvotes, index) {
      let totalDownvoter = 0;
      for (let key in allDownvotes[index]) {
        totalDownvoter++;
      }
      return totalDownvoter;
    }
  },
  computed: {
    getAllAnswers() {
      return this.$store.state.answers[this.$route.params.id] || {};
    },
    getQuestionUpvotes() {
      const thisRoute = this.$store.state.questionUpvotes[this.$route.params.id];
      if (thisRoute) {
        if (thisRoute[localStorage.current_user]) {
          this.upvoted = true;
        }
      } else {
        this.upvoted = false;
      }
      return Object.values(thisRoute || {}).length;
    },
    getQuestionDownvotes() {
      const thisRoute = this.$store.state.questionDownvotes[this.$route.params.id];
      if (thisRoute) {
        if (thisRoute[localStorage.current_user]) {
          this.downvoted = true;
        }
      } else {
        this.downvoted = false;
      }
      return Object.values(thisRoute || {}).length;
    },
    getAnswerUpvotesFromStore() {
      return this.$store.state.answerUpvotes;
    },
    getAnswerDownvotesFromStore() {
      return this.$store.state.answerDownvotes;
    }
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  text-align: left;
  padding: 0;
}
h1 {
  font-size: 1.2rem;
  font-weight: bold;
}
hr {
  margin-top: 1rem;
  border: 1px solid rgb(228, 228, 228)
}
#userInfo {
  margin: 3rem 0 1rem 0;
  border-bottom: 1px solid rgb(228, 228, 228);
  align-items: center;
}
.column {
  align-items: center;
  align-content: center;
}
.comment {
  margin: .5rem;
}
input {
  margin-right: .5rem;
}
#fullname, #answerContent {
  /* border: 1px solid rgb(228, 228, 228); */
  border-radius: 5px;
  align-self: center;
  /* margin: 20px; */
}

.bubble{
    background-color: #F2F2F2;
    border-radius: 5px;
    box-shadow: 0 0 6px #B2B2B2;
    display: inline-block;
    padding: 10px 18px;
    position: relative;
    vertical-align: top;
}

.bubble::before {
    background-color: #F2F2F2;
    content: "\00a0";
    display: block;
    height: 16px;
    position: absolute;
    top: 11px;
    transform:             rotate( 29deg ) skew( -35deg );
        -moz-transform:    rotate( 29deg ) skew( -35deg );
        -ms-transform:     rotate( 29deg ) skew( -35deg );
        -o-transform:      rotate( 29deg ) skew( -35deg );
        -webkit-transform: rotate( 29deg ) skew( -35deg );
    width:  20px;
}

.me {
    float: left;
    margin: 5px 45px 5px 20px;
}

.me::before {
    box-shadow: -2px 2px 2px 0 rgba( 178, 178, 178, .4 );
    left: -9px;
}
</style>
