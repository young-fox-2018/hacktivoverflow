import Vue from 'vue'
import Vuex from 'vuex'
import request from '@/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pertanyaan : [],
    tanya : {},
    tags : [],
    tag : ''
  },
  mutations: {
    initializePertanyaan(state, payload){
      state.pertanyaan = payload
    },
    findById(state, payload){
      state.tanya = payload
    },
    initializeTags(state, payload){
      state.tags = payload
      state.tag =payload[0]
    },
    changeCurrentTag(state, payload){
      state.tag = payload
    }
  },
  actions: {
    initializePertanyaan({ commit },payload){
      request.get('/pertanyaan')
      .then( ({ data}) => {
        commit('initializePertanyaan', data)
      })
      .catch( error =>{
        console.log('error :', error)
      })
    },
    addJawaban({commit}, payload){
      return request.post('/jawaban',payload,{
          headers : {
              jtoken : localStorage.getItem('token')
          }
      })
    },
    updatePertanyaan({commit}, payload){
      return request.put(`/pertanyaan/${payload.id}`,payload.data,{
        headers : {
          jtoken : localStorage.getItem('token')
        }
      })
    },
    deletePertanyaan({commit, dispatch}, payload){
      request.delete(`/pertanyaan/${payload.id}`,{
        headers : {
          jtoken : localStorage.getItem('token')
        }
      })
      .then( reponse => {
        dispatch('initializePertanyaan')
      })
      .catch( error => {
        console.log('error :', error)
      })
    },
    deleteJawaban({ commit, dispatch }, payload){
      request.delete(`/jawaban/${payload.id}`,{
        headers : {
          jtoken : localStorage.getItem('token')
        }
      })
      .then( response => {
        dispatch('initializePertanyaan')
      })
      .catch( (error ) => {
        console.log('error :', error)
      }) 
    },
    updateJawaban({ commit, dispatch}, payload){
      return request.put(`/jawaban/${payload.id}`,payload.data,{
        headers : {
          jtoken : localStorage.getItem('token')
        }
      })
    },
    upvoteJawaban({commit, dispatch}, payload){
      request.put(`/jawaban/upvote/${payload.id}`,{},{
        headers : {
          jtoken : localStorage.getItem('token')
        }
      })
      .then( response => {
        dispatch('initializePertanyaan')
      })
      .catch( ({ response }) =>{
        console.log( response.data)
      })
    },
    downvoteJawaban({commit, dispatch}, payload){
      request.put(`/jawaban/downvote/${payload.id}`,{},{
        headers : {
          jtoken : localStorage.getItem('token')
        }
      })
      .then( response => {
        dispatch('initializePertanyaan')
      })
      .catch( ({ response }) =>{
        console.log( response.data)
      })
    },
    upvotePertanyaan({commit, dispatch}, payload){
      request.put(`/pertanyaan/upvote/${payload.id}`,{},{
        headers : {
          jtoken : localStorage.getItem('token')
        }
      })
      .then( response => {
        dispatch('initializePertanyaan')
      })
      .catch( ({ response }) =>{
        console.log( response.data)
      })
    },
    downvotePertanyaan({ commit, dispatch}, payload){
      request.put(`/pertanyaan/downvote/${payload.id}`,{},{
        headers : {
          jtoken : localStorage.getItem('token')
        }
      })
      .then( response => {
        dispatch('initializePertanyaan')
      })
      .catch( ({ response }) =>{
        console.log( response.data)
      })
    },
    initializeTags({commit, dispatch}){
      request.get('/pertanyaan/read-tag',{
        headers : {
          jtoken : localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        commit('initializeTags', data)
      })
      .catch(({ response }) => {
          console.log( response.data) 
      })
    },
    changeCurrentTag({ commit }, payload){
      commit('changeCurrentTag', payload)
    },
  }
})
