import Vue from 'vue'
import Vuex from 'vuex'
import blogapi from './api/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    userId: '',
    email: '',
    questions: []
  },
  mutations: {
    mutIsLogin (state, payload) {
      state.isLogin = payload
    },
    mutUserId (state, payload) {
      state.userId = payload
    },
    mutEmail (state, payload) {
      state.email = payload
    },
    setQuestions (state, payload) {
      state.questions = payload
    }
  },
  actions: {
    checkToken (context) {
      let token = localStorage.getItem('token')
      let userId = localStorage.getItem('userId')
      let email = localStorage.getItem('email')

      if (token) {
        context.commit('mutIsLogin', true)
        context.commit('mutUserId', userId)
        context.commit('mutEmail', email)
      } else {
        context.commit('mutIsLogin', false)
        context.commit('mutUserId', '')
        context.commit('mutEmail', '')
      }
    },
    signOut (context, payload) {
      console.log('logging out...')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('email')

      context.dispatch('checkToken')
    },
    getQuestions ({ commit, dispatch }, payload) {
      blogapi.get('/questions')
        .then((result) => {
          let questions = result.data.reverse()
          commit('setQuestions', questions)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
})
