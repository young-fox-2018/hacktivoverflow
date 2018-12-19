import Vue from 'vue'
import Vuex from 'vuex'

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
          url: `http://localhost:3000/questions`
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
          url: `http://localhost:3000/answers/${questionId}`
        })
        .then((answers) => {
          context.commit('getAnswerMut', answers.data)
        })
        .catch((err) => {
          console.log(err)
        })
      },
      getMyAllQuestion (context, token) {
        console.log(token)
        axios({
            method: `GET`,
            url: `http://localhost:3000/myquestion`,
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
