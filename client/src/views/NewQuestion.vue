<template>
  <div class="container">
    <div id="editor">
    </div>
  </div>
</template>

<script>
var toolbarOptions = [
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
var QuillDeltaToHtmlConverter = require('quill-delta-to-html').QuillDeltaToHtmlConverter;

export default {
  name: 'NewQuestion',
  data() {
    return {
      options: {
       modules: {
        toolbar: toolbarOptions
      },
      theme: 'snow',
      placeholder: 'Ask Any Question Here',
      },
      questionContent: '',
    };
  },
  mounted() {
    const editor = new Quill('#editor', this.options);
    editor.on('text-change', () => {
      var delta = editor.getContents();
      var converter = new QuillDeltaToHtmlConverter(delta.ops, {});
      var html = converter.convert();
      this.questionContent = html;
    });
  }
};
</script>

<style scoped>
.container {
  width: 70%;
}
</style>
