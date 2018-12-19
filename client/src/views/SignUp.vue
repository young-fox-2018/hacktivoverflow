<template>
    <div class="container">
        <div v-if="!member" class="col-xs-4" style="margin: 0 auto; top: 15%; left: 25%">
        <h1> Registration Form </h1>
            <div class="well">
                <form id="signUpForm" @submit.prevent="register">
                    <div class="form-group">
                        <label for="email" class="control-label">Email</label>
                        <input type="text" class="form-control" v-model="reg.email" title="Please enter your email" placeholder="example@gmail.com">
                        <span class="help-block"></span>
                    </div>
                    <div class="form-group">
                        <label for="username" class="control-label">Username</label>
                        <input type="text" class="form-control" v-model="reg.username" placeholder="Please enter your username">
                        <span class="help-block"></span>
                    </div>
                    <div class="form-group">
                        <label for="password" class="control-label">Password</label>
                        <input type="password" class="form-control" v-model="reg.pass" placeholder="Please enter your password">
                        <span class="help-block"></span>
                    </div>
                    <button @click.prevent="isMember" class="btn btn-warning btn-block">Already A Member?</button>
                    <button type="submit" class="btn btn-primary btn-block">Register</button>
                </form>
            </div>
        </div>
        <br>
        <div v-if="member" class="col-xs-4" style="margin: 0 auto; top: 15%; left: 25%">
            <h1> Log In Form </h1>
            <div class="well">
                <form id="loginForm" @submit.prevent="logIn">
                    <div class="form-group">
                        <label for="email" class="control-label">Email</label>
                        <input type="text" class="form-control" v-model="email" title="Please enter you email" placeholder="example@gmail.com">
                        <span class="help-block"></span>
                    </div>
                    <div class="form-group">
                        <label for="password" class="control-label">Password</label>
                        <input type="password" class="form-control" v-model="pass" placeholder="Please enter your password">
                        <span class="help-block"></span>
                    </div>
                      <g-signin-button
                        :params="googleSignInParams"
                        @success="onSignInSuccess"
                        @error="onSignInError">
                        Sign in with Google
                      </g-signin-button>
                    <button @click.prevent="isMember" class="btn btn-warning btn-block">Not A Member?</button>
                    <button type="submit" class="btn btn-primary btn-block">Login</button>
                </form>
            </div>
        </div>

    </div>
</template>

<script>
import axios from '@/helpers/axios'

export default {
    name: 'SignUp',
    data: function(){
        return {
            reg:{
                email: "",
                pass: "",
                username: ""
            },
            email: "",
            pass: "",
            member: false,
            googleSignInParams: {
                client_id: '401784407191-s4qcfut6p5u9ctico62kmnoareknongr.apps.googleusercontent.com'
            }
        }
    },
    mounted() {
        gapi.signin2.render('google-signin-button', {
            onsuccess: this.onSignIn
        })
    },
    methods:{
        isMember(){
            this.member = !this.member
        },
        register () {
            axios.post('/signUp', {
                email: this.reg.email,
                password: this.reg.pass,
                username: this.reg.username
            }).then (response => {
                this.email = this.reg.email
                this.pass = this.reg.pass
                this.logIn()
            }).catch (err => {
                this.$store.dispatch('errmsg', err.response.data)
            })
        },
        logIn(){
            axios.post('/signIn', {
                email: this.email,
                password: this.pass
            }).then (response => {
                localStorage.setItem('token', response.data.details.token)
                localStorage.setItem('userId', response.data.details.userId)
                localStorage.setItem('username', response.data.details.username)
                this.$store.dispatch('logIn', {status: true, details: response.data.details}) 
                this.$store.dispatch('okmsg', {msg: "You Have Successfully Signed In"})
                this.$router.push('/')
            }).catch (err => {
                this.$store.dispatch('errmsg', err.response.data)
            })
        },
        onSignInSuccess (googleUser) {
            const profile = googleUser.getBasicProfile()

            let user_token = googleUser.getAuthResponse().id_token;
            axios.post(`/gSignIn`,{token: user_token})
            .then(response => {
                localStorage.setItem('token', response.data.details.token)
                localStorage.setItem('userId', response.data.details.userId)
                localStorage.setItem('username', response.data.details.username)
                this.$store.dispatch('logIn', {status: true, details: response.data.details}) 
                this.$store.dispatch('okmsg', {msg: "You Have Successfully Signed In Using Your Google Account"})
                this.$router.push('/')
            })
            .catch(err => {
                console.log(err,"kok bisa error? di signIn")
                this.$store.dispatch('errmsg', err.response.data)
            })
        },
        onSignInError (error) {
            console.log(error)
            this.$store.dispatch('errmsg', error)
        }
    },

}
</script>

<style>
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
