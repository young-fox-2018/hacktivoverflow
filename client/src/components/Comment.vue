<template>
  <div class="container">
    <div class="columns comment">
      <div class="column is-2" id="fullname">
        {{eachAnswer.name}}:
      </div>
      <div class="column bubble me" id="answerContent">
        <div class="columns">
          <div class="column is-9">
            {{eachAnswer.answer}}
          </div>
          <div class="column">
            <span class="icon" v-bind:class="{ 'has-text-info': upvoted }" @click="upvoteAnswer(eachAnswer, answerId)">
              <i class="far fa-thumbs-up"></i>{{ getAnswerUpvotes(allQuestions) }}
            </span>
          </div>
          <div class="column">
            <span class="icon" v-bind:class="{ 'has-text-danger': downvoted }" @click="downvoteAnswer(eachAnswer, answerId)">
              <i class="far fa-thumbs-down"></i>{{ getAnswerDownvotes(allQuestions) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SuccessAlert from '@/components/SuccessAlert.vue';
import ErrorAlert from '@/components/ErrorAlert.vue';

export default {
  name: 'Comment',
  props: ['eachAnswer', 'answerId'],  
  data() {
    return {
      downvoted: false,
      upvoted: false,
      answerUpvotedTotal: 0,
      answerDownvotedTotal: 0,
    };
  },
  methods: {
    upvoteAnswer(answer, index) {
      if(answer.userId !== localStorage.current_user) {
        this.$store.dispatch('upvoteAnswer', {
          questionId: this.$route.params.id,
          answerId: index,
          userId: localStorage.current_user,
          name: localStorage.name,
        });        
      } else {
        this.$store.commit('setErrorMessage', 'Cannot upvote your own answer.');
      }
    },
    downvoteAnswer(answer, index) {
      if(answer.userId !== localStorage.current_user) {
        this.$store.dispatch('downvoteAnswer', {
          questionId: this.$route.params.id,
          answerId: index,
          userId: localStorage.current_user,
          name: localStorage.name,
        });
      } else {
        this.$store.commit('setErrorMessage', 'Cannot upvote your own answer.');
      }
    },
    getAnswerUpvotes(question) {
      let totalUpvoter = 0;
      if(question.thumbsup) {
        totalUpvoter = Object.values(question.thumbsup).length;
      }
      return totalUpvoter;
    },
    getAnswerDownvotes(question) {
      let totalDownvoter = 0;
      if(question.thumbsdown) {
        totalDownvoter = Object.values(question.thumbsdown).length;
      }
      return totalDownvoter;
    },
  },
  computed: {
    allQuestions: {
      get() {
        let particularAnswer = this.$store.state.allQuestions[this.$route.params.id].answers[this.answerId];
        if (particularAnswer.thumbsup && particularAnswer.thumbsup[localStorage.current_user]) {
          this.upvoted = true;
        } else {
          this.upvoted = false;
        }
        if (particularAnswer.thumbsdown && particularAnswer.thumbsdown[localStorage.current_user]) {
          this.downvoted = true;
        } else {
          this.downvoted = false;
        }
        return particularAnswer;
      }
    },
  },
};
</script>

<style scoped>
.column {
  align-items: center;
  align-content: center;
}
#fullname, #answerContent {
  /* border: 1px solid rgb(228, 228, 228); */
  border-radius: 5px;
  align-self: center;
  /* margin: 20px; */
}
.bubble{
    background-color: #F2F2F2;
    border-radius: 5px;
    box-shadow: 0 0 6px #B2B2B2;
    display: inline-block;
    padding: 10px 18px;
    position: relative;
    vertical-align: top;
}

.bubble::before {
    background-color: #F2F2F2;
    content: "\00a0";
    display: block;
    height: 16px;
    position: absolute;
    top: 11px;
    transform:             rotate( 29deg ) skew( -35deg );
        -moz-transform:    rotate( 29deg ) skew( -35deg );
        -ms-transform:     rotate( 29deg ) skew( -35deg );
        -o-transform:      rotate( 29deg ) skew( -35deg );
        -webkit-transform: rotate( 29deg ) skew( -35deg );
    width:  20px;
}
.comment {
  margin: .5rem;
}

.me {
    float: left;
    margin: 5px 45px 5px 20px;
}

.me::before {
    box-shadow: -2px 2px 2px 0 rgba( 178, 178, 178, .4 );
    left: -9px;
}
</style>
