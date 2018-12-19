<template>
  <div>
    <div class="btn-group">
      <button @click="showFormAnswer"><i class="fas fa-comment"></i>Answer</button>
      <button @click="like"> {{totalVote}} <i class="fas fa-thumbs-up"></i>Like</button>
      <button @click="dislike"><i class="fas fa-thumbs-down"></i>Dislike</button>
    </div>
    <div class="card" v-if="formAnswer">
      <h5 class="card-header">Your answer</h5>
      <div class="card-body">
        <textarea class="form-control" placeholder="Enter your answer.." v-model="comment"></textarea>
        <hr>
        <button @click="addComment" class="button">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '../config.js'

export default {
  props: ['question'],
  data() {
    return {
      comment: '',
      formAnswer: false,
      dataUser: '',
      upVote: 0,
      downVote: 0,
      dataLike: null,
      dataDislike: null,
      totalVote: 0,
      idLike: '',
      idDislike: ''
    }
  },
  methods: {
    addComment() {
      var id = firebase.ref().child('question/comment').push().key;
      let dataUser = this.$store.state.dataUser
      var data = {
        id: id,
        user: dataUser,
        answer: this.comment
      }
      var updates = {};
      // console.log(`/question/${this.question}/answer`)
      updates[`/question/${this.question.id}/answer/${id}`] = data;
      firebase.ref().update(updates);
      this.comment = ''
    },
    showFormAnswer() {
      if (localStorage.getItem('access_token')) {
        if (this.formAnswer) this.formAnswer = false
        else this.formAnswer = true
      } else {
        alert('You must Sign in!')
      }
    },
    getLike() {
      firebase.ref(`question/${this.question.id}/like`).once('value', (snapshot) => {
        this.dataLike = snapshot.val()
        this.upVote = Object.keys(this.dataLike).length
      })
    },
    getDislike() {
      firebase.ref(`question/${this.question.id}/dislike`).once('value', (snapshot) => {
        this.dataDislike = snapshot.val()
        this.downVote = Object.keys(this.dataDislike).length
      })
    },
    checkVote() {
      let dataUser = this.$store.state.dataUser
      if (Object.keys(this.dataLike).length >= 1) {
        Object.keys(this.dataLike).forEach(key => {
          if (this.dataLike[key].user === dataUser._id) {
            firebase.ref().child('/question/' + this.question.id + 'like' + this.dataLike[key].id).remove();
          } 
        })
      }
    },
    like() {
      this.getLike()
      let dataUser = this.$store.state.dataUser
      if (this.question.user.id !== dataUser._id) {
        if (Object.keys(this.dataLike).length >= 1) {
          Object.keys(this.dataLike).forEach(key => {
            if (this.dataLike[key].user !== dataUser._id) {
              var id = firebase.ref().child('question/like').push().key;
              var data = {
                id: id,
                user: dataUser._id
              }
              var updates = {};
              updates[`/question/${this.question.id}/like/${id}`] = data;
              firebase.ref().update(updates);
              this.checkVote()
            } else {
              alert('sudah like')
            }
          })
        } else {
          var id = firebase.ref().child('question/like').push().key;
          var data = {
            id: id,
            user: dataUser._id
          }
          var updates = {};
          updates[`/question/${this.question.id}/like/${id}`] = data;
          firebase.ref().update(updates);
          this.checkVote()
        }
      } else {
        alert('tidak bisa vote punya sendiri!')
      }
    },
    dislike() {
      this.getDislike()
      let dataUser = this.$store.state.dataUser
      if (this.question.user.id !== dataUser._id) {
        if (Object.keys(this.dataDislike).length >= 1) {
          Object.keys(this.dataDislike).forEach(key => {
            if (this.dataDislike[key].user !== dataUser._id) {
              var id = firebase.ref().child('question/dislike').push().key;
              var data = {
                id: id,
                user: dataUser._id
              }
              var updates = {};
              updates[`/question/${this.question.id}/dislike/${id}`] = data;
              firebase.ref().update(updates);
              this.checkVote()
            } else {
              alert('sudah dislike')
            }
          })
        } else {
          var id = firebase.ref().child('question/dislike').push().key;
          var data = {
            id: id,
            user: dataUser._id
          }
          var updates = {};
          updates[`/question/${this.question.id}/dislike/${id}`] = data;
          firebase.ref().update(updates);
          this.checkVote()
        }
      } else {
        alert('tidak bisa vote punya sendiri')
      }
    }
  },
  mounted() {
    this.getLike()
    this.getDislike()
  }
}
</script>

