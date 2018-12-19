import Vue from 'vue';
import Vuex from 'vuex';
import apiHacktiv from '@/config/api-hacktivoverflow.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        allQuestion: [],
        allTag: [],
        oneQuestion: {},
        userAktif: null,
    },
    mutations: {
        GET_ALL_QUESTION: (state, data) => {
            state.allQuestion = data;
        },
        GET_ONE_QUESTION: (state, data) => {
            state.oneQuestion = data;
        },
        GET_ALL_TAG: (state, data) => {
            state.allTag = data;
        },
        CHECK_TOKEN: (state, data) => {
            state.userAktif = data;
        },
    },
    actions: {
        getAllQuestion({ commit }) {
            return apiHacktiv.get(`/questions`)
                .then(result => {
                    commit('GET_ALL_QUESTION', result.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getOneQuestion({ commit }, questionId) {
            return apiHacktiv.get(`/questions/${questionId}`)
                .then(result => {
                    commit('GET_ONE_QUESTION', result.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getAllTag({ commit }) {
            return apiHacktiv.get(`/questions/all-tag`)
                .then(result => {
                    commit('GET_ALL_TAG', result.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        checkToken({ commit }) {
            apiHacktiv.get(
                `/users/check-token`,
                { headers: { token: localStorage.getItem('token-hacktiv') } }
            )
                .then(result => {
                    commit('CHECK_TOKEN', result.data);
                })
                .catch(error => {
                    commit('CHECK_TOKEN', null);
                    console.log(error.response.data)
                });
        },
    },
});