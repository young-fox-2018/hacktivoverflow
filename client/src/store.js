import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/api.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: [],
    // answers: []
  },
  mutations: {
    getAllQuestion(state,data){
      state.questions = data
      console.log("get all data from DB" )
      console.log(data)
    },
  },
  actions: {
    getAllQuestion({commit}){
      api.get('/question')
      .then( questions => {
        commit('getAllQuestion', questions.data.questions)
      })
      .catch()
    },
  }
})
