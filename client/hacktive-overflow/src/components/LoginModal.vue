<template>
  <div>
    <div class="alert alert-danger" role="alert" v-if="shownError" style="width:100%; position:fixed; top:0;">
      {{shownError}}
    </div>
    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="loginModalLabel">Login</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body"> 
            <div class="grid">       
              <form method="post" class="form login" onsubmit="return false">                                        
                <div class="form__field">
                  <label for="email"><i class="fa fa-envelope" style="color: #fff"></i><span class="hidden">Email</span></label>
                  <input type="email" name="email" v-model="inputLogin.email" placeholder="email" class="form__input" required>
                </div>                                        
                <div class="form__field">
                  <label for="login__password"><i class="fa fa-lock" style="color: #fff"></i><span class="hidden">Password</span></label>
                  <input type="password" name="password" v-model="inputLogin.password" class="form__input" placeholder="password" required>
                </div>                                        
                <div class="form__field">
                  <button id="buttonLoginSubmit"  data-dismiss="modal" v-on:click.prevent="login()">LOGIN</button>
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
  name: 'LoginModal',
  data() {
    return  {
      shownError: "",
      inputLogin: {
        email: "",
        password: ""
      },
      token: ""
    }
  },
  props: {
  
  },
  methods: {
    login(){            
      axios({
        method: "POST",
        url: '/users/login',
        data: {
          email: this.inputLogin.email,
          password: this.inputLogin.password
        }
      })
      .then(response => {
        this.shownError = ""
        localStorage.setItem("token", response.data)
        this.$store.state.localStorageToken = response.data
        this.inputLogin.email = ""
        this.inputLogin.password = ""
      })
      .catch(err => {
        this.shownError = err.response.data.message
        this.inputLogin.email = ""
        this.inputLogin.password = ""
      })
    }
  }
}
</script>