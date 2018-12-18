<template>
  <div>
    <question-input/>
    <question-list/>
  </div>
</template>

<script>
import { mapState } from "vuex";

import questionInput from "@/components/questions/questionInput";
import questionList from "@/components/questions/questionList";

export default {
  components: {
    questionInput,
    questionList
  },

  computed: mapState({
    user: state => state.user
  })
};
</script>

