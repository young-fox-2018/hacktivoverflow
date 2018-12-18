<template>
  <div>
    <answer v-for="answer in answers" :key="answer.id" :answer="answer" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { database } from "@/config";
import answer from "@/components/answers/answer"

export default {
  components: {
    answer
  },

  data() {
    return {
      answers: []
    };
  },

  mounted() {
    database.ref("/answers/" + this.$route.params.id).on("value", snapshot => {
      this.answers = Object.entries(snapshot.val() || {})
        .map(e => Object.assign(e[1], { id: e[0] }))
        .map(answer => {
          answer.voteCount = Object.values(answer.votes || {}).reduce(
            (a, b) => a + b,
            0
          );
          return answer;
        })
        .reverse()
        .sort((a, b) => a.voteCount < b.voteCount);
    });
  }
};
</script>
