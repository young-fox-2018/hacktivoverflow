import Vue from 'vue'
import Vuex from 'vuex'
const localhost = `http://localhost:3000`
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userLogin: '',
    isLogin: false,
    questions: [],
    answers: [],
    myquestion: []
  },
  mutations: {
   getUserLoginMut (state, user) {
     console.log(user)
    state.userLogin = user
   },
   getUserLoginStatusMut (state, data) {
    state.isLogin = true
   },
   getUserLogoutMut (state, data) {
    state.isLogin = false
   },
   getQuestionMut (state, listQuestion) {
    state.questions = listQuestion
   },
   getAnswerMut(state, listAnswer){
    state.answers = listAnswer
   },
   getMyQuestion(state, listMyQuestion) {
     state.myquestion = listMyQuestion
   }
  },
  actions: {
      getUserLogin(context, user) {
        context.commit('getUserLoginMut', user)
      },
      actionUserLogIn (context, data) {
        context.commit('getUserLoginStatusMut')
      },
      actionUserLogOut (context, data) {
        context.commit('getUserLogoutMut')
      },
      getAllQuestionAction (context, listQuestions) {
        axios({
          method: `GET`,
          url: `${localhost}/questions`
        })
        .then((questions) => {
          context.commit('getQuestionMut', questions.data)
        })
        .catch((err) => {
          console.log(err)
        })
      },
      getAllAnswerAction (context, questionId) {
        axios({
          method: `GET`,
          url: `${localhost}/answers/${questionId}`
        })
        .then((answers) => {
          context.commit('getAnswerMut', answers.data)
        })
        .catch((err) => {
          console.log(err)
        })
      },
      getMyAllQuestion (context, token) {
        axios({
            method: `GET`,
            url: `${localhost}/myquestion`,
            headers: {
                token: token
            }
        })
        .then((questions) => {
            context.commit('getMyQuestion', questions.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
      
  }
})
