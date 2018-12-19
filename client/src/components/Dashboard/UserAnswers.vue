<template>
  <div v-if="loading">
    <img src="../../assets/loading.gif" alt="loading">
  </div>
  <div v-else class="content">
     <Error v-if="error_status" v-bind:error="error_msg"/>
     <div class="container-fluid">
            <div class="row" style="justify-content: flex-start">
              <table id="table_task" class="table table-striped">
                <thead class="thead-dark">
                  <tr>
                    <th>Answer Title</th>
                    <th>Question Title</th>
                    <th># of Votes</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(answer, index) in currentUserAnswerList" :key="index">
                    <td>{{answer.title}}</td>
                    <td> <router-link :to="`/questions/${answer.question.slug}`">  {{answer.question.title}}  </router-link></td>
                    <td>{{answer.votes.length}}</td>
                    <td>
                      <font-awesome-icon icon="edit" style="cursor:pointer; color:indigo" data-toggle="modal" data-target="#viewAnswer" @click="displayDetails(answer.title, answer.description, answer._id, answer.poster._id)"/>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
    
  

          <!-- Modal -->
          <div class="modal fade" id="viewAnswer" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Answer Details</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form @submit.prevent="editAnswer()">
                    <div class="form-group">
                      <label>Title</label>
                      <input type="text" class="form-control" v-model="answer_title">
                    </div>
                    <div class="form-group">
                      <label>Details</label>
                      <wysiwyg v-model="answer_description" style="background-color:white"/>
                    </div>
                    <button type="submit" class="btn btn-primary" @click.prevent="editAnswer()" data-dismiss="modal">Edit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
  
  
  
  
  </div>
</template>

<script>
import axios from "axios";
import Error from "@/components/Error.vue";
import {mapState} from 'vuex'

export default {
  name: "user_Answers",
  components: {
    Error
  },
  props: [""],
  data() {
    return {
      answerList: [],
      error_status: false,
      error_msg: "",
      loading: true,
      answer_title: '',
      answer_description: '',
      answer_id: '',
      answer_poster: ''
    };
  },
  methods: {
    displayDetails(title, desc, id, poster) {
      this.answer_title = title
      this.answer_description = desc
      this.answer_id = id
      this.answer_poster = poster
      console.log(this.answer_poster)
    },
    editAnswer() {
      let data = {
          title: this.answer_title,
          description: this.answer_description,
          answerId: this.answer_id,
          userId: this.answer_poster
      }
      let token = localStorage.getItem("token");
      axios({
        method: "put",
        url: "https://xavier-ho-server.thenile.online/ho/answers/edit",
        headers: { token: token },
        data: data
      })
      .then(response => {
        this.$store.dispatch('getAllAnswers')
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
  mounted: function() {
    this.loading = true
    this.$store.dispatch('getAllAnswers')
    this.loading = false
  },
  computed: mapState({
    currentUserAnswerList: state => state.currentUserAnswerList
  })
};
</script>

<style scoped>
.content {
  margin: 10px;
}
#delete {
  color: red;
}
#delete:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
