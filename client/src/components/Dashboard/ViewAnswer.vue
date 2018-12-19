<template>
  <div v-if="loading">
    <img src="../../assets/loading.gif" alt="loading">
  </div>
  <div v-else class="content">
    <div class="title row answer">
       <div class="col-1">
        <div v-if="countVote(currentAnswer, 1) >= countVote(currentAnswer, -1)">
          <font-awesome-icon icon="smile" style="font-size:40px; color:green"/>
          {{countVote(currentAnswer, 1) - countVote(currentAnswer, -1)}}
        </div>
        <div v-else>
          <font-awesome-icon icon="sad-tear" style="font-size:40px;color:maroon"/>
          -{{countVote(currentAnswer, -1) - countVote(currentAnswer, 1)}}
        </div>
      </div>
      <div class="col-11">
        <h3>{{currentAnswer.title}}</h3>
        <p class="subtitle">
          <font-awesome-icon icon="user"/> {{currentAnswer.poster.name}}
          &nbsp;
          <font-awesome-icon icon="calendar-alt"/> {{currentAnswer.createdDate}}</p>
        </div>
        <p v-html="currentAnswer.description"></p>
        <div class="votes">
          <font-awesome-icon icon="thumbs-up" style="color:green"/>
          {{countVote(currentAnswer, 1)}}
          &nbsp;
          <font-awesome-icon icon="thumbs-down" style="color:maroon"/>
          {{countVote(currentAnswer, -1)}}
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Error from '@/components/Error.vue';
import {mapState} from 'vuex'

export default {
  name: "view_Anwser",
  props: [],
  components: {
    Error
  },
  data() {
    return {
      error_status: false,
      error_msg: "",
      currentAnswer: {},
      loading: true
    };
  },
  methods: {
    countVote(data, sign) {
      // filter semua data nya yang sign === sign (-1, 1)
      let filter = data.votes.filter((datum) => datum.vote == sign) 
      return filter.length
    },
    getCurrentAnswer() {
      this.loading = true
      axios({
        method: "GET",
        url: "https://xavier-ho-server.thenile.online/ho/answers"
      })
      .then(response => {
        response.data.data.forEach(element => {
          if(element._id == this.$route.params.answerId) {
            this.currentAnswer = element
          }
        })
        this.loading = false
      })
      .catch(err => {
        console.log(err.response)
      })
    }
  },
  created: function() {
    this.getCurrentAnswer()
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
