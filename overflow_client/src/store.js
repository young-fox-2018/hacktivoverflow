import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
  },
  mutations: {
    isLoginStatus_Mutation(state, data) {
      state.isLogin = data;
    },
  },
  actions: {
    isLoginStatus(context, data) {
      context.commit('isLoginStatus_Mutation', data);
    }
  },
});
