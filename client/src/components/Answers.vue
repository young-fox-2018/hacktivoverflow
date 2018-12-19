<template>
<div>
  <div v-for="(answer, index) in answers" :key="index">
    <div class="answer-card mt-5 mb-2">
      <div>
        <span class="title">{{answer.author}} answered:</span>
        <span class="float-right">Upvote {{answer.votes}}</span>
      </div>
      <p class="content" v-html="answer.answer"></p>
      <div class="bottom-menu">
        <div v-if="isOwnAnswer(answer) && isLogin">
          <b-dropdown  no-caret variant="link" size="lg" dropup>
                  <template slot="button-content">
                    <span class="fas fa-ellipsis-h dots"></span>
                  </template>
                    <b-dropdown-item @click.prevent="deleteQuestion(answer)">Delete</b-dropdown-item>
                      <b-dropdown-item v-b-modal="'updateAnswerModal' + index">Update</b-dropdown-item>
          </b-dropdown>
        </div>
        <div v-else-if="isLogin" class="mb-2">
          <a href="#" class="mr-3" v-b-tooltip.hover title="Click to upvote!"  @click.prevent="upVote(answer)"><i class="fas fa-angle-double-up"></i></a>
          <a href="#" class="mr-3" v-b-tooltip.hover title="Click to downvote!"  @click.prevent="downVote(answer)"><i class="fas fa-angle-double-down"></i></a>
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
     if (localStorage.getItem('token')) {
      this.$store.dispatch('checkToken', localStorage.getItem('token'))
    } 

    this.$store.dispatch('getAnswers', this.$route.params.questionId)
  },
  methods: {
    upVote(answer) {
      firebase.database().ref(`/questions/${this.$route.params.questionId}/answers/${answer.answerId}/votes/${this.userInfo._id}`).once('value')      
      .then((snapshot) => {
        if(snapshot.val()) {
          if(snapshot.val().voted && !snapshot.val().unvoted) {
            return firebase.database().ref(`/questions/${this.$route.params.questionId}/answers/${answer.answerId}/votes/${this.userInfo._id}`).update({
                voted: false,
                count: 0
            })
          } else if (snapshot.val().downVoted) {
            return firebase.database().ref(`/questions/${this.$route.params.questionId}/answers/${answer.answerId}/votes/${this.userInfo._id}`).update({
                count: 1,
                voted: true,
                downVoted: false 
              })
          } else if(!snapshot.val().voted) {
             return firebase.database().ref(`/questions/${this.$route.params.questionId}/answers/${answer.answerId}/votes/${this.userInfo._id}`).update({
                count: 1,
                voted: true
              })
          }
        } else {
          return firebase.database().ref(`/questions/${this.$route.params.questionId}/answers/${answer.answerId}/votes/${this.userInfo._id}`).update({
            count: 1,
            voted: true
          })
        }
      })
      .then(() => {
        
      })
      .catch((err) => {

      })
    },
    downVote(answer) {
      firebase.database().ref(`/questions/${this.$route.params.questionId}/answers/${answer.answerId}/votes/${this.userInfo._id}`).once('value')      
      .then((snapshot) => {
        if(snapshot.val()) {
          if(snapshot.val().downVoted && !snapshot.val().voted) {
            return firebase.database().ref(`/questions/${this.$route.params.questionId}/answers/${answer.answerId}/votes/${this.userInfo._id}`).update({
                count: 0
            })
          } else if (snapshot.val().voted) {
            return firebase.database().ref(`/questions/${this.$route.params.questionId}/answers/${answer.answerId}/votes/${this.userInfo._id}`).update({
              count: -1,
              voted: false,
              downVoted: true 
              })
          } else if(!snapshot.val().downVoted) {
            return firebase.database().ref(`/questions/${this.$route.params.questionId}/answers/${answer.answerId}/votes/${this.userInfo._id}`).update({
              count: -1,
              downVoted: true 
            })
          }

        } else {
            return firebase.database().ref(`/questions/${this.$route.params.questionId}/answers/${answer.answerId}/votes/${this.userInfo._id}`).update({
            count: -1,
            downVoted: true
          })
        }
      })
      .then(() => {

      })
      .catch((err) => {

      })
    },

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
      answers: state => state.answers,
      isLogin: state => state.isLogin
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
