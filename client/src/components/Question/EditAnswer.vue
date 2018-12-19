<template>
  <div class="form">
    <h4>Edit Answer</h4>
    <!-- <div v-if="success" class="alert alert-success" role="alert">{{successMsg}}</div> -->
    <div v-if="error" class="alert alert-danger" role="alert">{{errorMsg}}</div>
    <b-form>
      <wysiwyg v-model="content"/>
      <br>
      <b-button type="submit" variant="primary" @click.prevent="editAnswer">Edit Your Answer</b-button>
    </b-form>
  </div>
</template>

<script>
import api from '@/api/api.js'

export default {
  name: "editanswer",
  data() {
    return {
      content: '',
      // success: false,
      // successMsg: "",
      error: false,
      errorMsg: "",
    };
  },
  created(){
    this.getAnswer()
  },
  methods: {
    editAnswer(){
      let answerId = this.$route.params.answerId
      let questionId = this.$route.params.questionId

      console.log(answerId+'updateee===', this.content)

      api
          .put(`/answer/${answerId}`, {content: this.content}, {
            headers: {
              authorization: localStorage.getItem('token')
            }
          })
          .then( answer => {
            this.$router.push('/question/'+questionId)
          })
          .catch( error => {
            console.log('======errrorr')
            console.log(error.response)
            this.error = true
            this.errorMsg = error.response.data.message
            setTimeout(() => {
              this.error = false
              this.errorMsg = ''
            }, 2500);
            
          })
    },
    getAnswer(){
        let answerId = this.$route.params.answerId
        let questionId = this.$route.params.questionId
        console.log(answerId +'/'+ questionId)

        api
          .get(`/answer/${questionId}/${answerId}`)
          .then( answer => {
            console.log(answer.data.answer)
            this.content = answer.data.answer.content
          })
          .catch( error => {
            console.log(error)
          })
    }
  }
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

</style>
