<template>
  <div>
    <b-row class="d-flex justify-content-md-center py-2">
      <div class="col-8 border rounded py-2">
        <form @submit.prevent="questionUpdateSend">
          <div class="form-group">
            <label for="title">Title: </label>
            <input v-model="title" autocomplete="off" type="text" class="form-control" id="title"  placeholder="Enter the title">
          </div>
          <div class="form-group">
            <label for="description">Description: </label>
            <!-- <b-form-textarea id="description"
              v-model="description"
              placeholder="Enter something"
              :rows="3"
              :max-rows="6">
            </b-form-textarea> -->
            <wysiwyg v-model="description" />
          </div>
          <div class="row">
            <div class="col-12 d-inline-flex justify-content-between">
              <button type="submit" class="btn btn-primary">Submit</button>
              <div id="google-signin-btn"></div>
            </div>
          </div>
          <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
          <!-- <div id="google-signin-btn" class="g-signin2" data-width="300" data-height="200" data-longtitle="true"></div> -->
        </form>

      </div>
    </b-row>
  </div>
</template>

<script>
import myApi from '@/api/myApi'

export default {
  data() {
    return {
      title: '',
      description: ''
    }
  },
  mounted() {
    this.readData()
    this.$emit("formtitle", "Update Question Form");
  },
  methods: {
    readData() {
      let id = this.$route.params.questionId
      myApi({
        method: 'get',
        url: '/question/' + id
      })
        .then(({data}) => {
          console.log(data)
          this.title = data.title
          this.description = data.description
        }).catch((err) => {
          console.log(err.response.data.message)
        });
    },
    questionUpdateSend() {
      let id = this.$route.params.questionId

      let input = {
        title: this.title,
        description: this.description
      }

      myApi({
        method: 'put',
        url: 'question/'+id,
        data: input,
        headers: {
          auth: localStorage.token
        }
      })
        .then((result) => {
          this.$router.push('/'+id)
        }).catch((err) => {
          console.log(err.response.data.message)
        });
    }
  }
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
