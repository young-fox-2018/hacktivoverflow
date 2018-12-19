<template>
  <div class="home-questions">
    <div v-for="(question) in getQuestions" :key="question.key" class="row justify-content-center">
      <!-- question -->
      <div class="col-md-8" style="padding-top:20px">
        <div class="card p-3" id="question">
          <div class="row">
            <div class="col-md-1" style="padding-left:50px">
              <div class="row">
                <a href="#" class="fa fa-arrow-up" aria-hidden="true" @click="upVote(question)"></a>
              </div>
              <div class="row">{{question.vote.length}}</div>
              <div class="row">
                <a href="#" @click="downVote(question)" class="fa fa-arrow-down" aria-hidden="true"></a>
              </div>
              <br>
              <div class="row">
                <a href="#" @click="deleteQ(question)" class="fa fa-trash" aria-hidden="true"></a>
              </div>
            </div>
            <div class="col-md-10">
              <p style="font-weight: bold;">
                {{question.question}}
                <a
                  v-on:click="getDataQ(question)"
                  href="#"
                  data-toggle="modal"
                  data-target="#modalUpdate"
                  class="fa fa-pencil-square-o"
                  aria-hidden="true"
                >edit</a>
              </p>
              <span>
                <a
                  data-toggle="collapse"
                  :href="'#collapseAnswer'+question._id"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >answer</a>
                |
                <a
                  @click="getAnswer(question._id)"
                  data-toggle="collapse"
                  :href="'#collapseDetail'+question._id"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >summary</a>
                <br>
                <p
                  style="font-size:10px"
                >asked by {{question.user_id.first_name}}, {{ question.createdAt.slice(0,15)}}</p>
              </span>
            </div>
          </div>
        </div>
        <!-- form-answer -->
        <div class="collapse" :id="'collapseAnswer'+question._id" style="margin-top:5px">
          <div class="card">
            <div
              class="card-header"
              style="height:10px; font-size:10px ;font-weight: bold"
            >Answer here:</div>
            <form @submit.prevent="postAnswer(question)">
              <div class="form-group">
                <wysiwyg
                  style="height:100px"
                  v-model="answer"
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></wysiwyg>
              </div>
              <button
                style=" float:left ;height:25px ;font-size:10px"
                type="submit"
                class="btn btn-primary btn-block"
              >post</button>
            </form>
          </div>
        </div>
        <div class="collapse" :id="'collapseDetail'+question._id" style="margin-top:5px">
          <answerQuestions></answerQuestions>
        </div>
        <hr size="10" color="#00b33c">
      </div>
      <!-- n-questions -->
      <!-- modal -->
      <updateQuestion :dataQ="dataQ"></updateQuestion>
    </div>
  </div>
</template>
<script>
import answerQuestions from "@/components/answer-questions";
import updateQuestion from "@/components/update-questions";
import moment from "moment";
export default {
  name: "home-questions",
  data() {
    return {
      answer: "",
      dataQ: ""
    };
  },
  methods: {
    getDataQ(dataQ) {
      if (this.userLogin._id == dataQ.user_id._id) {
        this.dataQ = dataQ;
      }
    },
    deleteQ(data) {
      if (this.userLogin._id == data.user_id._id) {
        let V_TOKEN = localStorage.getItem("token");
        axios({
          method: "delete",
          url: `http://localhost:3000/questions/${data._id}`,
          headers: {
            token: V_TOKEN
          }
        })
          .then(result => {
            this.$store.dispatch("getQuestions");
            this.$router.push("/");
          })
          .catch(err => {});
      } else {
        console.log("sudah ada");
      }
    },
    postAnswer(data) {
      if (this.userLogin._id !== data.user_id._id) {
        let V_TOKEN = localStorage.getItem("token");
        axios({
          method: "post",
          url: "http://localhost:3000/answers",
          headers: {
            token: V_TOKEN
          },
          data: {
            answer: this.answer,
            user_id: this.userLogin._id,
            question_id: data._id
          }
        })
          .then(result => {
            this.answer = "";
          })
          .catch(err => {
            this.answer = "";
          });
      }
    },
    upVote(data) {
      if (this.userLogin._id !== data.user_id._id) {
        let dataquestion = data.vote;
        var index = dataquestion.findIndex(n => {
          return n == this.userLogin._id;
        });
        if (index == -1) {
          let V_TOKEN = localStorage.getItem("token");
          data.vote.push(this.userLogin._id);
          axios({
            method: "put",
            url: `http://localhost:3000/questions/${data._id}`,
            headers: {
              token: V_TOKEN
            },
            data: data
          })
            .then(result => {})
            .catch(err => {});
        } else {
          console.log("sudah ada");
        }
      } else {
      }
    },
    downVote(data) {
      if (this.userLogin._id !== data.user_id._id) {
        let dataquestion = data.vote;
        var index = dataquestion.findIndex(n => {
          return n == this.userLogin._id;
        });
        if (index !== -1) {
          let V_TOKEN = localStorage.getItem("token");

          data.vote.splice(index, 1);
          axios({
            method: "put",
            url: `http://localhost:3000/questions/${data._id}`,
            headers: {
              token: V_TOKEN
            },
            data: data
          })
            .then(result => {
              // console.log(result);
            })
            .catch(err => {});
        } else {
        }
      } else {
      }
    },

    getAnswer(id) {
      this.$store.dispatch("getAnswer", id);
    }
  },
  components: {
    answerQuestions,
    updateQuestion
  },
  computed: {
    getQuestions() {
      let questionData = this.$store.state.questions.result;
      return questionData;
    },
    userLogin() {
      if (this.$store.state.userLogin) {
        return this.$store.state.userLogin;
      }
    }
  }
};
</script>
<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>


