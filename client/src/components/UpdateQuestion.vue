<template>
  <b-modal :id="modal" ref="updateRef" fade hide-footer title="Update Question">
    <Alert :message="message" :type="type" :countDownTime="countDownTime" @count-down-finish="countDownFinish" />
    <b-form @submit.prevent="updateQuestion">
      <b-form-input   type="text"
                      v-model="title"
                      required
                      placeholder="Start your question with who,why,and etc">
        </b-form-input>
      <wysiwyg v-model="content" class="mt-2" />  
    <div slot="modal-footer" class="mt-4">
        <b-btn type="submit" size="sm" class="float-right" variant="primary">
          Update Question
        </b-btn>    
    </div>
    </b-form>
  </b-modal>
</template>
<script>
import Alert from '@/components/Alert.vue'
import axios from '@/helpers/axios.js'
export default {
  props:['modal','question'],
  components: {
    Alert
  },
  data () {
    return {
      title: this.question.title,
      content: this.question.content,
      message: '',
      type: '',
      countDownTime: 0
    }
  },
  watch: {
    question (value) {
      this.title = value.title
      this.content = value.content
    }
  },
  methods: {
    countDownFinish(payload) {
      this.countDownTime = payload
    },
    updateQuestion() {
      axios({
        method: 'put',
        url:`/questions/${ this.$route.params.questionId}`,
        data: {
          title: this.title,
          content: this.content
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data: { question } }) => {
        this.$refs.updateRef.hide()
        this.$store.commit('showAlert', {
          message:'Your question already updated...',
          countDownTime: 3,
          type: 'success'
        })
        
        this.$store.dispatch('getOneQuestion', this.$route.params.questionId)
        this.$store.dispatch('getAllQuestions')
      })
      .catch(({ response: { data: { err } } }) => {
        this.message = 'Please try again'
        this.type = 'danger'
        this.countDownTime = 3
      })
    }
  }
}
</script>
