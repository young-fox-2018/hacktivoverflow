<template>
  <div v-if="loading">
    <img src="../../assets/loading.gif" alt="loading">
  </div>
  <div v-else class="content">
      <Error v-if="error_status" v-bind:error="error_msg"/>
      <h1>Edit Question</h1>
    <!-- <h1>{{this.$route.params.article}}</h1> -->
     <div id="questionEditor">
      <form>
        <div class="form-group">
          <label for="title">Question Title:</label>
          <input type="text" v-model="question_title" :v-bind:value="this.question_title" class="form-control" id="title" placeholder="Article Title">
        </div>
        <div class="form-group">
          <label for="body">Question Description:</label>
          <wysiwyg v-model="question_description" style="background-color:white"/>
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="editQuestion()">Edit Question</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Error from "@/components/Error.vue";

export default {
  name: "edit_article",
  props: ["user_data"],
  components: {
    Error
  },
  data() {
    return {
      error_status: false,
      error_msg: "",
      questionList: {},
      question_title: "",
      question_description: "",
      questionId: '',
      loading: true
    };
  },
  methods: {
    editQuestion() {
      let token = localStorage.getItem("token");
      let data = {
          title: this.question_title,
          description: this.question_description,
          questionId: this.questionId,
          userId: this.questionList.op._id
      }
      axios({
        method: "put",
        url: "http://localhost:3000/ho/question/edit",
        headers: { token: token },
        data: data
      })
      .then(response => {
        this.$router.push('/dashboard/questions')
      })
      .catch(err => {
        console.log(err);
      });
    },
    getQuestion() {
      axios({
        method: "get",
        url: "http://localhost:3000/ho/question"
      })
      .then(response => {
        console.log(response.data.data);
        response.data.data.forEach(datum => {
          if (datum.slug == this.$route.params.slug) {
            this.questionList = datum;
            this.question_title = datum.title;
            this.question_description = datum.description;
            this.questionId = datum._id
          }
        });
        this.loading = false
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
  mounted: function() {
    this.getQuestion()
  }
};
</script>

<style>
.content {
  margin: 10px;
}
#questionEditor {
  width: 80%;
  border: 1px solid lightseagreen;
  margin: 0 auto;
  padding: 10px;
}
</style>
