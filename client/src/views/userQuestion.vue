<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-3">
        <div class="card">
          <!-- Card image -->
          <div class="view overlay d-flex justify-content-center">
            <img
              class="img-fluid img-rounded"
              :src="avatar"
              alt="Card image cap"
              style="max-height: 200px"
            >
            <a href="#!">
              <div class="mask rgba-white-slight"></div>
            </a>
          </div>

          <!-- Card content -->
          <div class="card-body blue lighten-3">
            <!-- Title -->
            <h4 class="card-title text-center">Hi, {{name}}</h4>
            <!-- Text -->
            <p class="card-text text-center">email : {{email}}</p>
            <!-- Button -->
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div v-for="element in questions" :key="element._id" class="card mt-4">
          <div class="card-header blue lighten-3 text-center">
            <h3>{{element.title}}</h3>
          </div>
          <div class="card-body">
            <p>{{element.body}}</p>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <button @click="deleteQuest(element)" class="btn btn-danger">
              <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
            <button
              @click="onclickEdit(element)"
              data-toggle="modal"
              data-target="#editModal"
              class="btn btn-info"
            >
              <i class="fa fa-edit" aria-hidden="true"></i>
            </button>
            <button class="btn"></button>
          </div>
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>

    <!-- MODAL  -->
    <div
      class="modal fade"
      id="editModal"
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
              <input v-model="edit.title" type="text" id="form34" class="form-control validate">
              <label data-error="wrong" data-success="right" for="form34"></label>
            </div>

            <div class="md-form">
              <i class="fa fa-question prefix grey-text"></i>
              <textarea
                v-model="edit.content"
                type="text"
                id="form8"
                class="md-textarea form-control"
                rows="4"
              ></textarea>
              <label data-error="wrong" data-success="right" for="form8"></label>
            </div>

            <div class="md-form mb-5">
              <i class="fa fa-tag prefix grey-text"></i>
              <input v-model="edit.tags" type="text" id="form32" class="form-control validate">
              <label data-error="wrong" data-success="right" for="form32"></label>
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-center">
            <button @click="submitEdit" class="btn btn-unique">
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
import api from "@/api/hacktiv.js";
import { mapState } from "vuex";
import miniToastr from "mini-toastr";
export default {
  name: "user-question",
  data() {
    return {
      avatar: "",
      name: "",
      email: "",
      userId: "",
      edit: {
        tags: "",
        title: "",
        content: "",
        id: ""
      }
    };
  },
  computed: {
    ...mapState(["isLogin", "questions"])
  },
  methods: {
    submitEdit() {
      api
        .put(
          `/questions/${this.edit.id}`,
          {
            tag: this.edit.tags,
            title: this.edit.title,
            body: this.edit.content
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(data => {
          this.$store.dispatch(
            "searchQuestion",
            `/questions?userId=${this.userId}`
          );
          miniToastr.success('updated')
          $('#editModal').modal('toggle')
        })
        .catch(err => {
            miniToastr.error('something wrong please try again later')
          $('#editModal').modal('toggle')
          console.log(err);
        });
    },
    onclickEdit(input) {
      this.edit.tags = input.tags.join(" ");
      this.edit.title = input.title;
      this.edit.content = input.body;
      this.edit.id = input._id;
    },
    deleteQuest(input) {
      api
        .request({
          url: `/questions/${input._id}`,
          method: "DELETE",
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(data => {
          this.$store.dispatch(
            "searchQuestion",
            `/questions?userId=${this.userId}`
          );
          miniToastr.success("question deleted");
        })
        .catch(err => {
          miniToastr.error(
            "oops something wrong, please refresh page or try again later"
          );
          console.log(err);
        });
    }
  },
  mounted() {
    miniToastr.init();
    if (mapState) {
      api
        .get("/users", {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(data => {
          this.avatar = data.data.avatar;
          this.name = data.data.name;
          this.email = data.data.email;
          this.userId = data.data.id;
          this.$store.dispatch(
            "searchQuestion",
            `/questions?userId=${this.userId}`
          );
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>
