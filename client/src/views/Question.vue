<template>
  <div class="section">
    <h1 class="is-size-3 has-text-weight-semibold">Question:</h1>
    <question :question="question" />
    <hr>
    <h2 class="is-size-4 has-text-weight-semibold">Answers:</h2>
    <answer-input />
    <answer-list />
  </div>
</template>

<script>
import { database } from "@/config";
import question from "@/components/questions/question";
import answerInput from "@/components/answers/answerInput";
import answerList from "@/components/answers/answerList";

export default {
  components: {
    question,
    answerInput,
    answerList
  },

  data() {
    return {
      question: {},
    };
  },

  mounted() {
    database
      .ref("/questions/" + this.$route.params.id)
      .on("value", snapshot => {
        let question = snapshot.val();
        question.id = this.$route.params.id
        question.voteCount = Object.values(question.votes || {}).reduce(
          (a, b) => a + b,
          0
        );
        this.question = question
      });
  }
};
</script>

<style scoped>
h1, h2 {
  margin-bottom: 1rem;
}
</style>

