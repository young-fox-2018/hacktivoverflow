<template>
  <b-modal :id="modalName" ref="updateAnswerRef" fade hide-footer title="Update Answer">
    <Alert :message="message" :type="type" :countDownTime="countDownTime" @count-down-finish="countDownFinish" />
    <b-form @submit.prevent="updateAnswer">
     <wysiwyg v-model="answer.answer" />
    <div slot="modal-footer" class="mt-4">
        <b-btn type="submit" size="sm" class="float-right" variant="primary">
          Update Answer
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
  name: 'updateAnswer',
  props:['modalName','answer'],
  data () {
    return {
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
      userInfo: state => state.userInfo
    })
  },
  methods: {
    countDownFinish(payload) {
      this.countDownTime = payload
    },
    updateAnswer() {
      firebase.database().ref(`/questions/${this.$route.params.questionId}/answers/${this.answer.answerId}`).update({
        answer: this.answer.answer
      })
      .then((snapshot) => {
        this.$refs.updateAnswerRef.hide()
        this.$store.commit('showAlert', {
          message: 'Successfully updated answer',
          countDownTime: 3,
          type: 'success'
        })
      })
      .catch((err) => {
          this.message = 'Please try again'
          this.type = 'danger'
          this.countDownTime = 3
      })
    } 
  }
}
</script>
<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
