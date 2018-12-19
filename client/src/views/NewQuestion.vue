<template>
  <div class="container">
    <input v-model="questionTitle" class="input" type="text" placeholder="Question Summary...">
    <wysiwyg v-model="questionContent" />
    <!-- <div id="editor">
    </div> -->
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
        .then((response) => {
          console.log('success add new question');
          console.log(response.data);
        })
        .catch((err) => {
          console.log('error add new question');
          console.log(err.response);
        });
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
