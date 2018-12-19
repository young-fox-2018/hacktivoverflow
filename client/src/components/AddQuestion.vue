<template>
  <b-modal :id="modal" ref="questionRef" @hide="clear" fade hide-footer title="Add Question">
    <b-form @submit.prevent="addQuestion">
        <b-form-input type="text"
                      v-model="title"
                      required
                      placeholder="Start your question with who,why,and etc">
        </b-form-input>
         <wysiwyg v-model="content" class="mt-2" />
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
    clear() {
      this.title = ''
      this.content = ''
    },
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

        return this.$store.dispatch('getAllQuestions')
    })
      .then(({ data: { questions } }) => {
        this.$store.commit('insertQuestions', questions)
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
