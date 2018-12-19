<template>
  <div>
    <div class="alert alert-danger" role="alert" v-if="shownError" style="width:100%; position:fixed; top:0;">
      {{shownError}}
    </div>
    <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="registerModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="registerModalLabel">Register</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body"> 
            <div class="grid">    
              <form method="post" class="form login" onsubmit="return false">
                <div class="form__field">
                  <label for="name"><i class="fa fa-user" style="color: #fff"></i><span class="hidden">Name</span></label>
                  <input type="text" name="name" v-model="inputRegister.name" placeholder="name" class="form__input" required>
                </div>                    
                <div class="form__field">
                  <label for="email"><i class="fa fa-envelope" style="color: #fff"></i><span class="hidden">Email</span></label>
                  <input type="email" name="email" v-model="inputRegister.email" placeholder="email" class="form__input" required>
                </div>                
                <div class="form__field">
                  <label for="password"><i class="fa fa-lock" style="color: #fff"></i><span class="hidden">Password</span></label>
                  <input type="password" name="password" v-model="inputRegister.password" class="form__input" placeholder="password" required>
                </div>                
                <div class="form__field">
                  <button id="buttonRegisterSubmit" data-dismiss="modal" v-on:click.prevent="register()">REGISTER</button>
                </div>                    
              </form>        
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/apis/axios'

export default {
  name: 'RegisterModal',
  data() {
    return  {
      shownError: "",
      inputRegister: {
        name: "",
        email: "",
        password: ""
      },
    }
  },
  props: {
  
  },
  methods: {
    register() {
      axios({
        method: "POST",
        url: `/users/register`,
        data: {
          name: this.inputRegister.name,
          email: this.inputRegister.email,
          password: this.inputRegister.password
        }
      })
      .then(response => {
        this.shownError = ""
        this.inputRegister.name = ""
        this.inputRegister.email = ""
        this.inputRegister.password = ""
      })
      .catch(err => {
        this.shownError = ''
        if(err.response.data.message.name) this.shownError += err.response.data.message.name.message + ". "
        if(err.response.data.message.email) this.shownError += err.response.data.message.email.message + ". "
        if(err.response.data.message.password) this.shownError += err.response.data.message.password.message + ". "
        this.inputRegister.name = ""
        this.inputRegister.email = ""
        this.inputRegister.password = ""
      })
    },
  }
}
</script>