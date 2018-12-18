<template>
  <div class="">
    <FailAlert :message="errorMessage"  @alertdone="alertDone"/>
    <b-row class="d-flex justify-content-md-center py-2">
      <div class="col-6 border rounded py-2">
        <form @submit.prevent="loginSend">
          <div class="form-group">
            <label for="email">Email address</label>
            <input v-model="email" autocomplete="off" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
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
  name: 'loginform',
  components: {
    FailAlert
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  mounted() {
    this.$emit("formtitle", "Login Form");
    gapi.signin2.render('google-signin-btn', { // this is the button "id"
      onsuccess: this.onSignIn // note, no "()" here
    })
  },
  methods: {
    onSignIn (googleUser) {
      // do stuff, for example
      console.log('kesini kah?')
      const profile = googleUser.getBasicProfile()
      var id_token = googleUser.getAuthResponse().id_token;
      // console.log(id_token)
      // this.$store.dispatch('gLogin', id_token)
      myApi({
        method: 'get',
        url: '/glogin?token=' + id_token
      })
        .then(({ data }) => {
          console.log(data)
          localStorage.token = data.token
          this.$emit('loginsuccess')
        }).catch((err) => {
          this.errorMessage = err.response.data.message
        });
    },
    loginSend() {
      let input = {
        email: this.email,
        password: this.password
      }

      myApi({
        method: 'post',
        url: '/login',
        data: input
      })
      .then(({data}) => {
        console.log(data, 'data dari token login')
        localStorage.token = data.token
        this.$emit('loginsuccess')
        // this.$router.push({name: 'home'})
        // this.clearForm()
      }).catch((err) => {
        this.errorMessage = err.response.data.message        
      });
    },
    clearForm() {
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
