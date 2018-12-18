<template>
  <div v-if="!edit" class="box">
    <div class="columns">
      <div class="column is-1 vote">
        <span @click="voteAnswer(1)" class="icon">
          <i class="far fa-thumbs-up"></i>
        </span>
        <span>{{ answer.voteCount }}</span>
        <span @click="voteAnswer(-1)" class="icon">
          <i class="far fa-thumbs-down"></i>
        </span>
      </div>
      <div class="column answer">
        <div v-html="answer.message"></div>
        <div class="level">
          <div class="level-left"></div>
          <div class="level-right">
            <div v-if="user && answer.user" class="author">
              <div v-if="answer.user.id === user.id">
                <span @click="edit=true" class="icon">
                  <i class="fas fa-edit"></i>
                </span>
              </div>
              <span v-else>{{answer.user.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <wysiwyg v-model="answer.message"/>
    <div class="buttons is-centered">
      <span @click="updateAnswer" class="button is-primary is-rounded">Update</span>
      <!-- <span @click="edit=false" class="button is-primary is-outlined is-rounded">Cancel</span> -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { database } from "@/config";

export default {
  props: ["answer"],

  data() {
    return {
      edit: false
    };
  },

  computed: mapState({
    user: state => state.user
  }),

  methods: {
    voteAnswer(by) {
      if (this.user) {
        if (this.user.id !== this.answer.user.id) {
          database
            .ref(`/answers/${this.$route.params.id}/${this.answer.id}/votes/${this.user.id}`)
            .transaction(vote => {
              if (vote && vote + by >= -1 && vote + by <= 1) {
                vote = vote + by || null;
              } else {
                vote = by;
              }
              return vote;
            });
        } else {
          alert(`Sorry, you can't vote your own answer`);
        }
      } else {
        alert(`Please login first`);
      }
    },

    updateAnswer() {
      database
        .ref(`/answers/${this.$route.params.id}/${this.answer.id}`)
        .update({
          message: this.answer.message
        })
        .then(() => {
          this.edit = false;
        })
        .catch(err => alert(err.message));
    },
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
.answer {
  justify-content: space-between;
}

.author {
  align-self: flex-end;
}

.buttons {
  margin: 1.5rem auto;
}
</style>

