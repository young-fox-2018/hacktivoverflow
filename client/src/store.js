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
      console.log('kentut kuda', state.userInfo._id)
      console.log('bijii', payload)
      if (state.userInfo._id === payload.userId) {
        state.ownQuestion = true
      } else {
        state.ownQuestion = false
      }

      state.question = payload
    },

    addAnswersData(state, payload) {
      payload.forEach((element) => {

      })

      state.answers = payload
    }
  },
  actions: {
    getAllQuestionVotes({ commit }, payload) {
        firebase.database().ref(`/questions`).on('value', (snapshot, err) => {
          let result = payload.map(item => ({
            ...item,
            ...snapshot.child(item._id).val()
          }))

          result.forEach((element) => {
            if (element.votes) {
              let count = 0

              for (let i in element.votes) {
                count += element.votes[i].count
              }
              element.totalVotes = count
            }
          })

          commit('insertQuestions', result)
      })
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
              
              if (childNode.val().votes) {
                let votes = 0
                for (let i in childNode.val().votes) {
                  votes+= childNode.val().votes[i].count
                }

                obj.votes = votes
              }

              answers.push(obj)         
            })

            commit('addAnswersData', answers)
          }
      })
    },

    getAllQuestions({ commit }, payload) {
      return axios({
        method:'get',
        url:'/questions'
      })
    },

    getOneQuestion({ commit }, payload) {
      axios({
        method:'get',
        url:`/questions/${payload}`
      })
      .then(({ data: { question } }) => {
        console.log
        commit('insertQuestion', question)
      })
    },  

    checkToken({ commit }, payload) {
      return axios({
        method: 'get',
        url: '/users/check',
        headers: {
          token: payload
        }
      })
      // .then(({data: { user } }) => {
      //   commit('changeLoginState', true)
      //   commit('getUserInfo', user)

      // })
      // .catch((err) => {
      //   commit('changeLoginState', false)
      // })
    }
  }
})