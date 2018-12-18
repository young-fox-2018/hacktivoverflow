<template>
  <b-modal :id="modal" ref="questionRef" fade hide-footer title="Add Answer">
    <Alert :message="message" :type="type" :countDownTime="countDownTime" @count-down-finish="countDownFinish" />
    <b-form @submit.prevent="addAnswer">
      <b-form-textarea type="text"
                      v-model="answer"
                      required
                      placeholder="Your Answer">
      </b-form-textarea>  
    <div slot="modal-footer" class="mt-4">
        <b-btn type="submit" size="sm" class="float-right" variant="primary">
          Add Answer
        </b-btn>    
    </div>
    </b-form>
  </b-modal>
</template>
<script>
import axios from '@/helpers/axios.js'
import Alert from '@/components/Alert.vue'
import firebase from 'firebase'
import { mapState } from 'vuex'
export default {
  props:['modal'],
  data () {
    return {
      answer: '',
      message: '',
      type: '',
      countDownTime: 0
    }
  },
  components: {
    Alert
  },
  computed: {
    ...mapState({
      user: state => state.userInfo
    })
  },
  methods: {
    countDownFinish(payload) {
      this.countDownTime = payload
    },
    addAnswer() { 
      firebase.database().ref(`/questions/${this.$route.params.questionId}/answers`).push({
        answer: this.answer,
        author: `${this.user.firstName} ${this.user.lastName}`,
        userId: this.user._id
      })
      .then(() => {
        this.$refs.questionRef.hide()
        this.$store.commit('showAlert', {
          message: 'Successfully add answer',
          type: 'success',
          countDownTime: 3
        })      
      })
      .catch((err) => {
          this.message = 'Please try again'
          this.type = 'danger'
          countDownTime = 3
      })
    } 
  }
}
</script>
