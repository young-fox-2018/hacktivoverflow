<template>
  <div class="home">
    <div class="row">
      <div class="col-lg-3">
      </div>  
      <div class="col-lg-6">
        <div class="question-card mt-2 mb-5">
          <p class="title">{{question.title}} </p>
          <p class="content">{{question.content}}</p>
          <div class="bottom-menu">
            <div v-if="!ownQuestion">
              <b-button class="mr-2" size="sm" @click="upVote">Upvote</b-button>
              <b-button class="mr-2" size="sm" @click="downVote">Downvote</b-button>
              <b-dropdown  no-caret variant="link" size="lg" dropup>
              <template slot="button-content">
                <span class="fas fa-ellipsis-h dots"></span>
              </template>
                <b-dropdown-item v-b-modal="'addAnswerModal'">Answer</b-dropdown-item>
              </b-dropdown>
            </div>
            <div v-else>
              <b-dropdown  no-caret variant="link" size="lg" dropup>
                <template slot="button-content">
                  <span class="fas fa-ellipsis-h dots"></span>
                </template>
                  <b-dropdown-item v-b-modal="'addAnswerModal'">Answer</b-dropdown-item>
                  <b-dropdown-item v-b-modal="'updateModal1'">Update</b-dropdown-item>
                  <b-dropdown-item @click.prevent="deleteQuestion">Delete</b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
            <UpdateQuestion :question="question" :modal="myUpdateModal"/>
              <AddAnswer :modal="myAddAnswerModal" />
        </div>
        <Answers />
      </div>
      <div class="col-lg-3">
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import AddAnswer from '@/components/AddAnswer.vue'
import firebase from 'firebase'
import axios from '@/helpers/axios'
import Answers from '@/components/Answers.vue'
import UpdateQuestion from '@/components/UpdateQuestion.vue'
export default {
  name: 'questionDetails',
  components: { 
    AddAnswer,
    Answers,
    UpdateQuestion
  },
  mounted() {
      this.$store.dispatch('getOneQuestion', this.$route.params.questionId)
  },
  data() {
    return {
      voted: false,
      downVoted: false,
      myAddAnswerModal: 'addAnswerModal',
      myUpdateModal: 'updateModal1'
    }
  },
  watch: {
    '$route.params.questionId'(value) {
    firebase.database().ref(`/questions/${value}/${this.userInfo._id}`)
    .on('value', (snapshot, err) => {
      if(snapshot.val()) {
        if (snapshot.val().voted) {
          this.voted = true
        } else {
          this.voted = false
        }
        
        if (snapshot.val().downVoted) {
          this.downVoted = true
        } else {
          this.downVoted = false
        }
      }
    })
    }
  },
  computed: {
    ...mapState({
      question: state => state.question,
      ownQuestion: state => state.ownQuestion,
      userInfo: state => state.userInfo
    }),
  },
  methods: {
    deleteQuestion() {
      axios({
        method: 'delete',
        url: `/questions/${this.$route.params.questionId}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then((question) => {
        this.$router.push('/questions')
        this.$store.dispatch('getAllQuestions')
      })
    },
    upVote() {
      firebase.database().ref(`/questions/${this.$route.params.questionId}/votes/${this.userInfo._id}`).once('value')
      .then((snapshot) => {
        if(snapshot.val()) {
          if(snapshot.val().voted && !snapshot.val().unvoted) {
            return firebase.database().ref(`/questions/${this.$route.params.questionId}/votes/${this.userInfo._id}`).update({
                voted: false,
                count: 0
            })
          } else if (snapshot.val().downVoted) {
            return firebase.database().ref(`/questions/${this.$route.params.questionId}/votes/${this.userInfo._id}`).update({
                count: 1,
                voted: true,
                downVoted: false 
              })
          } else if(!snapshot.val().voted) {
             return firebase.database().ref(`/questions/${this.$route.params.questionId}/votes/${this.userInfo._id}`).update({
                count: 1,
                voted: true
              })
          }
        } else {
          return firebase.database().ref(`/questions/${this.$route.params.questionId}/votes/${this.userInfo._id}`).update({
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
    downVote() {
      firebase.database().ref(`/questions/${this.$route.params.questionId}/votes/${this.userInfo._id}`).once('value')
      .then((snapshot) => {
        if(snapshot.val()) {
          if(snapshot.val().downVoted && !snapshot.val().voted) {
            return firebase.database().ref(`/questions/${this.$route.params.questionId}/votes/${this.userInfo._id}`).update({
                downVoted: false,
                count: 0
            })
          } else if (snapshot.val().voted) {
            return firebase.database().ref(`/questions/${this.$route.params.questionId}/votes/${this.userInfo._id}`).update({
                count: -1,
                voted: false,
                downVoted: true 
              })
          } else if(!snapshot.val().downVoted) {
            return firebase.database().ref(`/questions/${this.$route.params.questionId}/votes/${this.userInfo._id}`).update({
              count: -1,
              downVoted: true 
            })
          }

        } else {
          return firebase.database().ref(`/questions/${this.$route.params.questionId}/votes/${this.userInfo._id}`).update({
            count: -1,
            downVoted: true
          })
        }
      })
      .then(() => {

      })
      .catch((err) => {

      })
    }
  }
}
</script>
<style>
  .question-card {
    border: 0 solid #dae1e7;
    box-shadow: 0 15px 30px 0 rgba(0,0,0,.11), 0 5px 15px 0 rgba(0,0,0,.08);
    min-height: 50vh;
    overflow: hidden;
    position: relative;
    padding: 15px !important;
    overflow: auto;
  }
</style>
