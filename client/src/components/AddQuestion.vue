<template>
  <b-modal :id="modal" ref="questionRef" fade hide-footer title="Add Question">
    <b-form @submit.prevent="addQuestion">
        <b-form-input type="text"
                      v-model="title"
                      required
                      placeholder="Start your question with who,why,and etc">
        </b-form-input>
         <b-form-textarea type="text"
                          v-model="content"
                          class="mt-3"
                          placeholder="content">
         </b-form-textarea>    
    <div slot="modal-footer" class="mt-4">
        <b-btn type="submit" size="sm" class="float-right" variant="primary">
          Add Question
        </b-btn>    
    </div>
    </b-form>
  </b-modal>
</template>
<script>
import axios from '@/helpers/axios.js'
export default {
  props:['modal'],
  data () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    addQuestion() {
      axios({
        method: 'post',
        url:'/questions',
        data: {
          title: this.title,
          content: this.content
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data: { question } }) => {
        this.$refs.questionRef.hide()
        this.$store.commit('showAlert', {
          message:'Your question already created...',
          countDownTime: 3,
          type: 'success'
        })

        this.$store.dispatch('getAllQuestions')
      })
      .catch(({ response: { data: { err } } }) => {
       this.$refs.questionRef.hide()
        this.$store.commit('showAlert', {
          message:'Please try again...',
          countDownTime: 3,
          type: 'danger'
        })
      })
    }
  }
}
</script>
