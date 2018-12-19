<template>
  <b-navbar toggleable="md" type="dark" variant="info">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand to='/'>HacktivOverflow</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-nav-form>
        <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
      </b-nav-form>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-navbar-nav>
          <b-nav-item href="#">Help Center</b-nav-item>
          <!-- <b-button @click.prevent="onSignOut">Sign out</b-button> -->
        </b-navbar-nav>

        <div v-if="!isLogin">
          <b-navbar-nav>
            <b-nav-item v-b-modal="'modalLogin'">Login</b-nav-item>
            <b-nav-item v-b-modal="'modalRegister'">Register</b-nav-item>

            <!-- Modal Component -->
            <b-modal id="modalLogin" title="Login" hide-footer>
              <div v-if="success" class="alert alert-success" role="alert">
                {{successMsg}}
              </div>
              <div v-if="error" class="alert alert-danger" role="alert">
                {{errorMsg}}
              </div>
              <form @submit.prevent="loginNow">
                <b-form-input type="email" placeholder="Enter email" v-model="formLogin.email"></b-form-input>
                <br>
                <b-form-input type="password" placeholder="Enter your password" v-model="formLogin.password"></b-form-input>
                <br>
                <b-button type="b-button" class="btn btn-primary">Login</b-button>
                <br><br>
                <g-signin-button
                  :params="googleSignInParams"
                  @success="onSignInSuccess"
                  @error="onSignInError">
                  Sign in with Google
                </g-signin-button>
              </form>
            </b-modal>

            <b-modal id="modalRegister" title="Register" hide-footer>
              <div v-if="success" class="alert alert-success" role="alert">{{successMsg}}</div>
              <div v-if="error" class="alert alert-danger" role="alert">{{errorMsg}}</div>
              <form>
                <b-form-input type="text" placeholder="Enter your name" v-model="formRegister.name"></b-form-input><br>
                <b-form-input type="email" placeholder="Enter your email" v-model="formRegister.email"></b-form-input><br>
                <b-form-input type="password" placeholder="Enter your password" v-model="formRegister.password"></b-form-input>
                <br>
              </form>
              
              <b-button type="b-button" class="btn btn-primary" @click.prevent="registerNow">Register</b-button>
              <br>
              <p>OR</p>
              <g-signin-button
                :params="googleSignInParams"
                @success="onSignInSuccess"
                @error="onSignInError">
                Sign in with Google
              </g-signin-button>
            </b-modal>
          </b-navbar-nav>
        </div>
        <div v-if="isLogin">
          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <b>User</b>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click='logout'>Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </div>   
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

  <!-- navbar-1.vue -->
</template>
<script>
    
</script>
<script>
import api from '@/api/api.js'
import facebookLogin from 'facebook-login-vuejs';

export default {
  name: 'navbar',
  components: {
    facebookLogin
  },
  data(){
    return{
      isLogin: false,
      success: false,
      successMsg: '',
      error: false,
      errorMsg: '',

      formLogin: {
        email: '',
        password: ''
      },
      formRegister: {
        name: '',
        email: '',
        password: ''
      },
      googleSignInParams: {
        client_id: '828992207061-gs9c21tstsirf52de5io3i6bopr6ijls.apps.googleusercontent.com'
      }
    }
  },
  created(){
    this.checkLogin()
  },
  mounted() {
    // init()
    // gapi.signin2.render('google-signin-button', {
    //   onsuccess: this.onSignIn
    // })
  },
  methods: {
    // onSignIn(googleUser) {
    //   console.log('masuuuk')
    //   const profile = googleUser.getBasicProfile();
    //   console.log(profile);
    //   var id_token = googleUser.getAuthResponse().id_token;
    //   console.log("ID Token: " + id_token);
    // },

    // onSignOut() {
    // var auth2 = gapi.auth2.getAuthInstance();
    // auth2.signOut()
    // .then(function () {
    //   console.log('User signed out.')
    // })
    // },

    onSignInSuccess (googleUser) {
      console.log('signed in')
      const profile = googleUser.getBasicProfile()
      var id_token = googleUser.getAuthResponse().id_token;
      api
          .post('/users/fblogin', {token: id_token} )
          .then( user => {
            console.log(user)
            this.success = true
            this.successMsg = user.data.message
            localStorage.setItem('token',user.data.token)
            localStorage.setItem('userId', user.data.user._id)
            setTimeout(() => {
              this.clearMessage()
              this.clearForm()
              this.isLogin = true
            }, 2000);
          })
          .catch( error => {
            console.log(error)
            this.error = true
            this.errorMsg = error.response.data.message
            setTimeout(() => {
              this.clearMessage()
              // this.clearForm()
            }, 3000);
          })
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    },

    checkLogin(){
      if(localStorage.getItem('token')) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    }, 

    loginNow(){
      let user = this.formLogin
      api
          .post('/users/login', user )
          .then( user => {
            console.log(user)
            this.success = true
            this.successMsg = user.data.message
            localStorage.setItem('token',user.data.token)
            localStorage.setItem('userId', user.data.user._id)
            setTimeout(() => {
              this.clearMessage()
              this.clearForm()
              this.isLogin = true
            }, 2000);
          })
          .catch( error => {
            console.log(error)
            this.error = true
            this.errorMsg = error.response.data.message
            setTimeout(() => {
              this.clearMessage()
              // this.clearForm()
            }, 3000);
          })
    },
    
    registerNow(){
      let newUser = this.formRegister
      api
          .post('/users/register', newUser )
          .then( user => {
            console.log(user)
            this.success = true
            this.successMsg = user.data.message
            setTimeout(() => {
              this.clearMessage()
              this.clearForm()
            }, 2500);
          })
          .catch( error => {
            console.log(error)
            this.error = true
            this.errorMsg = error.response.data.message
            setTimeout(() => {
              this.clearMessage()
              this.formRegister.password = ''
            }, 3000);
          })
    },
    logout(){
      this.isLogin = false
      localStorage.clear()
      this.$router.push('/')

      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut()
      .then(function () {
        console.log('User signed out.')
      })
    },
    clearForm(){
      this.formLogin.email = ''
      this.formLogin.password = ''
      this.formRegister.name = ''
      this.formRegister.email = ''
      this.formRegister.password = ''
    },
    clearMessage(){
      this.success = false,
      this.successMsg = '',
      this.error = false,
      this.errorMsg = ''
    }
  }
} 
</script>

<style>
.fb-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
}

.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>
