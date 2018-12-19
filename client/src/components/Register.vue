<template>
    <div class="jumbotron jumbotron-billboard">
            <div class="img"></div>
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <h1 class="display-4">Learn, Share, Build</h1>
                        <p class="lead">Each month, over 50 million developers come to Stack Overflow to learn, share their knowledge, and build their careers.</p>
                        <hr class="my-4">
                        <p>Join the worlds largest developer community</p>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label >Email address</label>
                            <input type="email" v-model="user.email" class="form-control"  aria-describedby="emailHelp" placeholder="Enter email">
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                            <label >Username</label>
                            <input type="text" v-model="user.name" class="form-control" placeholder="Enter username">
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" v-model="user.password" class="form-control"  placeholder="Password">
                        </div>
                        <div class="row">
                            <button type="submit" href="#" class="mr-3 py-0 my-0 ml-3 btn btn-primary" @click="register">Submit</button>
                            <span class="mr-3">or</span>
                            <div class="d-flex justify-content-center" id="my-signin2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import miniToastr from 'mini-toastr'
import { mapState } from 'vuex'
import axios from 'axios'
import api from '@/api/axios'

export default {
    name: 'Register',
    data () {
        return {
            user : {}
        }
    },
    methods : {
        /* eslint-disable */
        register() {
            this.$store.dispatch('registerUser', this.user)
                .then(() => {
                })
                .catch(() => {
                    miniToastr.warn('register failed, please check your input', '', 2000)
                    //miniToastr.success('register failed, please check your input field', '', 2000)
                })
            this.user = {}
        },
		onSuccess: function(googleUser) {
			var id_token = googleUser.getAuthResponse().id_token;
            console.log(id_token)
            api({
				method: 'POST',
				url: `users/googleLogin`,
				data: {
					googleToken: id_token
				}
			})
				.then((result) => {
                    console.log(result)
					localStorage.setItem('token', result.data.token)
                    localStorage.setItem('name', result.data.name)
                    this.$store.dispatch('isLogged')
                    this.$router.push('/')
				})
				.catch((err) => {
					console.log('Google Login Error: ', err);
				});
        },
        onFailure() {
            console.log('fail')
        },
        renderButton: function() {
			gapi.signin2.render('my-signin2', {
				'scope': 'profile email',
				'width': 240,
				'height': 50,
				'longtitle': true,
				'theme': 'dark',
				'onsuccess': this.onSuccess,
				'onfailure': this.onFailure
			});
		}
    },
    computed : mapState({
        isLogin : state => state.isLogin 
    }),
    mounted() {
        miniToastr.init()
        this.renderButton()
    }
}
</script>

