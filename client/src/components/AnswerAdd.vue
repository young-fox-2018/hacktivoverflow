<template>
  <div class="row my-2 " v-cloak>
    <div class="col border-bottom py-2">
      <FailAlert :message="errorMessage"  @alertdone="alertDone"/>
        <span>Your Answer: </span>
        <b-form @submit.prevent="answerSend">
          <wysiwyg v-model="text" />
          <b-button type="submit" variant="primary" class="my-2">Submit</b-button>
        </b-form>
      </div>
    </div>
    
</template>

<script>
import myApi from '@/api/myApi'
import FailAlert from '@/components/FailAlert.vue'

export default {
  name: 'addAnswer',
  components: {
    FailAlert
  },
  data() {
    return {
      text: '',
      errorMessage: ''
    }
  },
  methods: {
    answerSend() {
      // console.log('sini lahhhhh', this.text)
      let questionId = this.$route.params.questionId
      let input = {
        text: this.text
      }
      // console.log(questionId)
      myApi({
        method: 'post',
        url: 'answer',
        headers: {
          auth: localStorage.token,
          questionid: questionId
        },
        data: input
      })
        .then((result) => {
          console.log('succes answer')
          this.text = ''
          this.$emit('addanswer')
        }).catch((err) => {
          console.log(err.response.data.message)
          this.errorMessage = err.response.data.message
        });
    },
    alertDone() {
      this.errorMessage = ''
    }
  }
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css"; 
</style>
