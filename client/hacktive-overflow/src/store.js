import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/apis/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    questions: [],
    question: {},
    voteCount: ''
  },
  mutations: {
    setQuestions (state, payload) {
      state.questions = payload
    },
    setQuestionById (state, payload) {
      state.question = payload
    },
    setVoteCount (state, payload) {
      state.voteCount = payload
    }
  },
  actions: {
    getQuestionById (context, id) {
      axios
        .get(`/questions/${id}`)
        .then(response => {
          context.commit('setQuestionById', response.data.question)
        })
        .catch(err => {
          console.log('get error', err.response)
        })
    },
    getAllQuestion (context, input) {
      axios
        .get('/questions')
        .then(response => {
          response.data.questions.sort(function (a, b) {
            let keyA = a.vote
            let keyB = b.vote
            if (keyA > keyB) return -1
            if (keyA < keyB) return 1
            return 0
          })

          let filter = []
          if (input) {
            response.data.questions.forEach(elem => {
              console.log(elem)
              if ((elem.title.toLowerCase()).match(input.toLowerCase()) || (elem.question.toLowerCase()).match(input.toLowerCase()) || (elem.author.name.toLowerCase()).match(input.toLowerCase())) {
                filter.push(elem)
              }
            })
            context.commit('setQuestions', filter)
          } else {
            context.commit('setQuestions', response.data.questions)
          }
        })
        .catch(err => {
          console.log('get error', err.response)
        })
    },
    upvoteQuest (context, id) {
      axios({
        method: 'PUT',
        url: `/questions/upvote/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          context.dispatch(`getQuestionById`, id)
          context.commit('setVoteCount', response)
          this.$router.push(`/questions/${id}`)
        })
        .catch(err => {
          console.log('get error', err.response)
        })
    },
    downvoteQuest (context, id) {
      axios({
        method: 'PUT',
        url: `/downvote/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          context.dispatch(`getQuestionById`, id)
          context.commit('setVoteCount', response)
          this.$router.push(`/questions/${id}`)
        })
        .catch(err => {
          console.log('get error', err.response)
          this.$router.push('/forum')
        })
    }
  }
})
