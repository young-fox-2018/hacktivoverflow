import Vue from 'vue';
import Vuex from 'vuex';
import database from '@/assets/config.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    answers: {},
    questionUpvotes: {},
    questionDownvotes: {},
    answerUpvotes: {},
    answerDownvotes: {},
  },
  mutations: {
    saveAnswersMutations(state, payload) {
      state.answers = payload || {};
    },
    saveQuestionUpvotesMutations(state, payload) {
      state.questionUpvotes = payload || {};
    },
    saveQuestionDownvotesMutations(state, payload) {
      state.questionDownvotes = payload || {};
    },
    saveAnswerUpvotesMutations(state, payload) {
      state.answerUpvotes = payload || {};
    },
    saveAnswerDownvotesMutations(state, payload) {
      state.answerDownvotes = payload || {};
    }
  },
  actions: {
    postAnswer({ commit }, payload) {
      database.ref(`/answers/${payload.questionId}`).push({
        answer: payload.answer,
        userId: payload.userId,
      });
    },
    upvoteQuestion({ commit }, payload) {
      database.ref(`/upvoteQuestions/${payload.questionId}`).once('value').then((snapshot) => {
        // console.log(snapshot.val(), 'upvotes=========');
        if (!snapshot.val()) {
          database.ref(`/upvoteQuestions/${payload.questionId}/${payload.userId}`).push(`${payload.name}`);
        } else {
          database.ref(`/upvoteQuestions/${payload.questionId}/${payload.userId}`).remove();
        }
      });
    },
    downvoteQuestion({ commit }, payload) {
      database.ref(`/downvoteQuestions/${payload.questionId}`).once('value').then((snapshot) => {
        if (!snapshot.val()) {
          database.ref(`/downvoteQuestions/${payload.questionId}/${payload.userId}`).push(`${payload.name}`);
        } else {
          database.ref(`/downvoteQuestions/${payload.questionId}/${payload.userId}`).remove();
        }
      });
    },
    getAllAnswers({ commit }, payload) {
      commit('saveAnswersMutations', payload);
    },
    getQuestionUpvotes({ commit }, payload) {
      commit('saveQuestionUpvotesMutations', payload);
    },
    getQuestionDownvotes({ commit }, payload) {
      commit('saveQuestionDownvotesMutations', payload);
    },
    getAnswerUpvotes({ commit }, payload) {
      commit('saveAnswerUpvotesMutations', payload);
    },
    getAnswerDownvotes({ commit }, payload) {
      commit('saveAnswerDownvotesMutations', payload);
    },
  },
});
