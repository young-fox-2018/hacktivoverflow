<template>
  <div class="updateQuestion">
    <div
      class="modal fade"
      id="modalUpdate"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">Update Question</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="exampleInputEmail1" style="float:left">Question :</label>
              <input type="text" class="form-control" v-model="dataQ.question">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" @click="updateQ(dataQ._id)">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "updateQuestion",
  data() {
    return {};
  },
  props: ["dataQ"],
  methods: {
    updateQ(data) {
      if (this.userLogin._id == this.dataQ.user_id._id) {
        let V_TOKEN = localStorage.getItem("token");
        axios({
          method: "put",
          url: `http://localhost:3000/questions/${data}`,
          headers: {
            token: V_TOKEN
          },
          data: {
            question: this.dataQ.question,
            user_id: this.dataQ.user_id._id,
            vote: this.dataQ.vote
          }
        })
          .then(result => {
            this.$store.dispatch("getQuestions");
            this.dataQ.question = "";
            this.$router.push("/");
          })
          .catch(err => {});
      } else {
        console.log("sudah ada");
      }
    }
  },
  computed: {
    userLogin() {
      if (this.$store.state.userLogin) {
        return this.$store.state.userLogin;
      }
    }
  }
};
</script>
