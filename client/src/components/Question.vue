<template>
  <div class="container" >
    <div id="outerBox" class="columns" v-for="question in questions" :key="question._id">
      <div class="column is-4">
        <div class="columns detailQuestion">
          <div class="column">{{ countTotalVotes(allQuestions[question._id])}} Votes</div>
          <div class="column">{{ countAnswers(allQuestions[question._id])}} Answers</div>
        </div>
      </div>
      <router-link :to="'/question/' + question._id" class="column"> {{question.title}} </router-link>
    </div>
  </div>
</template>

<script>
import axios from '@/assets/dotapi';
import { mapState } from 'vuex';

export default {
  name: 'Question',
  data() {
    return {
      questions: [],
    };
  },
  created() {
    this.getAllQuestions();
  },
  methods: {
    getAllQuestions() {
      axios
        .get('/questions')
        .then(({ data }) => {
          this.questions = data.questions;
        })
        .catch((err) => {
          console.log('error getting all questions');
          console.log(err.response);
        });
    },
    countTotalVotes(question) {
      var thumbsup = 0;
      var thumbsdown = 0;
      // console.log(question)
      if(question && question.thumbsup) {
        thumbsup = Object.values(question.thumbsup).length;
      }
      if(question && question.thumbsdown) {
        thumbsdown = Object.values(question.thumbsdown).length;
      }

      return thumbsup - thumbsdown;
      // let upvotes = 0;
      // for (let key in this.getAllQuestionUpvotes[questionId]) {
      //   upvotes++;
      // }
      // let downvotes = 0;
      // for (let key in this.getAllQuestionDownvotes[questionId]) {
      //   downvotes++;
      // }
      // return upvotes - downvotes;
    },
    countAnswers(question) {
      // console.log('inside method countanswers========')
      if(question) {
        // console.log(question.answers);
        // console.log(Object.values(question.answers));
        // console.log(Object.keys(question.answers));
        return Object.values(question.answers).length;
      } else {
        return 0;
      }
    },
  },
  computed: {
    ...mapState(['allQuestions']),
    getAllQuestionUpvotes() {
      return this.$store.state.questionUpvotes;
    },
    getAllQuestionDownvotes() {
      return this.$store.state.questionDownvotes;
    },
    getAllAnswers() {
      return this.$store.state.answers;
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  /* padding: .5rem; */
  /* display: inline; */
  /* background-color: lightcyan; */
}
.columns:hover {
  background-color: lightgrey;
}
.columns {
  align-items: center;
  padding: .5rem;

}
.column {
  text-align: left;
  margin: .3rem;
  /* border: 1px solid black */
}
.detailQuestion .column {
  border: 1px solid black;
  border-radius: .5rem;
  text-align: center;
  padding: .5rem 0;
}
#outerBox {
  border: 1px solid rgb(175, 175, 175);
  border-radius: .5rem;

  margin: .5rem;
}
</style>
