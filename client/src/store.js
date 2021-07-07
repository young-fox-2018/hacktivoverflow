import Vue from 'vue';
import Vuex from 'vuex';
import database from '@/assets/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allQuestions: {},
    answers: {},
    questionUpvotes: {},
    questionDownvotes: {},
    answerUpvotes: {},
    answerDownvotes: {},
    errorMessage: '',
    successMessage: '',
    isLoggedIn: false,
  },
  mutations: {
    setUserLoggedIn(state, bool) {
      if (!bool) {
        localStorage.clear();
      }
      state.isLoggedIn = bool;
    },
    setSuccessMessage(state, msg) {
      state.successMessage = msg;
      setTimeout(() => {
        state.successMessage = '';
      }, 2000);
    },
    setErrorMessage(state, msg) {
      state.errorMessage = msg;
      setTimeout(() => {
        state.errorMessage = '';
      }, 2000);
    },
    storeAllDataMutations(state, payload) {
      state.allQuestions = payload || {};
    },
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
    },
  },
  actions: {
    upvoteQuestion(context, payload) {
      database.ref(`${payload.questionId}/thumbsdown/${payload.userId}`).once('value').then((snapshot) => {
        if (!snapshot.val()) {
          database.ref(`${payload.questionId}/thumbsup/${payload.userId}`).once('value').then((snapshot) => {
            if (!snapshot.val()) {
              database.ref(`${payload.questionId}/thumbsup/${payload.userId}`).set({
                name: payload.name,
              });
            } else {
              database.ref(`${payload.questionId}/thumbsup/${payload.userId}`).remove();
            }
          });
        } else {
          database.ref(`${payload.questionId}/thumbsdown/${payload.userId}`).remove();
        }
      });
    },
    downvoteQuestion(context, payload) {
      database.ref(`${payload.questionId}/thumbsup/${payload.userId}`).once('value').then((snapshot) => {
        if (!snapshot.val()) {
          database.ref(`${payload.questionId}/thumbsdown/${payload.userId}`).once('value').then((snapshot) => {
            if (!snapshot.val()) {
              database.ref(`${payload.questionId}/thumbsdown/${payload.userId}`).set({
                name: payload.name,
              });
            } else {
              database.ref(`${payload.questionId}/thumbsdown/${payload.userId}`).remove();
            }
          });
        } else {
          database.ref(`${payload.questionId}/thumbsup/${payload.userId}`).remove();
        }
      });
    },
    postAnswer(context, payload) {
      const newKey = database.ref(`${payload.questionId}/answers/`).push().key;
      database.ref(`${payload.questionId}/answers/${newKey}`).set({
        title: payload.questionTitle,
        answer: payload.answer,
        name: payload.name,
        userId: payload.userId,
      });
    },
    upvoteAnswer({ commit }, payload) {
      database.ref(`${payload.questionId}/answers/${payload.answerId}/thumbsdown/${payload.userId}`).once('value').then((snapshot) => {
        if (!snapshot.val()) {
          database.ref(`${payload.questionId}/answers/${payload.answerId}/thumbsup/${payload.userId}`).once('value').then((snapshot) => {
            if (!snapshot.val()) {
              database.ref(`${payload.questionId}/answers/${payload.answerId}/thumbsup/${payload.userId}`).set({
                name: payload.name,
              });
              commit('setSuccessMessage', 'Answer upvoted.');
            } else {
              commit('setSuccessMessage', 'Upvote removed.');
              database.ref(`${payload.questionId}/answers/${payload.answerId}/thumbsup/${payload.userId}`).remove();
            }
          });
        } else {
          commit('setSuccessMessage', 'Downvote removed.');
          database.ref(`${payload.questionId}/answers/${payload.answerId}/thumbsdown/${payload.userId}`).remove();
        }
      });
    },
    downvoteAnswer({ commit }, payload) {
      database.ref(`${payload.questionId}/answers/${payload.answerId}/thumbsup/${payload.userId}`).once('value').then((snapshot) => {
        if (!snapshot.val()) {
          database.ref(`${payload.questionId}/answers/${payload.answerId}/thumbsdown/${payload.userId}`).once('value').then((snapshot) => {
            if (!snapshot.val()) {
              database.ref(`${payload.questionId}/answers/${payload.answerId}/thumbsdown/${payload.userId}`).set({
                name: payload.name,
              });
              commit('setSuccessMessage', 'Answer downvoted.');
            } else {
              commit('setSuccessMessage', 'Downvote removed.');
              database.ref(`${payload.questionId}/answers/${payload.answerId}/thumbsdown/${payload.userId}`).remove();
            }
          });
        } else {
          commit('setSuccessMessage', 'Upvote removed.');
          database.ref(`${payload.questionId}/answers/${payload.answerId}/thumbsup/${payload.userId}`).remove();
        }
      });
    },
    getAllData({ commit }) {
      database.ref('/').on('value', (snapshot) => {
        commit('storeAllDataMutations', snapshot.val());
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
