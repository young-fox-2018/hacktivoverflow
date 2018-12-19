import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    successMessage: '',
    success: false,
    tags: ['romance', 'technology', 'supernatural', 'movies', 'music', 'parrenting', 'mathematic']
  },
  mutations: {
    checkLog(state, data){
      state.isLoggedIn = data
    },
    successMessage(state,payload){
      state.successMessage = payload.message
      state.success = true
    }
  },
  actions: {
    checkLog(context,data){
      context.commit('checkLog', data)
    },
    successMessage(context, payload){
      context.commit('successMessage', payload)
    }
  }
})
