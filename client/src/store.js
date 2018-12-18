import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error_status: false,
    error_msg: "",
    questionList: [],
    viewedQuestion: {},
    // questionUpVote: 0,
    // questionDownVote: 0,
    // answerUpVote: 0,
    // answerDownVote: 0,
    decoded: {},
    answersList: [],
    currentUserAnswerList: [],
    top5Users: [],
    tagsList: [],
    loading: false,
    isLoggedin: false
  },
  mutations: {
    storeQuestions_Mutate(state, data) {
      state.questionList = data
      state.loading = false

    },
    // viewedQuestion_Mutate(state, data) {
    //   state.questionUpVote = 0
    //   state.questionDownVote = 0
    //   data.votes.forEach(vote => {
    //     if (vote.vote == 1) {
    //       state.questionUpVote += 1
    //     } else if (vote.vote == -1) {
    //       state.questionDownVote += 1
    //     }
    //   });
    //   state.viewedQuestion = data
    // },
    decode_Mutate(state, data) {
      state.decoded = data
    },
    removeQuestion_Mutate(state, data) {
      let newArray = state.questionList.filter(list => String(list._id) != data._id)
      state.questionList = newArray
    },
    getAllAnswers_Mutata(state, data) {
      state.answersList = data
      state.currentUserAnswerList = []
      data.forEach(element => {
        if(element.poster._id == state.decoded._id){
          state.currentUserAnswerList.push(element)
        }
      });
    },
    resetError_Mutate(state) {
      state.error_status = false
    },
    updatePopularUser(state, data) {
      state.top5Users = data
    },
    getAllTags(state, tags) {
      state.tagsList = tags
    },
    changeLogStatus(state, data) {
      state.isLoggedin = data
    }
  },
  actions: {
    storeQuestions_Action({commit, state}) {
      state.loading = true
      return axios({
        method: "get",
        url: "http://localhost:3000/ho/question",
        })
        .then(response => {
          commit('storeQuestions_Mutate', response.data.data)
        })
        .catch(err => {
            console.log(err);
        });
    },
    // viewedQuestion_Action(context, data) {
    //   context.commit('viewedQuestion_Mutate', data)
    // },
    
    decode(context) {
      let token = localStorage.getItem("token");
      axios({
        method: "post",
        url: "http://localhost:3000/ho/decode",
        headers: { token: token }
      })
        .then(response => {
          context.commit('decode_Mutate', response.data.data)
        })
        .catch(err => {
          console.log(err);
        });
    },
    removeQuestion_Action(context, data) {
      let token = localStorage.getItem("token");
      return axios({
        method: "delete",
        url: "http://localhost:3000/ho/question/delete",
        headers: { token: token },
        data: data
      })
        .then(response => {
          context.commit('removeQuestion_Mutate', response.data.data)
        })
        .catch(err => {
          console.log(err);
        });
    },
    addQuestion_Action({context,dispatch,state}, data) {
      let token = localStorage.getItem("token");
      axios({
        method: "post",
        url: "http://localhost:3000/ho/question/add",
        headers: { token: token },
        data: data
      })
      .then((response) => {
        dispatch('storeQuestions_Action')
        state.error_status = false
      })
      .catch(err => {
        console.log(err.response);
        Swal({
          title: err.response.data.message,
          text: 'This message will close in 3 seconds',
          type: 'error',
          confirmButtonText: 'Ok',
          backdrop: false,
          timer: 3000,
        })
      });
    },
    getAllAnswers(context) {
      axios({
        method: "get",
        url: "http://localhost:3000/ho/answer"
      })
      .then(response => {
        context.commit('getAllAnswers_Mutata', response.data.data)
      })
      .catch(err => {
          console.log(err);
      });
    },
    editAnswer_Action(context, data) {
      let token = localStorage.getItem("token");
      axios({
        method: "put",
        url: "http://localhost:3000/ho/answer/edit",
        headers: { token: token },
        data: data
      })
        .then(response => {
          // response would be router push in component
        })
        .catch(err => {
          console.log(err);
        });
    },
    resetError(context) {
      context.commit("resetError_Mutate")
    },
    updatePopularUser(context) {
      axios({
        method: "PUT",
        url: "http://localhost:3000/ho/users"
      })
      .then(() => {
          return axios({
              method: "GET",
              url: "http://localhost:3000/ho/users"
          })
          .then(response => {
              let counter = 0
              let top5Users = []
              response.data.forEach(user => {
                  if(counter < 5) {
                      top5Users.push(user)
                      counter += 1
                  }
              });
              context.commit("updatePopularUser", top5Users)
          })
      })
      .catch(err => {
          console.log(err)
      })
    },
    getAllTags(context) {
      axios({
        method: "GET",
        url: "http://localhost:3000/ho/question/tags"
      })
      .then(response => {
        context.commit("getAllTags", response.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    filterQuestions(context, data) {
      axios({
        method: "GET",
        url: `http://localhost:3000/ho/question/tags/search?search=${data}`
      })
      .then(response => {
        context.commit('storeQuestions_Mutate', response.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    changeLogStatus(context, data) {
      context.commit('changeLogStatus', data)
    }
  }
})
