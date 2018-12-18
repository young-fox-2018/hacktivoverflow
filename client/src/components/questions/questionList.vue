<template>
  <div>
    <question v-for="question in questions" :key="question.id" :question="question" />
  </div>
</template>

<script>
import { database } from "@/config";
import question from "@/components/questions/question"

export default {
  components: {
    question
  },

  data() {
    return {
      questions: []
    };
  },

  mounted() {
    database.ref("/questions").on("value", snapshot => {
      let questions = snapshot.val();
      this.questions = Object.entries(questions || {})
        .map(e => Object.assign(e[1], { id: e[0] }))
        .map(question => {
          question.voteCount = Object.values(question.votes || {}).reduce(
            (a, b) => a + b,
            0
          );
          return question;
        })
        .reverse()
        .sort((a, b) => a.voteCount < b.voteCount);
    });
  }
};
</script>
