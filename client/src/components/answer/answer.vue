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
              <i
                class="fa fa-star-o"
                style="color:green"
                aria-hidden="true"
              >{{element.userId.reputation}}</i>
            </p>
          </div>
          <p>{{element.word}}</p>
          <div class="row">
            <p
              @click="editAnswer(element)"
              data-toggle="modal"
              :data-target="'#editAnswerModal'+element._id"
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
    
    <!-- MODAL -->
    <div
      class="modal fade"
      :id="'editAnswerModal'+element._id"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Answer</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group shadow-textarea">
              <textarea
                v-model="word"
                class="form-control z-depth-1"
                id="exampleFormControlTextarea6"
                rows="3"
                placeholder="Write something here..."
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click.prevent="submitAnswer" type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    </div>
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
            console.log(this.questionId);
            this.$store.dispatch("getAnswer", { id: this.questionId });
            miniToastr.success("answer updated`");
            $("#editAnswerModal").modal("toggle");
          })
          .catch(err => {
            console.log(err);
            miniToastr.error("access denied");
            $("#editAnswerModal").modal("toggle");
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
