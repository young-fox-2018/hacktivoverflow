import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userLogin: "",
    questions: "",
    answers: "",
    Vote: 0
  },
  mutations: {
    userLoginM(state, user) {
      state.userLogin = user
    },
    getQuestionsM(state, questions) {
      state.questions = questions
    },
    getAnswerM(state, answer) {
      state.answers = answer
    }
  },
  actions: {
    userLogin({ commit }, user) {
      commit("userLoginM", user)
    },
    getQuestions({ commit }, questions) {

      axios({
        method: "get",
        url: "http://localhost:3000/questions"
      })
        .then(result => {
          commit("getQuestionsM", result.data)
        })
        .catch(err => { });
    },
    getAnswer({ commit }, id) {
      axios({
        method: "get",
        url: `http://localhost:3000/answers/${id}`,

      })
        .then(result => {
          commit("getAnswerM", result.data)
        })
        .catch(err => { });
    }
  }
})
