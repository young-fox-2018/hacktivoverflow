<template>
  <div v-if="loading">
    <img src="../../assets/loading.gif" alt="loading">
  </div>
  <div v-else class="content">
      <h1>Edit Question</h1>
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
import Swal from 'sweetalert2'

export default {
  name: "edit_article",
  props: ["user_data"],
  data() {
    return {
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
        url: "https://xavier-ho-server.thenile.online/ho/questions/edit",
        headers: { token: token },
        data: data
      })
      .then(response => {
        this.$router.push('/dashboard/questions')
      })
      .catch(err => {
        console.log(err);
        let timerInterval
        Swal({
          title: err.response.data.message,
          html: 'Auto close in <b></b> seconds.',
          type: 'error',
          confirmButtonText: 'Ok',
          backdrop: false,
          allowOutsideClick: false,
          timer: 3000,
          onBeforeOpen: () => {
              timerInterval = setInterval(() => {
              Swal.getContent().querySelector('b')
                  .textContent = (Swal.getTimerLeft()/1000)
                    .toFixed(0)
              }, 100)
          },
          onClose: () => {
              clearInterval(timerInterval)
          }
        });
      })
    },
    getQuestion() {
      axios({
        method: "get",
        url: "https://xavier-ho-server.thenile.online/ho/questions"
      })
      .then(response => {
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
