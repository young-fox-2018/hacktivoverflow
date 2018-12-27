<template>
  <div>
    <!-- Modal Component -->
    <b-modal :id="id"
             ref="modal"
             :title="title"
             @ok="handleOk"
             >
      <div class="alert alert-danger" role="alert" v-show="errEmail">
        Please input a valid email!
      </div>
      <div class="alert alert-danger" role="alert" v-show="errPassword">
        Password must be at least 8 characters
      </div>
      <form @submit.stop.prevent="handleSubmit">
        <form-group label="email" type="email" v-model="user.email" validate="validateEmail" @get-value="user.email=$event"></form-group>
        <form-group label="password" type="password" @get-value="user.password=$event" v-model="user.password"></form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import FormGroup from '@/components/form-group.vue'
import {mapActions, mapState, mapMutations} from 'vuex'
import axios from 'axios'
import api from '../assets/api-server.js'

export default {
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      errEmail : false,
      errPassword: false,
      value: ''
    }
  },
  methods: {
    ...mapActions(['login', 'isLogin']),
    ...mapMutations(['toAlert']),
    handleOk (evt) {
      // Prevent modal from closing
      evt.preventDefault()
      if (this.validateEmail(this.user.email)==false) {
        this.errEmail = true
        setTimeout(()=>{
          this.errEmail = false
        }, 2500)
      } else if(this.user.password.length < 8) {
        this.errPassword = true
        setTimeout(()=>{
          this.errPassword = false
        }, 2500)
      } else {
        this.handleSubmit()
      }
    },
    handleSubmit () {
      api.post('/login', this.user)
        .then(({data})=> {
          // console.log(data)
          localStorage.setItem('token', data.token)
          this.login(data)
          this.isLogin()
          this.$refs.modal.hide()
        })
        .catch(err=> {
          // console.log(err.response.data.message)
          console.log(err.response)
          this.$swal({
            type: 'warning', 
            text: err.response.data.message,
            title: 'Login Error!'
          })
        })
      
    },
    validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
    }
  }, 
  components: {
    FormGroup
  },
  props: ['title', 'id'],
  computed: {
    ...mapState(['loginStatus', 'alert'])
  }
}
</script>

<!-- modal-prevent-1.vue -->