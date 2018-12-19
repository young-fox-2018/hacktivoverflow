import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/api/server.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    userProfile: {},
    allQuestions: [],
    questionDetail: {
      user: {
        name:''
      },
      upvote: [],
      downvote: [],
      answers: []
    },
    answers: [{
      user: {
        name:''
      },
      upvote: [],
      downvote: []
    }],
    recentPost: [],
  },
  mutations: {
    mutationUserLoggedIn(state, payloads) {
      state.isLogin = true
    },
    mutationUserLoggedOut(state, payloads) {
      state.isLogin = false
    },
    mutationAllQuestion(state, payloads) {
      state.allQuestions = payloads
      state.recentPost = payloads.slice(0, 10)
    },
    mutationQuestion(state, payloads) {
      state.questionDetail = payloads
    },
    mutationUserProfile(state, payloads) {
      state.userProfile = payloads
    },
    mutationGetAnswers(state, payloads) {
      state.answers = payloads
    }
  },
  actions: {
    actionUserLoggedIn(context, payloads) {
      context.commit('mutationUserLoggedIn')
    },
    actionUserLoggedOut(context, payloads) {
      context.commit('mutationUserLoggedOut')
    },
    actionAllQuestion(context, payloads) {
      return db.request({
          url: 'questions',
          method: "GET"
      })
      .then(({data}) => {
          context.commit('mutationAllQuestion', data)
      })
      .catch(error => {
          console.log(error)
      })
    },
    actionQuestion(context, payloads) {
      return db.request({
        url: `questions/${payloads}`,
        method: 'GET'
      })
      .then(({data}) => {
        context.commit('mutationQuestion', data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    actionUserProfile(context, payloads) {
      return db.request({
        url: 'users',
        methods: 'GET',
        headers: {
          token: payloads
        }
      })
      .then(({data}) => {
        context.commit('mutationUserProfile', data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    actionGetAnswers(context, payloads) {
      return db.request({
        url: `answers/${payloads}`,
        method: 'GET',
      })
      .then(({data}) => {
        context.commit('mutationGetAnswers', data)
      })
      .catch(error => {
        console.log(error)
      })
    },
  }
})
