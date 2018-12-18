<template>
  <div class="mt-2">
    <div class="accordion" id="accordionExample">
      <div v-for="(element,index) in questions" :key="index" class="card mt-2">
        <div class="card-header blue lighten-3 pr-0" id="headingOne">
          <div class="container">
            <div class="row">
              <div class="col-md-9">
                <p class="mb-0">
                  <span class="text-muted">by: {{element.userId.name}} |</span>
                  <i
                    class="fa fa-star-o"
                    style="color:green"
                    aria-hidden="true"
                  >{{element.userId.reputation}}</i>
                </p>
                <h4>
                  <strong>{{element.title}}</strong>
                </h4>
                <hr class="m-0">
                <p>{{element.body}}</p>
              </div>
              <div class="col-md-3 pr-0 d-flex flex-column justify-content-between align-items-center">
                <i
                  @click="upvoteQuestion(element)"
                  style="cursor:pointer; font-size:30px"
                  class="fa fa-thumbs-o-up"
                  aria-hidden="true"
                ></i>
                <p
                  style="font-size:20px"
                  class="mb-2 mt-2"
                >{{element.upvote.length-element.downvote.length}}</p>
                <i
                  @click="downvoteQuestion(element)"
                  style="cursor:pointer; font-size:30px"
                  class="fa fa-thumbs-o-down"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
            <div class="row">
              <p class="text-muted">
                tags: <i v-for="(tag, index) in element.tags" :key="index">{{tag}} </i>
              </p>
            </div>
            <div class="row d-flex justify-content-center">
              <button
                @click="getAnswer(element._id)"
                data-toggle="collapse"
                :data-target="'#collapseOne'+index"
                class="btn default-color"
              >answer</button>
            </div>
          </div>
        </div>

        <div
          :id="'collapseOne'+index"
          class="collapse"
          aria-labelledby="headingOne"
          data-parent="#accordionExample"
        >
          <div class="card-body">
            <form @submit.prevent="submitAnswer(element)">
              <div class="form-group shadow-textarea">
                <label for="exampleFormControlTextarea6">Add answer</label>
                <textarea
                  v-model="answerInput"
                  class="form-control z-depth-1"
                  id="exampleFormControlTextarea6"
                  rows="3"
                  placeholder="Write something here..."
                ></textarea>
              </div>
              <button class="btn btn-dark mt-0">submit</button>
            </form>
            <h3 v-if="answers.length==0" class="text-center">there is no answer yet</h3>
            <listanswer v-if="answers.length!=0"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import listanswer from "./answer/answer.vue";
import { mapState } from "vuex";
import api from "../api/hacktiv.js";
import miniToastr from "mini-toastr";
export default {
  name: "list-question",
  data() {
    return {
      answerInput: ""
    };
  },
  components: {
    listanswer
  },
  computed: {
    ...mapState(["questions", "isLogin", "answers"])
  },
  mounted() {
    miniToastr.init();
  },
  methods: {
    submitAnswer(input) {
      if (this.isLogin) {
        api
          .post(
            "/answers",
            {
              word: this.answerInput,
              questionId: input._id
            },
            {
              headers: {
                token: localStorage.getItem("token")
              }
            }
          )
          .then(data => {
            miniToastr.success("answer created");
            this.$store.dispatch("getAnswer", { id: input._id });
          })
          .catch(err => {
            console.log(err);
            miniToastr.error("you must login first");
          });
      } else {
        this.$router.push("/login");
      }
    },
    getAnswer(input) {
      this.$store.dispatch("getAnswer", { id: input });
    },
    upvoteQuestion(input) {
      if (this.isLogin) {
        api
          .post(
            "/questions/upvote/" + input._id,
            {},
            {
              headers: {
                token: localStorage.getItem("token")
              }
            }
          )
          .then(data => {
            this.$store.dispatch("getQuestion");
            this.$store.dispatch("topUsers");
            miniToastr.success("success");
          })
          .catch(err => {
            console.log(err);
            miniToastr.error("you can not vote yourself");
          });
      } else {
        miniToastr.error("you need to login first !");
      }
    },
    downvoteQuestion(input) {
      if (this.isLogin) {
        api
          .post(
            "/questions/downvote/" + input._id,
            {},
            {
              headers: {
                token: localStorage.getItem("token")
              }
            }
          )
          .then(data => {
            this.$store.dispatch("getQuestion");
            this.$store.dispatch("topUsers");
            miniToastr.info("success");
          })
          .catch(err => {
            console.log(err);
            miniToastr.error("you can not vote yourself");
          });
      } else {
        miniToastr.error("you need to login first !");
      }
    }
  }
};
</script>

<style>
</style>
