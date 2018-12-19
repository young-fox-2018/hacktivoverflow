<template>
  <div class="container">
    <div class="row">
      <h4 class="col-6">Top Question</h4>
      <router-link :to="'/question/ask'">
        <b-button class>Ask Question</b-button>
      </router-link>
    </div>
    <hr>

    <div class="row" style="margin-right: 0;" v-for="question in allquestion" :key="question._id">
      <div class="col-4">
        <div class="row" style="margin-left: 100px;">
          <b-card no-body style="width: 5rem;">
            <p>{{question.voteUp.length - question.voteDown.length}}</p>
            <p>Vote</p>
          </b-card>
          <!-- <b-card no-body style="width: 6rem;">
            <p>0</p>
            <p>Answer</p>
          </b-card> -->
        </div>
      </div>
      <div class="col-8" style="text-align: left;">
        <div class="row">
          <router-link :to="`/question/${question._id}`">
            <p>{{question.title}}</p>
          </router-link>
        </div>
        <br>
        <div class="row">Posted on {{question.createdAt.slice(0,10)}} by {{question.userId.name}}</div>
        <hr>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  name: "listquestion",
  computed: {
    allquestion() {
      return this.$store.state.questions;
    }
  },
  created() {
    this.getAllQuestion();
  },
  methods: {
    getAllQuestion() {
      this.$store.dispatch("getAllQuestion");
    }
  }
};
</script>

<style>
.card-body {
  -ms-flex: 1 1 auto;
  -webkit-box-flex: 1;
  flex: 1 1 auto;
  padding: 1.25rem;
}
</style>


