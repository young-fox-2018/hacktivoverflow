<template>
  <div>
    <!-- Modal Component -->
    <b-modal :id="id"
             ref="modal"
             :title="title"
             @ok="handleOk"
             >
      <form @submit.stop.prevent="handleSubmit">
      
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
import api from '@/assets/api-server.js'

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
        this.$swal('Error!', 'please fill all fields correctly', 'error')
      }else if (this.validateEmail(this.user.email)==false) {
        // this.errEmail = true
        this.$swal('Error!', 'please fill all fields correctly', 'error')
      } else if(this.user.password.length < 8) {
        this.$swal('Error!', 'please fill all fields correctly', 'error')
        // this.errPassword = true
      } else {
        this.handleSubmit()
      }
    },
    handleSubmit () {
      api.post('/register', this.user)
        .then(({data})=> {
          this.$swal('Register Success', 'Please login to continue', 'success')
            .then(()=>{
              this.$refs.modal.hide()
            })
        })
        .catch(({response})=>{
          console.log(response)
          this.$swal('Register Error', response.data.message, 'error')
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
  props: ['title', 'id']
}
</script>

<!-- modal-prevent-1.vue -->