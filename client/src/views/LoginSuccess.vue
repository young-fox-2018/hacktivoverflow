<template>
  <div class="home">
    <div class="row">
      <div class="col-lg-3">
      </div>  
      <div class="col-lg-6">
        <div v-for="(question, index) in questions" :key="index">
          <div class="list-card mt-2 mb-2">
            <div>
             <span class="title">{{question.title}}</span>
             <span class="float-right">Upvote {{upVote}}</span>
            </div>
            <p class="list-content"> {{question.content.substring(0, 80)}} </p>
            <router-link :to="{path: `${question._id}`}">(more)</router-link>
          </div>
       </div> 
      </div>
      <div class="col-lg-3">
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'home',
  components: {
  },
  mounted() {
    this.$store.dispatch('getAllQuestions')
  },
  computed: {
    ...mapState({
      questions: state => state.questions
    }),

    upVote() {
      this.questions.array.forEach(element => {
        
      });
    }
  }
}
</script>
<style>
  .list-card {
    border: 0 solid #dae1e7;
    box-shadow: 0 15px 30px 0 rgba(0,0,0,.11), 0 5px 15px 0 rgba(0,0,0,.08);
    min-height: 20vh;
    max-height: 30vh;
    padding: 15px !important;
  }

  .title {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 0;
  }

  .list-content {
    width: 100%;
    font-size: 16px;
    word-wrap: break-word;
  }
</style>
