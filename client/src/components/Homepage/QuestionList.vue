<template>
  <div class="container">
      <div class="header">
          <router-link to="/questions"><h1>Venture to Questions</h1></router-link>
      </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: [],
  data() {
    return {
      questionList: []
    };
  },
  methods: {
    getQuestion: function() {
      axios({
        method: "get",
        url: "http://localhost:3000/ho/question"
      })
        .then(response => {
          this.$store.dispatch("storeQuestions_Action", response.data.data);
          this.questionList = this.$store.state.questionList;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created: function() {
      this.getQuestion()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.item {
  margin-bottom: 20px;
  border-bottom: 1px solid grey;
}
.subtitle {
  font-size: 14px;
  color: lightslategray;
}
</style>
