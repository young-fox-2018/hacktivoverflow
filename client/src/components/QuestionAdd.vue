<template>
  <div>
    <FailAlert :message="errorMessage"  @alertdone="alertDone"/>
    <b-row class="d-flex justify-content-md-center py-2">
      <div class="col-8 border rounded py-2">
        <form @submit.prevent="questionSend">
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
import FailAlert from '@/components/FailAlert.vue'

export default {
  components: {
    FailAlert
  },
  name: 'addquestionform',
  data() {
    return {
      title: '',
      description: '',
      errorMessage: ''
    }
  },
  mounted() {
    this.$emit("formtitle", "Question Form");
  },
  methods: {
    questionSend() {
      let input = {
        title: this.title,
        description: this.description
      }

      myApi({
        url: '/question',
        method: 'post',
        data: input,
        headers: {
          auth: localStorage.token
        }
      })
        .then(({data}) => {
          this.$store.dispatch('readAllQuestion')
          this.$store.dispatch('readMyQuestion')
          this.$router.push('/')
        }).catch((err) => {
          this.errorMessage = err.response.data.message  
        });
      console.log(input)
    },
    alertDone() {
      this.errorMessage = ''
    },
    clearForm() {
      this.title = ''
      this.description = ''
    }
  }
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
