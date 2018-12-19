<template>
  <div>
    <!-- Modal Component -->
    <b-modal :id="id"
             ref="modal"
             :title="title"
             @ok="handleOk"
             >
      <form @submit.stop.prevent="handleSubmit">
        <div class="alert alert-danger" role="alert" v-show="showError">
          please fill all fields to register
        </div>
        <div class="alert alert-danger" role="alert" v-show="errEmail">
          Please insert a valid email
        </div>
        <div class="alert alert-danger" role="alert" v-show="errPassword">
          Password must be at least 8 characters
        </div>
        <form-group label="name" type="text" @get-value="user.name=$event"></form-group>
        <form-group label="email" type="email" validate="validateEmail" @get-value="user.email=$event"></form-group>
        <form-group label="password" type="password" @get-value="user.password=$event"></form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import FormGroup from '@/components/form-group.vue'
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      user: {
        name : '',
        email: '',
        password: ''
      }, 
      showError : false,
      errEmail: false,
      errPassword: false
    }
  },
  methods: {
    ...mapActions(['register']),
    clearUser(){
      this.user = {
        name: '',
        email: '',
        password: ''
      }
    },
    handleOk (evt) {
      // Prevent modal from closing
      
      evt.preventDefault()
      if (Object.values(this.user).findIndex(index=>index == '') !== -1) {
        this.showError = true
      }else if (this.validateEmail(this.user.email)==false) {
        this.errEmail = true
      } else if(this.user.password.length < 8) {
        this.errPassword = true
      } else {
        this.handleSubmit()
      }
    },
    handleSubmit () {
      this.register(this.user)
      this.$refs.modal.hide()
    },
    validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  }, 
  components: {
    FormGroup
  },
  props: ['title', 'id']
}
</script>

<!-- modal-prevent-1.vue -->