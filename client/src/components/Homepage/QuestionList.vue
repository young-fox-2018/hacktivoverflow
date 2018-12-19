<template>
  <div class="container">
      <!-- <div class="header">
          <router-link to="/questions"><h1>Venture to Questions</h1></router-link>
      </div> -->
      <div class="header">
          <h1>Latest Questions</h1>
      </div>
      <hr>
      <div v-for="question in questionList" :key="question._id" class="row" style="margin-right:0px">
        <div class="col-4 row">
          <div class="col-6">
            {{question.votes.length}}
          </div>
          <div class="col-6">
            {{question.answers.length}}
          </div>
        </div>
        <div class="col-8">
          <router-link :to="`/questions/${question.slug}`">{{question.title}}</router-link>
        </div>
        <div class="col-4 row">
           <div class="col-6">
            Votes
          </div>
          <div class="col-6">
            Answers
          </div>
        </div>
        <div class="col-8">
          <div class="tags" v-for="(tag, index) in question.tags" :key="index">
            {{tag.text}}
          </div>
        </div>
        <div class="col-4 subtitle" style="text-align:left">
          <font-awesome-icon icon="calendar-alt"/> {{question.createdDate}}
        </div>
        <hr class="col-12">
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
        url: "https://xavier-ho-server.thenile.online/ho/questions"
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
<style scoped>
.item {
  margin-bottom: 20px;
  border-bottom: 1px solid grey;
}
.subtitle {
  font-size: 14px;
  color: lightslategray;
}
.tags {
  width: fit-content;
  background-color: #D8BFD8;
  padding: 1px 5px;
  margin-right: 5px;
  border-radius: 5px;
  font-size: 14px;
  display: inline-block
}
</style>
