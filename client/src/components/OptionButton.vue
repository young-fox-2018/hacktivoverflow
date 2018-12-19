<template>
  <div>
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" @click="isUserMethod"
      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="fas fa-caret-down"></i>
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <div v-if="isUser">
          <span>
            <a class="dropdown-item" @click.prevent="deleteMethod"><i class="fas fa-trash"></i>Delete</a>
          </span>
          <span>
            <a class="dropdown-item" @click.prevent="showFormUpdate"><i class="fas fa-edit"></i>Edit</a>
          </span>
          <div v-if="formUpdate">
            <form class="form-horizontal" role="form" @submit.prevent="updateMethod">
              <h4>Update your question</h4>
                <div class="form-group" style="padding:14px;">
                  <textarea class="form-control" placeholder="Enter your question.." v-model="updateValue"></textarea>
                  <hr>
                  <button class="btn btn-primary pull-right" type="submit">Post</button>
                </div>
            </form>
          </div>
          <a @click.prevent="router" class="dropdown-item" ><i class="fas fa-info-circle"></i>Detail</a>
        </div>
        <div v-else>
          <a @click.prevent="router" class="dropdown-item" ><i class="fas fa-info-circle"></i>Detail</a>
        </div>
      </div>
    </div>
    <!-- <div class="panel-heading"><a @click.prevent="detail(question)" class="pull-right">View detail</a><h4> {{question.user.name}}</h4></div> -->
  </div>
</template>

<script>
import firebase from '../config.js'

export default {
  props: ['dataQuestion'],
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
      if (dataUser._id === this.dataQuestion.user.id) {
        this.isUser = true
      }
    },
    deleteMethod() {
      firebase.ref().child('/question/' + this.dataQuestion.id).remove();
    },
    updateMethod() {
      let dataUser = this.$store.state.dataUser
      let tmpQuestion = this.dataQuestion
      tmpQuestion.question = this.updateValue
      var updates = {};
      updates['/question/' + this.dataQuestion.id] = tmpQuestion;
      firebase.ref().update(updates);
      this.updateValue = ''
      this.formUpdate = false
    },
    showFormUpdate() {
      $('.dropdown-toggle').dropdown()
      this.formUpdate = true
    },
    router(question) {
      this.$router.push({ path: `/detail/${this.dataQuestion.id}` })
    },
  }
}
</script>

