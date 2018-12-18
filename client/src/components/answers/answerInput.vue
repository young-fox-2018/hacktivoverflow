<template>
  <div>
    <wysiwyg v-model="newAnswer"/>
    <button @click="sendAnswer" class="button is-primary is-rounded is-block">Send Answer</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { database } from "@/config";

export default {
  data() {
    return {
      newAnswer: ""
    };
  },

  computed: mapState({
    user: state => state.user
  }),

  methods: {
    sendAnswer() {
      if (this.user) {
        database
          .ref("/answers/" + this.$route.params.id)
          .push({
            user: {
              id: this.user.id,
              name: this.user.name
            },
            message: this.newAnswer
          })
          .then(() => {
            this.newAnswer = "";
          });
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

