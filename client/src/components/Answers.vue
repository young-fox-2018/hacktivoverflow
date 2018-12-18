<template>
<div>
  <div v-for="(answer, index) in answers" :key="index">
    <div class="answer-card mt-5 mb-2">
      <p class="title">{{answer.author}} answered:</p>
      <p class="content">{{answer.answer}}</p>
      <div class="bottom-menu">
        <div v-if="isOwnAnswer(answer)">
          <b-dropdown  no-caret variant="link" size="lg" dropup>
                  <template slot="button-content">
                    <span class="fas fa-ellipsis-h dots"></span>
                  </template>
                    <b-dropdown-item @click.prevent="deleteQuestion(answer)">Delete</b-dropdown-item>
                      <b-dropdown-item v-b-modal="'updateAnswerModal' + index">Update</b-dropdown-item>
                </b-dropdown>
        </div>
        </div>
    </div>
      <UpdateAnswer :modal-name="myUpdateModal + index" :answer="answer" />
  </div>
</div>
</template>
<script>
import { mapState } from 'vuex'
import UpdateAnswer from '@/components/UpdateAnswer.vue'
import firebase from 'firebase'
export default {
  name: 'answers',
  components: {
    UpdateAnswer
  },
  data() {
    return {
      myUpdateModal: 'updateAnswerModal'
    }
  },
  mounted() {
    this.$store.dispatch('getAnswers', this.$route.params.questionId)
    this.$store.dispatch('checkAnswerAction')
  },
  methods: {
    deleteQuestion(answer) {
      firebase.database().ref(`/questions/${this.$route.params.questionId}/answers/${answer.answerId}`)
      .remove((err) => {
        if (err) {
          this.$store.commit('showAlert', {
            message: 'Failed to delete answer',
            countDownTime: 3,
            type: 'danger'
          })
        } else {
          this.$store.commit('showAlert', {
            message: 'Successfully delete answer',
            countDownTime: 3,
            type: 'success'
          })
        }
      })
    },
    isOwnAnswer(answer) {
      if (answer.userId === this.userInfo._id) {
        return true
      } else {
        return false
        }
      }
  },

  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      answers: state => state.answers
    })
  }
}
</script>
<style>
 .answer-card {
    border: 0 solid #dae1e7;
    box-shadow: 0 15px 30px 0 rgba(0,0,0,.11), 0 5px 15px 0 rgba(0,0,0,.08);
    min-height: 25vh;
    overflow: hidden;
    position: relative;
    padding: 15px !important;
  }

  .title {
    font-size: 22px;
    font-weight: bold;
  }

  .content {
    font-size: 16px;
    margin-bottom: 0px;
  }

  .dots {
    color: black;
  }

  .bottom-menu {
    position: absolute !important;
    bottom: 0;
    right: 0;
  }
  .dropdown-menu {
    left: -210% !important;
  }
</style>
