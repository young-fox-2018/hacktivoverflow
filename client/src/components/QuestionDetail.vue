<template>
  <div class="container">
    <success-alert />
    <error-alert />
    <h1>{{ questionDetail.title }}</h1>
    <hr>
    <p v-html="questionDetail.content"></p>
    <div class="columns" id="userInfo">
      <div class="column is-1">
        <span class="icon" v-bind:class="{ 'has-text-info': upvoted }" @click="upvoteQuestion">
          <i class="far fa-thumbs-up fa-2x"></i> {{getQuestionUpvotes(allQuestions)}}
        </span>
      </div>
      <div class="column is-1">
        <span class="icon" v-bind:class="{ 'has-text-danger': downvoted }" @click="downvoteQuestion">
          <i class="far fa-thumbs-down fa-2x"></i> {{getQuestionDownvotes(allQuestions)}}
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
    <comment v-for="(eachAnswer, index) in allQuestions.answers" :key="index" :answerId="index" :eachAnswer="eachAnswer"/>

  </div>
</template>

<script>
import axios from '@/assets/dotapi';
import database from '@/assets/config';
import Comment from '@/components/Comment.vue';
import SuccessAlert from '@/components/SuccessAlert.vue';
import ErrorAlert from '@/components/ErrorAlert.vue';

export default {
  name: 'QuestionDetail',
  components: {
    Comment,
    SuccessAlert,
    ErrorAlert,
  },
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
    };
  },
  created() {
    this.getQuestionDetail();
  },
  methods: {
    postAnswer() {
      this.$store.dispatch('postAnswer',
        {
          questionTitle: this.questionDetail.title,
          questionId: this.questionDetail._id,
          answer: this.newAnswer,
          name: localStorage.name,
          userId: localStorage.current_user,
        });
      this.newAnswer = '';
    },
    getQuestionUpvotes(question) {
      let totalThumbsUp = 0;
      if (question && question.thumbsup) {
        totalThumbsUp = Object.values(question.thumbsup).length;
      }
      return totalThumbsUp;
    },
    getQuestionDownvotes(question) {
      let totalThumbsDown = 0;
      if (question && question.thumbsdown) {
        totalThumbsDown = Object.values(question.thumbsdown).length;
      }
      return totalThumbsDown;
    },
    getQuestionDetail() {
      axios.get(`/questions/${this.$route.params.id}`)
        .then(({ data }) => {
          this.questionDetail = data.question;
          this.questionDetail.posted_at = new Date(this.questionDetail.posted_at).toISOString().substring(0, 10);
        })
        .catch((err) => {
          this.$store.commit('setErrorMessage', 'Error getting question detail.');
          console.log(err.response);
        });
    },
    upvoteQuestion() {
      if (this.questionDetail.authorId._id !== localStorage.current_user) {
        this.$store.dispatch('upvoteQuestion', {
          questionId: this.questionDetail._id,
          userId: localStorage.current_user,
          name: localStorage.name,
        });
      } else {
        this.$store.commit('setErrorMessage', 'Cannot upvote your own question.');
      }
    },
    downvoteQuestion() {
      if (this.questionDetail.authorId._id !== localStorage.current_user) {
        this.$store.dispatch('downvoteQuestion', {
          questionId: this.questionDetail._id,
          userId: localStorage.current_user,
          name: localStorage.name,
        });
      } else {
        this.$store.commit('setErrorMessage', 'Cannot downvote your own question.');
      }
    },
  },
  computed: {
    allQuestions: {
      get() {
        let question = this.$store.state.allQuestions[this.$route.params.id];
        if (question && question.thumbsup && question.thumbsup[localStorage.current_user]) {
          this.upvoted = true;
        } else {
          this.upvoted = false;
        }
        if (question && question.thumbsdown && question.thumbsdown[localStorage.current_user]) {
          this.downvoted = true;
        } else {
          this.downvoted = false;
        }
        return question;
      },
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  text-align: left;
  padding: 1rem;
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
input {
  margin-right: .5rem;
}
</style>
