import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/hacktiv.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: '',
    answers: [],
    topUsers: [],
    isLogin: false
  },
  mutations: {
    commitLogin(state, payload) {
      state.isLogin = true
    },
    commitLogout(state) {
      state.isLogin = false
    },
    getQuestion(state, payload) {
      state.questions = payload
    },
    getAnswer(state, payload) {
      state.answers = payload
    },
    topUsers(state,payload){
      state.topUsers = payload
    }
  },
  actions: {
    login(context) {
      context.commit('commitLogin')
    },
    logout(context) {
      context.commit('commitLogout')
    },
    topUsers(context){
      api
        .get('/users/top')
        .then(data=> {
          if(data.data.length>= 5){
            context.commit('topUsers', data.data)
          } else {
            let sliced = data.data.slice(0,4)
            context.commit('topUsers', sliced)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getAnswer(context, data) {
      api
        .get(`/answers?questionId=${data.id}`)
        .then(answer => {
          context.commit('getAnswer', answer.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getQuestion(context) {
      api
        .get('/questions')
        .then(data => {
          context.commit('getQuestion', data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    searchQuestion(context, data) {
      api
        .get(data)
        .then(data => {
          context.commit('getQuestion', data.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
