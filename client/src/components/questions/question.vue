<template>
  <div v-if="!edit" class="box">
    <div class="columns">
      <div class="column is-1 vote">
        <span v-show="upvoted" @click="voteQuestion(1)" class="icon">
          <i class="fas fa-thumbs-up"></i>
        </span>
        <span v-show="!upvoted" @click="voteQuestion(1)" class="icon">
          <i class="far fa-thumbs-up"></i>
        </span>
        <span>{{ question.voteCount }}</span>
        <span v-show="downvoted" @click="voteQuestion(-1)" class="icon">
          <i class="fas fa-thumbs-down"></i>
        </span>
        <span v-show="!downvoted" @click="voteQuestion(-1)" class="icon">
          <i class="far fa-thumbs-down"></i>
        </span>
      </div>
      <div class="column question">
        <div v-html="question.message"></div>
        <div class="level">
          <div class="level-left">
            <div v-if="$route.name === 'home'" @click="showAnswers">
              <span class="icon">
                <i class="fas fa-book-open"></i>
              </span>
              <span class="is-size-7" style="margin-left: 0.5rem">Show Answers</span>
            </div>
          </div>
          <div class="level-right">
            <div v-if="user && question.user" class="author">
              <div v-if="question.user.id === user.id">
                <span @click="edit=true" class="icon">
                  <i class="fas fa-edit"></i>
                </span>
                <span @click="deleteQuestion" class="icon">
                  <i class="fas fa-trash"></i>
                </span>
              </div>
              <span v-else>{{question.user.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <wysiwyg v-model="question.message"/>
    <div class="buttons is-centered">
      <span @click="updateQuestion" class="button is-primary is-rounded">Update</span>
      <!-- <span @click="edit=false" class="button is-primary is-outlined is-rounded">Cancel</span> -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { database } from "@/config";

export default {
  props: ["question"],

  data() {
    return {
      edit: false
    };
  },

  computed: {
    ...mapState({
      user: state => state.user
    }),

    upvoted() {
      return (
        this.user &&
        this.question.votes &&
        this.question.votes[this.user.id] === 1
      );
    },

    downvoted() {
      return (
        this.user &&
        this.question.votes &&
        this.question.votes[this.user.id] === -1
      );
    }
  },

  methods: {
    updateQuestion() {
      database
        .ref(`/questions/${this.question.id}`)
        .update({
          message: this.question.message
        })
        .then(() => {
          this.edit = false;
        })
        .catch(err => alert(err.message));
    },

    deleteQuestion() {
      let questionId = this.question.id;
      this.$router.push("/");
      database
        .ref()
        .update({
          [`/questions/${questionId}`]: null,
          [`/answers/${questionId}`]: null
        })
        .then(() => {})
        .catch(err => alert(err.message));
    },

    voteQuestion(vote) {
      // if (this.user) {
      //   if (this.question.user.id !== this.user.id) {
      //     database
      //       .ref(`/questions/${this.question.id}/votes/${this.user.id}`)
      //       .transaction(currentVote => {
      //         if (currentVote && currentVote + vote >= -1 && currentVote + vote <= 1) {
      //           currentVote = currentVote + vote || null;
      //         } else {
      //           currentVote = vote;
      //         }
      //         return currentVote;
      //       });
      //   } else {
      //     alert(`Sorry, you can't vote your own question`);
      //   }
      // } else {
      //   alert(`Please login first`);
      // }

      if (this.user) {
        if (this.question.user.id !== this.user.id) {
          database
            .ref(`/questions/${this.question.id}/votes/${this.user.id}`)
            .transaction(currentVote => {
              if (currentVote == vote) {
                currentVote = null;
              } else {
                currentVote = vote;
              }
              return currentVote;
            });
        } else {
          alert(`Sorry, you can't vote your own question`);
        }
      } else {
        alert(`Please login first`);
      }
    },

    showAnswers() {
      this.$router.push("/question/" + this.question.id);
    }
  }
};
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.column {
  display: flex;
  flex-direction: column;
}

.column.vote {
  align-items: center;
}
.question {
  justify-content: space-between;
}

.author {
  align-self: flex-end;
}

.buttons {
  margin: 1.5rem auto;
}
</style>

