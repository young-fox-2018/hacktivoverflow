<template>
    <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light">
        <div class="container">
            <a class="navbar-brand">
                <router-link to="/"><img src="http://forum.azyrusthemes.com/images/logo.jpg" width="50px" height="50px" alt="logo">
                Hacktiv<span><strong>Overflow</strong></span></router-link>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li class="nav-item active">
                        <router-link to="/"> <a class="nav-link" >Questions <span class="sr-only">(current)</span></a></router-link>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
                <ul class="navbar-nav mt-2 mt-lg-0">
                    <li class="nav-item mx-2 active">
                        <router-link v-if="isLogin" to="/question/add"><button type="button" class="btn btn-primary text-white nav-link"> Add Question </button></router-link>
                        <button v-else v-b-modal.loginModal type="button" class="btn btn-primary text-white nav-link"> Add Question </button>

                    </li>
                    <li class="nav-item no-caret dropdown">
                        <a class="nav-link dropdown-toggle"  id="dropdownMenuOffset" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  data-offset="-10,-50">
                        <span style="color: DodgerBlue"> <i class="fas fa-user fa-lg"></i></span>
                        </a>
                        <div v-if="isLogin" class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuOffset">                      
                            <span  class="dropdown-item" style="color: DodgerBlue"> <i class="fas fa-user fa-lg mr-1"/> <a  > Profile</a></span>
                            <span  @click="signOut" class="dropdown-item" style="color: DodgerBlue"> <i class="fas fa-sign-out-alt fa-lg mr-1"/> <a  > Logout</a></span>
                        </div>
                        <div v-else class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuOffset">
                            <span v-b-modal.loginModal class="dropdown-item" style="color: DodgerBlue"> <i class="fas fa-sign-in-alt fa-lg mr-1"/> <a  > Login</a></span>
                            <span v-b-modal.registerModal class="dropdown-item" style="color: DodgerBlue"> <i class="fas fa-user-plus fa-lg mr-1"/> <a  > Sign Up</a></span>
                        </div>
                    </li>
                </ul>
            </div>
            <b-modal    id="loginModal" 
                        ref="loginModal" hide-footer
                        title="Hi, Welcome to HacktivOverflow"
                        @shown="clear">
                <b-form class="container" @submit.stop.prevent="handleLogin" @reset="onReset">
                    <b-form-group>
                        <b-row class="my-1">
                            <b-col sm="3"><label>Email</label></b-col>
                            <b-col sm="9"><b-form-input type="email"
                                    placeholder="Enter your email"
                                    v-model="login.email" required></b-form-input></b-col>
                            <br><br>
                            <b-col sm="3"><label>Password</label></b-col>
                            <b-col sm="9"><b-form-input type="password"
                                    placeholder="Enter your password"
                                    v-model="login.password" required></b-form-input></b-col>
                            
                        </b-row>
                    </b-form-group> 
                    <b-button type="submit" class="mr-2" variant="primary">Submit</b-button>
                    <b-button type="reset" variant="danger">Reset</b-button>
                    <!-- <g-signin-button
                        :params="googleSignInParams"
                        @success="onSignInSuccess"
                        @error="onSignInError">
                        Sign in with Google
                    </g-signin-button> -->
                </b-form>
            </b-modal>
            <b-modal    id="registerModal" 
                        ref="registerModal" hide-footer
                        title="Ask a question now..."
                        @shown="clear">
                <b-form class="container" @submit.stop.prevent="handleRegister" @reset="onReset">
                    <b-form-group>
                        <b-row class="my-1">
                            <b-col sm="3"><label>Email</label></b-col>
                            <b-col sm="9"><b-form-input type="email"
                                    placeholder="Enter your email"
                                    v-model="register.email" required></b-form-input></b-col>
                            <br><br>
                            <b-col sm="3"><label>Password</label></b-col>
                            <b-col sm="9"><b-form-input type="password"
                                    placeholder="Enter your password"
                                    v-model="register.password" required></b-form-input></b-col>
                            <br><br>
                            <b-col sm="3"><label>Your Name</label></b-col>
                            <b-col sm="9"><b-form-input type="text"
                                    placeholder="Enter your name"
                                    v-model="register.name" required></b-form-input></b-col>
                            <br><br>
                        </b-row>
                    </b-form-group> 
                    <b-button class="mr-2" type="submit" variant="primary">Submit</b-button>
                    <b-button type="reset" variant="danger">Reset</b-button>
                    <div class="float-right">
                        <b-button class="mr-2" type="submit" variant="primary">FB</b-button>
                        <b-button type="reset" variant="danger">G</b-button>
                    </div>
                </b-form>
            </b-modal>
        </div>
    </nav>
</template>

<script>
import blogapi from '@/api/axios';
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
export default {
    name: 'navbar',
    computed : {
        isLogin () {
            return this.$store.state.isLogin
        }
    },
    data () {
        return { 
            login : {
                email : '',
                password : ''
            },
            register : {
                email : '',
                password : '',
                name: ''
            },
            googleSignInParams: {
                client_id: '252228893526-62b5adfrhp8hod7ap16gbit19fuu1p7l.apps.googleusercontent.com'
            }
        }
    },
    watch :{
        isLogin: function (val) {
            if (this.isLogin === false) {
                localStorage.clear();
            }
        }
    },
    methods : {
        ...mapActions([
            'signOut','checkToken'
        ]),
        handleLogin() {
            blogapi
            .post('login', {
                email : this.login.email,
                password : this.login.password
            })
            .then(({data}) =>{
                localStorage.setItem('token', data.token)
                localStorage.setItem('email', data.email)
                localStorage.setItem('userId', data.id)
                this.checkToken()
                this.$refs.loginModal.hide()
            })
            .catch(err => {
                console.log(err.message)
            })
            this.$refs.loginModal.hide()
        },
        handleRegister(){
            blogapi
            .post('register', {
                email : this.register.email,
                password : this.register.password,
                name : this.register.name
            })
            .then(({data}) => {
                this.login.email = this.register.email
                this.login.password = this.register.password
                this.$refs.registerModal.hide()
                this.handleLogin()
            })
            .catch(({response:{data:{message}}}) => {
                console.log(message)
                alert(message)
            })
        },
        onReset (evt) {
            evt.preventDefault();
            this.clear;
            this.$nextTick(() => { this.show = true });
        },
        clear(){
            this.login.email = '';
            this.login.password = '';
        },
        onSignInSuccess (googleUser) {
            // `googleUser` is the GoogleUser object that represents the just-signed-in user.
            // See https://developers.google.com/identity/sign-in/web/reference#users
            const profile = googleUser.getBasicProfile() // etc etc
            console.log(profile)
        },
        onSignInError (error) {
            // `error` contains any error occurred.
            console.log('OH NOES', error)
        }
    }
}
</script>

<style scoped>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
nav{
    font-family: 'Open Sans', sans-serif;
    color: #989c9e;
}
a{
    color: #00C073 !important;
}
a span{
    color: #00A5E2;
}
.dropdown-item a:hover{
    color: #fff !important;
}
.container .dropdown .dropdown-menu .dropdown-item:hover{
  color: #fff !important;
  background-color: #00C073;
  border-color: #fff;
}

.dropdown-toggle::after {
    display:none;
}
</style>

