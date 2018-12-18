<template>
  <div>
    <wysiwyg v-model="newQuestion"/>
    <button @click="addQuestion" class="button is-primary is-rounded is-block">Send Question</button>
  </div>
</template>

<script>
import { database } from "@/config";
import { mapState } from "vuex";

export default {
  data() {
    return {
      newQuestion: ""
    };
  },

  computed: mapState({
    user: state => state.user
  }),

  methods: {
    addQuestion() {
      if (this.user) {
        database
          .ref("/questions")
          .push({
            user: {
              id: this.user.id,
              name: this.user.name
            },
            message: this.newQuestion
          })
          .then(() => {
            this.newQuestion = "";
          })
          .catch(err => console.log(err.message));
      } else {
        alert(`Please login first`);
      }
    }
  }
};
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

button {
  margin: 1.5rem auto;
}
</style>

