<template>
  <div class="container">
    <input v-model="questionTitle" class="input" type="text" placeholder="Question Summary...">
    <div id="editor">
    </div>
    <a class="button is-info is-outlined is-fullwidth" @click.prevent="addNewQuestion">Add Question</a>
  </div>
</template>

<script>
import axios from '@/assets/dotapi';
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

];
const { QuillDeltaToHtmlConverter } = require('quill-delta-to-html');

export default {
  name: 'NewQuestion',
  data() {
    return {
      options: {
        modules: {
          toolbar: toolbarOptions,
        },
        theme: 'snow',
        placeholder: 'Ask Any Question Here',
      },
      questionTitle: '',
      questionContent: '',
    };
  },
  mounted() {
    const editor = new Quill('#editor', this.options);
    editor.on('text-change', () => {
      const delta = editor.getContents();
      const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
      const html = converter.convert();
      this.questionContent = html;
    });
  },
  methods: {
    addNewQuestion() {
      console.log(this.questionContent);
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
