<template>
  <div>
    <FailAlert :message="errorMessage" @alertdone="alertDone"/>
    <b-row class="d-flex justify-content-md-center py-2">
      <div class="col-6 border rounded py-2">
        <b-form @submit.prevent="registerSend">
          <div class="form-group">
            <label for="name">Name</label>
            <input v-model="name" autocomplete="off" type="text" class="form-control" id="name" placeholder="Enter your name">
          </div>
          <div class="form-group">
            <label for="phone">Phone</label>
            <input v-model="phone" autocomplete="off" type="text" class="form-control" id="phone" placeholder="Enter your phone number">
          </div>
          <div class="form-group">
            <label for="email">Email address</label>
            <input v-model="email" autocomplete="off" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp"  class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </b-form>

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
  data() {
    return {
      name: '',
      phone: '',
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  name: 'registerform',
  mounted() {
    this.$emit("formtitle", "Register Form");
  },
  methods: {
    registerSend() {
      let input = {
        name: this.name,
        phone: this.phone,
        email: this.email,
        password: this.password
      }
      console.log('input', input)

      myApi({
        url: '/register',
        method: 'post',
        data: input
      })
      .then(({data}) => {
        console.log(data)
        // this.$store.dispatch('success', 'Successfully registered new account!')
        this.$router.push({name: 'home'})
        this.clearForm()
      }).catch((err) => {
        console.log(err.response.data.message)
        this.errorMessage = err.response.data.message
      });
    }, 
    clearForm() {
      this.name = '',
      this.phone = '',
      this.email = '',
      this.password = ''
    },
    alertDone() {
      this.errorMessage = ''
    }
  }
}
</script>

<style>

</style>
