<template>
  <div class="home">
    &nbsp;
      <div class="row border-bottom" >
        <div class="col-md-9">
          <h2 style="text-align: left;">Top Questions</h2>
        </div>
        <div class="col-md-3" v-if="loginStatus">
          <b-btn variant="primary" class="mb-1" @click="ask" style="float: right;">Ask new Question</b-btn>
        </div>
      </div>
      <br>
      &nbsp;
      <div class="card text-center">
        
        <card v-for="(q, index) in allQuestions" :key="index"
              :question="q"
              class="question-card">
        </card>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Card from '@/components/Card.vue'

import {mapState, mapActions} from 'vuex'

export default {
  name: 'home',
  data(){
    return {
      question:''
    }
  },
  components: {
    HelloWorld,
    Card
  },
  computed: {
    ...mapState(['allQuestions', 'loginStatus', 'token'])
  },
  created(){
    this.$store.dispatch('getQuestions')
  },
  methods: {
    submitQuestion(){
      axios({
        method: 'post',
        url: 'http://localhost:3000/questions',
        data: {
          body: this.question
        }, 
        headers: {
          token: this.token
        }
      })
        .then(response=>{
          this.$store.dispatch('getQuestions')
        })
        .catch(err=>{
          console.log(err.errors)
        })
    },
    ask(){
      this.$router.push('/ask')
    }
  }
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
#formQuestion{
  margin-top: 2%
}

.question-card{
  padding: 10px;
  border-bottom: 1px solid #e4e4e4;
}

#home {
  margin-bottom: 10px;
}
</style>
