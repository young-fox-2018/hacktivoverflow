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
    <!-- <div class="columns" v-for="(userAnswer, index) in answers" :key="index">
      {{userAnswer.answer}}
    </div> -->
    <div class="columns comment">
      <div class="column is-2">
        username:
      </div>
      <div class="column">
        user answer
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
        userId: localStorage.current_user,
      });
      this.newAnswer = '';
    },
    getQuestionDetail() {
      axios.get('/questions/' + this.$route.params.id)
        .then(({ data }) => {
          this.questionDetail = data.question;
          this.questionDetail.posted_at = new Date(this.questionDetail.posted_at).toISOString().substring(0, 10);
        })
        .catch(err => {
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
  },
  computed: {
    getAllAnswers() {
      return Object.values(this.$store.state.answers[this.$route.params.id]);
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
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  text-align: left;
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
</style>
