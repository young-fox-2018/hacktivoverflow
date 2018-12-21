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
                    <th>Title</th>
                    <th>Created Date</th>
                    <th># of Answers</th>
                    <th># of Votes</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(question, index) in questionList" :key="index">
                    <td>{{question.title}}</td>
                    <td>{{question.createdDate}}</td>
                    <td>{{question.answers.length}}</td>
                    <td>{{question.votes.length}}</td>
                    <td>
                      <router-link :to="`/questions/${question.slug}`" ><font-awesome-icon icon="eye" style="cursor:pointer; color:indigo"/></router-link> |
                      <router-link :to="`/dashboard/questions/edit/${question.slug}`"> <font-awesome-icon icon="edit" style="cursor:pointer; color:indigo"/> </router-link> | 
                      <a id="delete" @click="remove(question._id, question.op._id)"><font-awesome-icon icon="trash" style="cursor:pointer; color:indigo"/></a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
    
  </div>
</template>

<script>
import axios from "axios";
import Error from "@/components/Error.vue";

export default {
  name: "user_Questions",
  components: {
    Error
  },
  props: [""],
  data() {
    return {
      questionList: [],
      error_status: false,
      error_msg: "",
      loading: true
    };
  },
  computed: {
    allQuestion: function() {
      return this.$store.state.questionList
    }
  },
  methods: {
    remove: function(questionId, userId) {
      this.loading = true
      let data = {
        questionId: questionId,
        userId: userId
      };
      this.$store.dispatch("removeQuestion_Action", data).then(() => {
        this.getUserQuestion()
      });
      this.questionList = []
    },
    getUserQuestion: function() {
      this.loading = true
      this.questionList = []
      this.$store.dispatch("decode");
      axios({
        method: "get",
        url: "https://xavier-ho-server.thenile.online/ho/questions"
      })
        .then(response => {
          this.$store.dispatch("storeQuestions_Action").then(() => {
            this.allQuestion.forEach(question => {
              if (question.op._id == this.$store.state.decoded._id) {
                this.questionList.push(question);
              }
            });
            this.loading = false
          }) 
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted: function() {
    this.getUserQuestion()
  },
  watch: {
    allQuestion: function(val) {
      this.getUserQuestion()
    }
  }
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
