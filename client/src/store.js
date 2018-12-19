import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    errormsg: '',
    token: '',
    userId: '',
    logIn: false,
    username: '',
    okmsg: ''
  },
  mutations: {
    errMutation(state, data){
      state.errormsg = data.msg
    },
    logInMutation(state, data){
      state.token = data.details.token,
      state.userId = data.details.userId,
      state.logIn = data.status,
      state.username = data.details.username
    },
    logOutMutation(state, data){
      state.logIn = data.status
    },
    okMsgMutation(state, data){
      state.okmsg = data.msg
    }
  },
  actions: {
    errmsg(context, data){
      context.commit('errMutation', data)
    },
    logIn(context, data){
      context.commit('logInMutation', data)
    },
    logOut(context, data){
      context.commit('logOutMutation', data)
    },
    okmsg(context, data){
      context.commit('okMsgMutation', data)
    }
  }
})
