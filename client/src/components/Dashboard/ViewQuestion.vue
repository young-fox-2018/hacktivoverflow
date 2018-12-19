<template>
  <div class="content">
      <div class="title row">
      <div class="col-1">
        <div v-if="questionUpVote >= questionDownVote">
          <font-awesome-icon icon="smile" style="font-size:40px; color:green"/>
          {{questionUpVote}}
        </div>
        <div v-else>
          <font-awesome-icon icon="sad-tear" style="font-size:40px;color:maroon"/>
          -{{questionDownVote}}
        </div>
      </div>
      <div class="col-11">
        <h1>{{questionList.title}}</h1>
        <p class="subtitle">
          <font-awesome-icon icon="user"/> {{questionList.op.name}}
          &nbsp;
          <font-awesome-icon icon="calendar-alt"/> {{questionList.createdDate}}</p>
        </div>
    </div>
    <div class="separator"></div>
    <div class="question" v-html="questionList.description"></div>
    <div class="separator"></div>
    <h3>Answers</h3>
    
    <div class="title row answer" v-for="(answer,index) in questionList.answers" :key="index">
      <div class="col-1">
        <div v-if="answerUpVote >= answerDownVote">
          <font-awesome-icon icon="smile" style="font-size:40px; color:green"/>
          {{answerUpVote}}
        </div>
        <div v-else>
          <font-awesome-icon icon="sad-tear" style="font-size:40px;color:maroon"/>
          -{{answerDownVote}}
        </div>
      </div>
      <div class="col-11">
        <h3>{{answer.title}}</h3>
        <p class="subtitle">
          <font-awesome-icon icon="user"/> {{answer.poster.name}}
          &nbsp;
          <font-awesome-icon icon="calendar-alt"/> {{answer.createdDate}}</p>
        </div>
        <p v-html="answer.description"></p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Error from '@/components/Error.vue';

export default {
  name: "view_Question",
  props: [],
  components: {
    Error
  },
  data() {
    return {
      error_status: false,
      error_msg: "",
      questionList: [],
      questionUpVote: 0,
      questionDownVote: 0,
      answerUpVote: 0,
      answerDownVote: 0
    };
  },
  methods: {
      
  },
  beforeCreate: function() {
    
  },
  mounted: function() {
    axios({
      method: "get",
      url: "https://xavier-ho-server.thenile.online/ho/questions",
    })
      .then(response => {
        console.log(response.data.data)
        response.data.data.forEach(datum => {
            if(datum._id == this.$route.params.questionId) {
                this.questionList = datum
                // this.$store.dispatch('viewedQuestion_Action', datum)
            }
        });
        this.questionUpVote = this.$store.state.questionUpVote
        this.questionDownVote = this.$store.state.questionDownVote
        this.answerUpVote = this.$store.state.answerUpVote
        this.answerDownVote = this.$store.state.answerDownVote

      })
      .catch(err => {
        console.log(err);
      });
  },
};
</script>

<style>
.content {
  margin: 10px;
}
.title, .question {
  text-align: left;
  margin-left: 20px;
  margin-bottom: 20px
}
.separator {
  border: 1px solid lightgray;
  margin: 10px
}
.votes {
  text-align: left;
  margin-left: 20px
}
.answer {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid lightseagreen;
}


</style>
