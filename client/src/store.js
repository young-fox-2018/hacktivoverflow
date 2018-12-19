import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/api/hacktivOverflow-api.js'
import Toasted from 'vue-toasted';

Vue.use(Vuex)
Vue.use(Toasted)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    email: "",
    questions: [],
    tags: [],
    answers: [],
    popularUsers: []
  },
  mutations: {
    setLoginStatus: function(state, status) { 
      state.isLoggedIn = status
    },
    setEmail: function(state, payload) {
      state.email = payload
    },
    setQuestions: function(state, payload) {
      state.questions = payload
    },
    setTags: function(state, payload) {
      state.tags = payload
    },
    setAnswers: function(state, payload) {
      state.answers = payload
    },
    setPopularUsers: function(state, payload) {
      state.popularUsers = payload
    }
  },
  actions: {
    checkToken: function ({ commit }) { 
      let accesstoken = localStorage.getItem('accesstoken')
      let email = localStorage.getItem('email')
      if (accesstoken) {
        commit('setLoginStatus', true)
        commit('setEmail', email)
      }
      else {
        commit('setLoginStatus', false)
        commit('setEmail', null)
      }
    },

    getQuestions: function({ commit }) {
      axios({
        method: 'GET',
        url: 'questions'
      })
      .then( response => {
        commit('setQuestions', response.data.questions)
      })
      .catch( err => {
        console.log(err.response);
      })
    },

    getTags: function({ commit }) {
      axios({
        method: 'GET',
        url: 'tags'
      })
      .then( response => {
        commit('setTags', response.data.tags)
      })
      .catch( err => {
        console.log(err.response);
      })
    },

    getAnswers: function({ commit }, payload ) {
      axios({
        method: 'GET',
        url: `answers/${payload}`
      })
      .then( response => {
        commit('setAnswers', response.data.answers)
      })
      .catch( err => {
        console.log(err.response);
      })
    },

    getQuestionsByTag: function({ commit }, payload) {
      axios({
          method: 'GET',
          url: `questions/filter/${payload}`
      })
      .then( response => {
          commit('setQuestions', response.data.questions)
      })
      .catch( err => {
          console.log(err.response);
      })
    },

    upvote: function({ commit, dispatch }, payload) {
      axios({
        method: 'PATCH',
        url: `questions/${payload.questionID}/upvote`,
        headers: {
          accesstoken: localStorage.getItem('accesstoken')
        }
      })
      .then( response => {
        dispatch(payload.getData, payload.tagID)
        dispatch('getPopularUsers') 
      })
      .catch( err => {
        Vue.toasted.error(
          `${err.response.data.message}`, 
          { 
            theme: "outline", 
            position: "top-right", 
            duration : 5000
          }
        )
      })
    },

    downvote: function({ commit, dispatch }, payload) {
      axios({
        method: 'PATCH',
        url: `questions/${payload.questionID}/downvote`,
        headers: {
          accesstoken: localStorage.getItem('accesstoken')
        }
      })
      .then( response => {
        // console.log(response.data);
        dispatch(payload.getData, payload.tagID) 
        dispatch('getPopularUsers') 
      })
      .catch( err => {
          // console.log(err.response.data.message);
          Vue.toasted.error(
            `${err.response.data.message}`, 
            { 
              theme: "outline", 
              position: "top-right", 
              duration : 5000
            }
          )
      })
    },

    getPopularUsers: function({ commit, dispatch }, payload) {
      axios({
        method: 'GET',
        url: `users/topUsers`
      })
      .then( response => {
        // console.log(response.data.users);
        commit('setPopularUsers', response.data.users)
      })
      .catch( err => {
        console.log(err.response);
      })
    }
  },

})
