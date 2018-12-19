<template>
  <div class="body">
    <navbar/>
    <div class="container">
      <!-- add Qusetions -->
      <div class="row justify-content-center" id="add-question-header ">
        <!-- <div class="col-md-2">kosong</div> -->
        <div class="col-md-8">
          <div class="card p-3" id="add-question-value">
            <blockquote class="blockquote mb-0">
              <a href="#">
                <p data-toggle="modal" data-target="#exampleModalCenter">
                  What Your
                  <span style="color:#00b33c;">Questions.</span>
                </p>
              </a>
              <footer class="blockquote-footer" v-if="userLogin">
                <cite title="Source Title">{{userLogin.first_name}}</cite>
              </footer>
            </blockquote>
          </div>
        </div>
        <!-- <div class="col-md-2">kosong</div> -->
      </div>
      <!-- data Questions -->
      <homeQuestions></homeQuestions>

      <!-- modal create -->
      <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">New Questions</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="exampleInputEmail1" style="float:left">Questions :</label>
                <input type="text" class="form-control" v-model="question">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary" @click="questionsPost">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navbar from "@/components/navbar.vue";
import homeQuestions from "@/components/home-questions.vue";
export default {
  name: "home",
  data() {
    return {
      question: ""
    };
  },
  methods: {
    questionsPost() {
      let V_TOKEN = localStorage.getItem("token");
      axios({
        method: "post",
        url: "http://localhost:3000/questions",
        headers: {
          token: V_TOKEN
        },
        data: {
          question: this.question,
          user_id: this.userLogin._id
        }
      })
        .then(result => {
          this.$store.dispatch("getQuestions");
          this.question = "";
        })
        .catch(err => {});
    }
  },
  components: {
    navbar,
    homeQuestions
  },
  computed: {
    userLogin() {
      if (this.$store.state.userLogin) {
        return this.$store.state.userLogin;
      }
    },
    getQuestions() {
      return this.$store.state.getQuestions;
    }
  }
};
</script>
<style>
.body {
  /* background-color: #fafafa; */
}

#add-question-header {
  padding-top: 40px;
}
#add-question-value {
  height: 100px;
}
#add-question-value p {
  font-weight: bold;
}
</style>


