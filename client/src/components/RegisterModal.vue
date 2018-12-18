<template>
  <b-modal :id="modal" ref="registerRef" @hide="clear" hide-footer title="Register">
    <Alert :message="message" :type="type" :countDownTime="countDownTime" @count-down-finish="countDownFinish" />
    <b-form @submit.prevent="register">
      <b-form-group label="First name">
        <b-form-input type="text"
                      v-model="firstName"
                      required
                      placeholder="first name">
        </b-form-input>
      </b-form-group> 
        <b-form-group label="Last name">
        <b-form-input type="text"
                      v-model="lastName"
                      required
                      placeholder="last name">
        </b-form-input>
      </b-form-group> 
        <b-form-group label="email">
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
          Register
        </b-btn>    
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
  methods: {
    clear() {
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.password = ''
    },
    countDownFinish(payload) {
      this.countDownTime = payload
    },
    register() {
      let userInfo = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      }

      axios({
        method: 'post',
        url: '/users/register',
        data: userInfo
      })
      .then(({data: { user }}) => {
        this.$refs.registerRef.hide()
        this.$store.commit('showAlert', {
          countDownTime: 3,
          message: 'Succesfully register',
          type: 'success'
        })
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
