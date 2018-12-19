<template>
  <div class="answerQuestion">
    <div class="card p-3" style="margin-top:10px" v-for="(answer) in getAnswers" :key="answer.key">
      <div v-html="answer.answer"></div>
      <div class="row">
        <a
          href="#"
          @click="updateA(answer)"
          data-toggle="modal"
          data-target="#modalUpdateA"
          class="fa fa-pencil-square-o"
          aria-hidden="true"
          style="float:right; margin-left:20px"
        >edit</a>
      </div>
      <div class="row">
        <div class="col-md-6">
          <span>Vote
            <div v-html="answer.vote.length || 0"></div>
          </span>
        </div>
        <div class="col-md-6">
          <div>
            <a href="#" @click="upVote(answer)">up-vote</a>
            |
            <a href="#" @click="downVote(answer)">down-vote</a>
            <br>
            <p
              style="font-size:10px"
            >answer by {{answer.user_id.first_name}}, {{answer.createdAt.slice(0,15)}}</p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade bd-example-modal-lg"
      id="modalUpdateA"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">Update Answer</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <wysiwyg
                class="form-control"
                id="exampleFormControlTextarea1"
                v-model="updateData.answer"
              ></wysiwyg>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click=" updateAProses">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "answerQuestions",
  data() {
    return {
      updateData: ""
    };
  },
  methods: {
    updateA(dataA) {
      if (this.userLogin._id == dataA.user_id._id) {
        this.updateData = dataA;
      }
    },
    updateAProses() {
      if (this.userLogin._id == this.updateData.user_id._id) {
        let V_TOKEN = localStorage.getItem("token");
        axios({
          method: "put",
          url: `http://localhost:3000/answers/${this.updateData._id}`,
          headers: {
            token: V_TOKEN
          },
          data: {
            answer: this.updateData.answer,
            user_id: this.updateData.user_id._id,
            question_id: this.updateData.question_id,
            vote: this.updateData.vote
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

    upVote(data) {
      if (this.userLogin._id !== data.user_id._id) {
        let datauser = data.vote;
        var index = datauser.findIndex(n => {
          return n == this.userLogin._id;
        });
        if (index == -1) {
          let V_TOKEN = localStorage.getItem("token");
          data.vote.push(this.userLogin._id);
          axios({
            method: "put",
            url: `http://localhost:3000/answers/${data._id}`,
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
      }
    },
    downVote(data) {
      if (this.userLogin._id !== data.user_id._id) {
        let datauser = data.vote;
        var index = datauser.findIndex(n => {
          return n == this.userLogin._id;
        });
        if (index !== -1) {
          let V_TOKEN = localStorage.getItem("token");

          data.vote.splice(index, 1);
          axios({
            method: "put",
            url: `http://localhost:3000/answers/${data._id}`,
            headers: {
              token: V_TOKEN
            },
            data: data
          })
            .then(result => {
              console.log(result);
            })
            .catch(err => {});
        }
      }
    }
  },
  computed: {
    getAnswers() {
      return this.$store.state.answers.result;
    },
    userLogin() {
      if (this.$store.state.userLogin) {
        return this.$store.state.userLogin;
      } else {
      }
    }
  }
};
</script>
<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>

