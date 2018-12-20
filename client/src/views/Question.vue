<template>
  <!-- <askquestion></askquestion> -->
  <div>
    <router-view/>
  </div>
</template>

<script>
import askquestion from '@/components/Question/AskQuestion.vue'

export default {
  name: 'question',
  components:{
    askquestion
  }
}
</script>


