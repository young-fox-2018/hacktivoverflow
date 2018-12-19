<template>
  <div class="container-fluid mt-5">
    <div class="row d-flex justify-content-center">
      <div>
        <img style="max-width:200px" src="@/assets/logo.png" alt>
      </div>
    </div>
    <div class="row mt-1">
      <div class="col-md-1"></div>
      <div class="col-md-2" style="border-top:1px dotted black">
        <toprated/>
      </div>
      <div class="col-md-6" style="border-top:1px dotted black">
        <button
          data-toggle="modal"
          data-target="#newQuestion"
          class="btn btn-primary"
        >Add New Answer</button>
        <listQuestions/>
      </div>
      <div class="col-md-2" style="border-top:1px dotted black">
        <div class="sticky-top">

        <form @submit.prevent="submitSearch" class="form-inline mt-5">
          <div class="md-form my-0">
            <input
              v-model="searchQuest"
              class="form-control mr-sm-2"
              type="text"
              placeholder="Search By Tag"
              aria-label="Search"
            >
          </div>
        </form>
        <chat/>
        </div>
      </div>
      <div class="col-md-1"></div>
    </div>

    <!-- MODAL -->
    <div
      class="modal fade"
      id="newQuestion"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header text-center">
            <h4 class="modal-title w-100 font-weight-bold">Add new question</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body mx-3">
            <div class="md-form mb-5">
              <i class="fa fa-header prefix grey-text"></i>
              <input v-model="title" type="text" id="form34" class="form-control validate">
              <label data-error="wrong" data-success="right" for="form34">Title</label>
            </div>

            <div class="md-form">
              <i class="fa fa-question prefix grey-text"></i>
              <textarea
                v-model="content"
                type="text"
                id="form8"
                class="md-textarea form-control"
                rows="4"
              ></textarea>
              <label data-error="wrong" data-success="right" for="form8">Content</label>
            </div>

            <div class="md-form mb-5">
              <i class="fa fa-tag prefix grey-text"></i>
              <input v-model="tags" type="text" id="form32" class="form-control validate">
              <label
                data-error="wrong"
                data-success="right"
                for="form32"
              >Tag (Ex: tech javascript server)</label>
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-center">
            <button @click="submitQuestion" class="btn btn-unique">
              Submit
              <i class="fa fa-paper-plane-o ml-1"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import api from "../api/hacktiv.js";
import chat from "../components/chat.vue"
import listQuestions from "../components/listQuestion.vue";
import toprated from "../components/topratedusers.vue";
import miniToastr from "mini-toastr";
import { mapState } from "vuex";
export default {
  name: "home",
  data() {
    return {
      title: "",
      content: "",
      tags: "",
      searchQuest: ""
    };
  },
  components: {
    toprated,
    listQuestions,
    chat
  },
  computed: {
    ...mapState(["isLogin"])
  },
  methods: {
    submitSearch() {
      if (this.searchQuest) {
        this.$store.dispatch(
          "searchQuestion",
          `/questions?tags=${this.searchQuest}`
        );
      } else {
        this.$store.dispatch("searchQuestion", `/questions`);
      }
    },
    submitQuestion() {
      if (this.isLogin) {
        api
          .post(
            "/questions",
            {
              title: this.title,
              body: this.content,
              tag: this.tags
            },
            {
              headers: {
                token: localStorage.getItem("token")
              }
            }
          )
          .then(data => {
            this.$store.dispatch("getQuestion");
            $("#newQuestion").modal("toggle");
            miniToastr.success("question created");
          })
          .catch(err => {
            miniToastr.error("access denied");
            $("#newQuestion").modal("toggle");
            console.log(err);
          });
      } else {
        miniToastr.warn("you must login first");
        $("#newQuestion").modal("toggle");
      }
    }
  },
  mounted() {
    miniToastr.init();
    if (localStorage.getItem("token")) {
      api
        .get("/users", {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(data => {
          this.$store.dispatch("login");
        })
        .catch(err => {
          console.log("salah ini tokenya");
        });
    } else {
      this.$store.dispatch("logout");
      console.log("belum login");
    }
    this.$store.dispatch("getQuestion");
  }
};
</script>
