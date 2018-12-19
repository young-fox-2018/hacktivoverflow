<template>
  <div class="container">
    <div v-for="element in answers" :key="element._id">
      <hr>
      <div class="row">
        <div class="col-md-2 d-flex justify-content-center align-items-center">
          <img
            :src="element.userId.avatar"
            class="img-fluid z-depth-1 rounded-circle"
            alt="Responsive image"
          >
        </div>
        <div class="col-md-7">
          <div class="row">
            <p class="text-muted">
              <span class="text-muted">by: {{element.userId.name}} |</span>
              <i class="fa fa-star" style="color:gold" aria-hidden="true">
                <span style="color:black">{{element.userId.reputation}}</span>
              </i>
            </p>
          </div>
          <input v-if="word && element._id == answerId" v-model="word" type="text">
          <i
            v-if="word && element._id == answerId"
            @click="submitAnswer"
            class="fa fa-check-square ml-1"
            style="cursor:pointer; font-size:25px; color:green"
            aria-hidden="true"
          ></i>
          <i
            v-if="word && element._id == answerId"
            @click="cancelSubmit"
            class="fa fa-close ml-1"
            style="cursor:pointer; font-size:25px; color:red"
            aria-hidden="true"
          ></i>
          <p v-else>{{element.word}}</p>
          <div class="row">
            <p
              @click="editAnswer(element)"
              class="text-muted"
            >
              <i style="cursor:pointer" class="fa fa-edit" aria-hidden="true">edit</i>
            </p>
          </div>
        </div>
        <div class="col-md-2">
          <i
            @click="upvote(element)"
            style="cursor:pointer; font-size:30px"
            class="fa fa-thumbs-o-up"
            aria-hidden="true"
          ></i>
          <p
            style="font-size:20px"
            class="mb-2 mt-2"
          >{{element.upvote.length-element.downvote.length}}</p>
          <i
            @click="downvote(element)"
            style="cursor:pointer; font-size:30px"
            class="fa fa-thumbs-o-down"
            aria-hidden="true"
          ></i>
        </div>
      </div>
    </div>

    <!-- MODAL -->
  </div>
</template>

<script>
import api from "@/api/hacktiv.js";
import { mapState } from "vuex";
import miniToastr from "mini-toastr";
export default {
  name: "answer",
  data() {
    return {
      word: "",
      answerId: "",
      questionId: ""
    };
  },
  computed: {
    ...mapState(["answers", "isLogin"])
  },
  methods: {
    editAnswer(input) {
      this.word = input.word;
      this.answerId = input._id;
      this.questionId = input.questionId;
    },
    cancelSubmit() {
      this.word = "";
      this.answerId = "";
      this.questionId = "";
    },
    submitAnswer() {
      if (this.isLogin) {
        api
          .put(
            `/answers/${this.answerId}`,
            {
              word: this.word
            },
            {
              headers: {
                token: localStorage.getItem("token")
              }
            }
          )
          .then(data => {
            this.$store.dispatch("getAnswer", { id: this.questionId });
            miniToastr.success("answer updated`");
            this.word = "";
            this.answerId = "";
            this.questionId = "";
          })
          .catch(err => {
            console.log(err);
            miniToastr.error("access denied");
          });
      } else {
        miniToastr.warn("You must login first");
      }
    },
    upvote(input) {
      api
        .post(
          `/answers/upvote/${input._id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(data => {
          this.$store.dispatch("getAnswer", { id: input.questionId });
          this.$store.dispatch("topUsers");
          miniToastr.success("success");
        })
        .catch(err => {
          console.log(err);
          miniToastr.error("you can not vote yourself");
        });
    },
    downvote(input) {
      api
        .post(
          `/answers/downvote/${input._id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(data => {
          this.$store.dispatch("getAnswer", { id: input.questionId });
          this.$store.dispatch("topUsers");
          miniToastr.error("success");
        })
        .catch(err => {
          console.log(err);
          miniToastr.error("you can not vote yourself");
        });
    }
  },
  mounted() {
    miniToastr.init();
  }
};
</script>

<style>
</style>
