import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/helpers/axios.js'
import { stat } from 'fs';
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    message: '',
    countDownTime: 0,
    type: '',
    questions: [],
    question: {},
    userInfo: {},
    ownQuestion: false,
    answers: [],
    ownAnswer: false
  },
  mutations: {
    showAlert(state, payload) {
      state.message = payload.message
      state.countDownTime = payload.countDownTime
      state.type = payload.type
    },

    getUserInfo(state, payload) {
      state.userInfo = payload
    },
    dismissCountDown(state, payload) {
      state.countDownTime = payload
    },

    changeLoginState(state, payload) {
      state.isLogin = payload
    },

    insertQuestions(state, payload) {
      state.questions = payload
    },

    insertQuestion(state, payload) {
      console.log(state.userInfo, 'biji kuda')
      if (state.userInfo._id === payload.userId) {
        state.ownQuestion = true
        console.log('masuk sini')
      } else {
        console.log(state.userInfo._id, payload.userId)
        state.ownQuestion = false
      }

      state.question = payload
    },

    addAnswersData(state, payload) {
      state.answers = payload
    },

    showVotes(state, payload) {

    }
  },
  actions: {
    getVotes({ commit }, payload) {
      
    },
    getAnswers({ commit }, payload) {
      firebase.database().ref(`/questions/${payload}/answers`).on('value',(snapshot, err) => {
          if (!err) {
            let answers = []
            snapshot.forEach((childNode) => {
              let obj = {}
              obj.answerId = childNode.key
              obj.userId = childNode.val().userId
              obj.answer = childNode.val().answer
              obj.author = childNode.val().author

              answers.push(obj)         
            })

            commit('addAnswersData', answers)
          }
      })
    },

    getAllQuestions({ commit }, payload) {
      console.log('sini ga')
      axios({
        method:'get',
        url:'/questions'
      })
      .then(({ data: { questions } }) => {
        commit('insertQuestions', questions)
      })
      .catch(({response:{data: {err}}}) => {
        console.log(err)
        commit('showAlert', {
          message: 'Please try again later',
          countDownTime: 3,
          type: 'danger'
        })
      })
    },

    getOneQuestion({ commit }, payload) {
      axios({
        method:'get',
        url:`/questions/${payload}`
      })
      .then(({ data: { question } }) => {
        commit('insertQuestion', question)
      })
    },  

    checkToken({ commit }, payload) {
      axios({
        method: 'get',
        url: '/users/check',
        headers: {
          token: payload
        }
      })
      .then(({data: { user } }) => {
        commit('changeLoginState', true)
        commit('getUserInfo', user)
      })
      .catch((err) => {
        commit('changeLoginState', false)
      })
    }
  }
})
