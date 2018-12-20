<template>
  <div class="details">
    <question :question="question" @voted="getDetails"></question>
    <hr>
    <br>
    <h5>Answer</h5>
    <hr>
    <!-- <answer :answers="answers"></answer> -->
    <answer></answer>
  </div>
</template>

<script>
import question from '@/components/DetailQuestion/Question.vue'
import answer from '@/components/DetailQuestion/Answer.vue'
import api from '@/api/api.js'

export default {
  name: 'detailquestion',
  components: {
    question, answer
  },
  data(){
    return{
      question: {
        userId: {
          name: ''
        },
        voteUp: [],
        voteDown: []
      }
    }
  },
  created() {
    this.getDetails()
  },
  computed: {
    details(){
      let questionId = this.$route.params.questionId
      let question = this.$store.state.questions.filter(question => String(question._id) == String(questionId));
      console.log(question)
      return question[0]
    }
  },
  methods: {
    getDetails(){
      let questionId = this.$route.params.questionId
      api
          .get(`/question/${questionId}`)
          .then( question => {
            this.question = question.data.question
          })
          .catch( error => {
            console.log(error)
          })
    },
  }
}
</script>

<style>
.details{
  text-align: left;
}
.vote{
  text-align: center;
}
</style>

