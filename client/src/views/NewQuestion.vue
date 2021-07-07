<template>
  <div class="container">
    <div class="notification is-success" v-if="success">
      <button class="delete" @click="success = false; successMsg = ''"></button>
      {{ successMsg }}
    </div>
    <div class="notification is-danger" v-if="error">
      <button class="delete" @click="error = false; errorMsg = ''"></button>
      {{ errorMsg }}
    </div>
    <input v-model="questionTitle" class="input" type="text" placeholder="Question Summary...">
    <wysiwyg v-model="questionContent" />
    <a class="button is-info is-outlined is-fullwidth" @click.prevent="addNewQuestion">Add Question</a>
  </div>
</template>

<script>
import axios from '@/assets/dotapi';

export default {
  name: 'NewQuestion',
  data() {
    return {
      questionTitle: '',
      questionContent: '',
      error: false,
      errorMsg: '',
      success: false,
      successMsg: '',
    };
  },
  methods: {
    addNewQuestion() {
      axios
        .post('/questions',
          {
            title: this.questionTitle,
            content: this.questionContent,
          },
          {
            headers: { token: localStorage.token },
          })
        .then(({ data }) => {
          this.showSuccessMessage(data.msg);
          this.questionTitle = '';
          this.questionContent = '';
        })
        .catch((err) => {
          this.showErrorMessage(err.response.data.msg);
        });
    },
    showSuccessMessage(msg) {
      this.success = true;
      this.successMsg = msg;
      setTimeout(() => {
        this.success = false;
        this.successMsg = '';
        this.closeModalLogin();
      }, 2000);
    },
    showErrorMessage(msg) {
      this.error = true;
      this.errorMsg = msg;
      setTimeout(() => {
        this.error = false;
        this.errorMsg = '';
      }, 3000);
    },
  },
};
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
.container {
  width: 70%;
  padding-top: 2rem;
}
input {
  margin-bottom: 2rem;
  font-size: 1.3rem;
}
#editor {
  height: 40vh;
}
a {
  margin-top: 2rem;
}
</style>
