<template>
  <div>
    <a @click="showFormUpdate">edit</a>
    <div class="card" v-if="formUpdate">
      <textarea class="card-header form-control" placeholder="Enter your question.." v-model="updateValue"></textarea>
      <hr>
      <button class="card-body btn btn-primary pull-right ml-2" @click="updateMethod" type="submit">Post</button>
      <button class="card-body btn btn-primary pull-right" @click="closeForm" type="submit">Close</button>
    </div>
  </div>
</template>

<script>
import firebase from '../config.js'

export default {
  props: ['dataAnswer', 'dataQuestion'],
  data() {
    return {
      isUser: false,
      updateValue: '',
      formUpdate: false,
    }
  },
  methods: {
    isUserMethod() {
      let dataUser = this.$store.state.dataUser
      if (dataUser._id === this.dataAnswer.user.id) {
        this.isUser = true
      }
    },
    deleteMethod() {
      firebase.database().ref().child('/question/' + this.dataAnswer.id).remove();
    },
    updateMethod() {
      let dataUser = this.$store.state.dataUser
      let tmpQuestion = this.dataQuestion
      let tmpAnswer = this.dataAnswer 
      tmpQuestion.answer[tmpAnswer.id].answer = this.updateValue
      var data = {
        id: this.dataAnswer.id,
        user: this.dataAnswer.user,
        answer: this.updateValue
      }
      var updates = {};
      updates['/question/' + this.dataQuestion.id] = tmpQuestion;
      firebase.ref().update(updates);
      this.updateValue = ''
      this.formUpdate = false
    },
    showFormUpdate() {
      this.formUpdate = true
    },
    closeForm() {
      this.formUpdate = false
    },
    router(question) {
      this.$router.push({ path: `/detail/${this.dataQuestion.id}/answer/${this.dataAnswer.id}` })
    },
  }
}
</script>

