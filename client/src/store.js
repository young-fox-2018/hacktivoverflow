import Vue from 'vue'
import Vuex from 'vuex'
import myApi from '@/api/myApi'
import router from './router'
// import { stat } from 'fs';

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    isLogin: '',
    questionList: [],
    myQuestionList: []
  },
  mutations: {

  },
  actions: {
    checkLogin ({ state, dispatch }) {
      let token = localStorage.token
      if (token) {
        myApi({
          method: 'get',
          url: '/verify',
          headers: {
            auth: token
          }
        })
          .then(({ data }) => {
            // console.log(data)
            state.isLogin = data._id
            localStorage.name = data.name
            localStorage.email = data.email
            dispatch('readMyQuestion')
          }).catch((err) => {
            state.isLogin = ''
            console.log(err.response.data.message)
          })
      } else {
        state.isLogin = ''
      }

      // console.log(token)
    },
    logoutSend ({ state, dispatch }) {
      localStorage.clear()
      state.isLogin = ''
      dispatch('checkLogin')
    },
    readAllQuestion ({ state }) {
      myApi({
        method: 'get',
        url: '/question'
      })
        .then(({ data }) => {
          state.questionList = data
        }).catch((err) => {
          console.log(err.response.data.message)
        })
    },
    readMyQuestion ({ state }) {
      myApi({
        method: 'get',
        url: '/question/my',
        headers: {
          auth: localStorage.token
        }
      })
        .then(({ data }) => {
          state.myQuestionList = data
        }).catch((err) => {
          console.log(err.response.data.message)
        })
    },
    searchQuestion ({ state }, payload) {
      console.log(payload, 'dari action')
      myApi({
        method: 'get',
        url: 'question/search?q=' + payload
      })
        .then(({ data }) => {
          state.questionList = data
          router.push('/')
        }).catch((err) => {
          console.log(err)
          console.log(err.response.data.message)
        })
    }
  }
})
