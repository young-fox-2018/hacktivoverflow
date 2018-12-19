import Vue from 'vue'
import Vuex from 'vuex'
import api from '../src/assets/api-server'
import Swal from 'vue-sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    loginStatus: localStorage.getItem('token') ? true : false,
    name: localStorage.getItem('name'),
    showAlert: false,
    alertMessage: '',
    varAlert: '', 
    alert: {
      text: '',
      type: '',
      title: ''
    },
    allQuestions: [],
    userLoggedIn: {
      name: '',
      id: ''
    },
    currentQuestion: {
      upVoters: [], 
      downVoters: [], 
      authors: {
        name: '', 
        _id: ''
      },
      answers: [{
        author: {
          name: '', 
          _id: ''
        }, 
        upVoters: [], 
        downVoters: []
      }]
    }
  },
  mutations: {
    changeLogin : (state, payload) => {
      state.loginStatus = payload
    },
    toLogin: (state, data)=>{
      state.loginStatus = true
      state.alert = {
        title: 'Welcome back',
        type: 'success',
        text: 'continue your work'
      }
      state.token = data.token
    },
    toAlert: (state, data)=>{
      state.alert = {
        text: data.text,
        type: data.type,
        title: data.title
      }
    },
    toMustLogin: (state)=>{
      state.showAlert = true
      state.alert.text = 'Registered Success, please login to continue!'
      state.alert.type = 'success'
    },
    setQuestions: (state, data)=>{
      state.allQuestions = data
    },
    userLoggedInMutation: (state, data)=>{
      state.userLoggedIn.name = data.name
      state.userLoggedIn.id = data.id
    },
    statusLoginFalse: (state)=>{
      state.loginStatus = false
    }, 
    newQuestion: (state, payload)=>{
      state.allQuestions.push(payload)
    }, 
    getQuestionMutation: (state, payload)=> {
      state.currentQuestion = payload
    }
  },
  actions: {
    login({commit}, payload){
      api.post('/login', {
        email: payload.email,
        password: payload.password
      })
        .then(response=>{
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('name', response.data.name)
          commit('toLogin', response.data)
        })
        .catch(err=>{
          commit('toAlert', {title: 'Oops something wrong!', text: err.message, type: 'warning'})
        })
    },
    register({commit}, payload){
      axios({
        method: 'post',
        url: 'http://localhost:3000/register',
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password
        }
      })
        .then(response=>{
          if(response.status === 201){
            commit('toMustLogin')
          } else {
            console.log(response)
          }
        })
        .catch(err=>{
          console.log(err)
        })
    }, 
    getQuestions({commit}){
      api.get('/questions')
        .then(payload=>{
          commit('setQuestions', payload.data)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    changeLogin ({commit}, payload){
      console.log('login has changed true')
      commit('changeLogin', payload)
    },
    isLogin({commit}){
      api.get('/check-login', {headers: {token: localStorage.token}})
      .then(response=> {
        commit('userLoggedInMutation', response.data)
      })
      .catch(err=>{
        commit('statusLoginFalse')
      })
    },
    ask({commit}, payload){
      commit('newQuestion', payload)
    }, 
    getQuestion({commit}, payload){
      
      api.get(`/questions/${payload}`, {headers: {token: localStorage.token}})
        .then(({data})=> {
          commit('getQuestionMutation', data)
        })
        .catch(({response})=> {
          console.log(response)
        })
    }
  }
})
