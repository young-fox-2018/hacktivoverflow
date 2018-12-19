<template>
  <b-modal :id="modal" ref="loginRef" @hide="clear" hide-footer title="Login">
    <Alert :message="message" :type="type" :countDownTime="countDownTime" @count-down-finish="countDownFinish" />
    <b-form @submit.prevent="login">
        <b-form-group label="Email">
        <b-form-input type="email"
                      v-model="email"
                      required
                      placeholder="email">             
        </b-form-input>
      </b-form-group> 
        <b-form-group label="Password">
        <b-form-input type="password"
                      v-model="password"
                      required
                      placeholder="password">
        </b-form-input>
      </b-form-group> 
    <div slot="modal-footer" class="mt-4">
        <b-btn type="submit" size="sm" class="float-right" variant="primary">
          Sign in
        </b-btn> 
        <div id="google-signin-button"></div>
    </div>
    </b-form>
  </b-modal>
</template>
<script>
import Alert from '@/components/Alert.vue'
import axios from '@/helpers/axios.js'
import { mapActions } from 'vuex'
export default {
  props:['modal'],
  components: {
    Alert
  },
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      countDownTime: 0,
      message: '',
      type: ''
    }
  },
  mounted() {
     gapi.signin2.render('google-signin-button', {
      onsuccess: this.onSignIn
    })
  },
  methods: {
     onSignIn (user) {
      var id_token = user.getAuthResponse().id_token
      axios({
        method: 'post',
        url: '/users/gLogin',
        data: {
          idToken: id_token
        }
      })
      .then(({data: { token } }) => {
        localStorage.setItem('token', token)
        this.$refs.loginRef.hide()
        this.$store.commit('showAlert', {
          countDownTime: 3,
          message: 'Succesfully sign in',
          type: 'success'
        })

        this.$store.commit('changeLoginState', true)
        this.$router.push('/questions')
      })
      .catch(({response: { data: { err }}}) => {
        this.countDownTime = 3
        this.message = err
        this.type = 'danger'
      })

    },
    clear() {
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.password = ''
    },
    countDownFinish(payload) {
      this.countDownTime = payload
    },
    login() {
      let userInfo = {
        email: this.email,
        password: this.password
      }

      axios({
        method: 'post',
        url: '/users/login',
        data: userInfo
      })
      .then(({data: { token }}) => {
        localStorage.setItem('token', token)
        this.$refs.loginRef.hide()
        this.$store.commit('showAlert', {
          countDownTime: 3,
          message: 'Succesfully sign in',
          type: 'success'
        })

        this.$store.commit('changeLoginState', true)
        this.$router.push('/questions')
      })
      .catch(({ response: { data: { err } } }) => {
        this.countDownTime = 3
        this.message = err
        this.type = 'danger'
      })
    }
  }
}
</script>
