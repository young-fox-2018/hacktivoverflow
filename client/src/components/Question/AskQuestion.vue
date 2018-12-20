<template>
  <div class="container form">
    <b-button type="submit" variant="link" to="/question">See All Question</b-button>
    <hr>
    <b-form>
      <div v-if="success" class="alert alert-success" role="alert">{{successMsg}}</div>
      <div v-if="error" class="alert alert-danger" role="alert">{{errorMsg}}</div>
      <b-form-group label="Title" label-for="titlequestion">
        <b-form-input
          id="titlequestion"
          type="text"
          placeholder="Whats your programming question? be specific"
          required
          v-model="title"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Body" label-for="bodyquestion">
        <wysiwyg v-model="body"/>
      </b-form-group>
      <b-form-group label="Tags" label-for="tagquestion">
        <b-form-input
          id="tagquestion"
          type="text"
          placeholder="e.g.(vue-cli, javascript)"
          v-model="tags"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" @click.prevent="postQuestion">Post Your Question</b-button>
    </b-form>
  </div>
</template>

<script>
import api from "@/api/api.js";

export default {
  name: "askquestion",
  data() {
    return {
      isLogin: false,

      title: "",
      body: "",
      tags: "",

      success: false,
      successMsg: "",
      error: false,
      errorMsg: ""
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      if (!localStorage.getItem("token")) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    },
    postQuestion() {
      this.checkLogin()
      if (this.isLogin) {
        let newQuestion = {
          title: this.title,
          body: this.body
        };
        console.log(newQuestion);

        api
          .post("/question", newQuestion, {
            headers: {
              authorization: localStorage.getItem('token')
            }
          })
          .then(question => {
            console.log(question.data.question);
            this.success = true;
            this.successMsg = question.data.message;
            setTimeout(() => {
              this.title = ''
              this.body = ''
              this.clearMessage();
              // this.$store.dispatch("addquestion", question.data.question);
            }, 2000);
          })
          .catch(error => {
            console.log(error.response)
            this.error = true
            this.errorMsg = error.response.data.message
            setTimeout(() => {
              this.clearMessage()
            }, 4000);
          });
      } else {
        this.error = true;
        this.errorMsg = "You must be logged in to ask a question on HacktivOverflow";
        setTimeout(() => {
          this.clearMessage()
        }, 2000);
      }
    },
    clearMessage() {
      this.success = false
      this.successMsg = ""
      this.error = false
      this.errorMsg = ""
    }
  }
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
.form {
  text-align: left;
}
</style>

