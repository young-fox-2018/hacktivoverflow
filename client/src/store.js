import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataUser: null,
    statusLogin: false,
    statusRegister: false,
    isLogin: false
  },
  mutations: {
    loginMutation (state, data) {
      if (localStorage.getItem('access_token')) {
        state.statusLogin = false
        state.isLogin = true
      } else {
        state.statusLogin = data
        if (!localStorage.getItem('access_token')) {
          setTimeout(() => {
            state.statusLogin = false
          }, 1500)
        }
      }
    },
    registerMutation (state, data) {
      state.statusRegister = data
      setTimeout(() => {
        state.statusRegister = false
      }, 1500)
    },
    dataUserMutation (state, data) {
      state.dataUser = data
    }
  },
  actions: {
    loginState (context, data) {
      context.commit('loginMutation', data)
    },
    registerState (context, data) {
      context.commit('registerMutation', data)
    },
    setDataUser (context, data) {
      context.commit('dataUserMutation', data)
    }
    // isLoginAct (context, data) {
    //   context.commit
    // }
  }
})
