import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import api from '@/api/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin : false,
    registerSuccessAlert : false,
    questionList : [],
    myPostList : [],
    topUserList: [],
    tags: []
  },
  mutations: {
    openRegisterSuccessAlert(state) {
      state.registerSuccessAlert = true
    },
    changeLoginTrue(state) {
      state.isLogin = true
      state.registerSuccessAlert = false
    },
    changeLoginFalse(state) {
      state.isLogin = false
    },
    setQuestionList(state, payload) {  
      state.questionList = payload
    },
    setTopUser(state, payload) {
      state.topUserList = payload
    },
    setMyPostList(state, payload) {
      state.myPostList = payload
    },
    setTag(state, payload) {
      state.tags = payload
    }
  },
  actions: {
    registerUser ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        api({
          method: 'POST',
          url: 'users',
          data : {
            name : payload.name,
            email : payload.email,
            password : payload.password
          }
        })
        .then(data => {
          commit('openRegisterSuccessAlert')
          resolve()
        })
        .catch(err => {
          reject()
        })
      })
    },
    registerSuccess ({commit}) {
      commit('openRegisterSuccessAlert')
    },
    logoutUser ({commit}) {
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      commit('changeLoginFalse')
    },
    isLogged ({commit}) {
      commit('changeLoginTrue')
    },
    loginUser ({commit}, payload) {
      return new Promise((resolve, reject) => {
        api({
          method: 'POST',
          url: 'users/login',
          data : {
            email : payload.email,
            password : payload.password
          }
        })
        .then(data => {
          localStorage.setItem('token', data.data.token)
          localStorage.setItem('name', data.data.name)
          commit('changeLoginTrue')
          resolve()
        })
        .catch(err => {
          reject()
        })
      })
    },
    createQuestion({dispatch, commit}, payload) {
      return new Promise ((resolve, reject) => {
        api({
         method: 'POST',
         url: 'questions',
         headers: {
           token : localStorage.getItem('token')
         },
         data: payload
       })
       .then(data => {
         dispatch('getQuestion')
         dispatch('getMyPost')
         console.log('created')
         resolve()
       })
       .catch(err => {
         console.log('coba dulu')
         reject()
       })
      })
    },
    getQuestion({commit}) {
      api({
        method: 'GET',
        url: 'questions',
      })
      .then(question => {
        commit('setQuestionList', (question.data).reverse())
      })
      .catch(err => {
        console.log('disini')
      })
    },
    getPopulerUser({ commit }) {
      api({
        method: 'GET',
        url: 'users/topuser'
      })
      .then(({ data }) => {
        commit('setTopUser', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getMyPost({commit}) {
      api({
        method: 'GET',
        url: 'questions/mypost',
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(question => {
        commit('setMyPostList', (question.data).reverse())
      })
      .catch(err => {
        console.log(err)
      })
      console.log('dari sini')
    },
    getAllTags({commit}) {
      return api({
        method: 'GET',
        url: 'questions/tag'
      })
      .then(({ data }) => {
        commit('setTag', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getFilteredPost({commit}, tag) {
      api({
        method: 'GET',
        url: `questions/tag/${tag}`
      })
      .then(({ data }) => {
        commit('setQuestionList', data.reverse())
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
})
