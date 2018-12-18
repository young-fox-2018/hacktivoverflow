import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    current_user: {
      token: '',
      name: '',
      userId: '',
    },

  },
  mutations: {
    saveUserData(state, payload) {
      // state.current_user.token = payload.token;
      // state.current_user.name = payload.name;
      // state.current_user.userId = payload.userId;
    },
  },
  actions: {
    userData({ commit }, payload) {
      commit('saveUserData', payload);
    },
  },
});
