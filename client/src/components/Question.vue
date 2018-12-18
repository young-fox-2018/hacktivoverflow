<template>
  <div class="container" >
    <div id="outerBox" class="columns" v-for="question in questions" :key="question._id">
      <div class="column is-5">
        <div class="columns detailQuestion">
          <div class="column">Votes</div>
          <div class="column">Answer</div>
          <div class="column">Views</div>
        </div>
      </div>
      <router-link :to="'/question/' + question._id" class="column"> {{question.title}} </router-link>
    </div>
  </div>
</template>

<script>
import axios from '@/assets/dotapi';

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
  },
}
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
  margin: .1rem;
  /* border: 1px solid black */
}
.detailQuestion .column {
  border: 1px solid black;
}
#outerBox {
  border: 1px solid rgb(175, 175, 175);
  border-radius: .5rem;

  margin: .5rem;
}
</style>
