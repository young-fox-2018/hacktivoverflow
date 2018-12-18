<template>
  <div class="container">
    <h1>{{ questionDetail.title }}</h1>
    <hr>
    <p v-html="questionDetail.content"></p>
    <div class="columns" id="userInfo">
      <div class="column is-1">
        <span class="icon">
          <i class="far fa-thumbs-up fa-lg"></i> 5
        </span>
      </div>
      <div class="column is-1">
        <span class="icon">
          <i class="far fa-thumbs-down fa-lg"></i> 4
        </span>
      </div>
      <div class="column is-6"></div>
      <div class="column">
        <p>Posted at: {{ questionDetail.posted_at }}</p>
        <p>By: {{questionDetail.authorId.name}}</p>
      </div>
    </div>
    <div class="columns" id="comment">
      Answers:
    </div>
  </div>
</template>

<script>
import axios from '@/assets/dotapi';

export default {
  name: 'QuestionDetail',
  data() {
    return {
      questionDetail: {
        authorId: {}
      },
    };
  },
  created() {
    axios.get('/questions/' + this.$route.params.id)
    .then(({ data }) => {
      // console.log('got question detail');
      this.questionDetail = data.question;
      this.questionDetail.posted_at = new Date(this.questionDetail.posted_at).toISOString().substring(0, 10);
    })
    .catch(err => {
      console.log('error getting question detail');
      console.log(err.response);
    });
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
  border-bottom: 1px solid rgb(228, 228, 228)
}
.column {
  align-items: center;
  align-content: center;
}
#comment {
  margin: .5rem;
}
</style>
