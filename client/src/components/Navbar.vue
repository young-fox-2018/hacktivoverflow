<template>
    <div class="mb-5"> 
        <nav class="navbar navbar-expand-lg fixed-top mb-4" style="background-color: #1D3557;">
            <div class="container">

                <router-link to="/" class="" style="color:#F1FAEE;">hacktivOverflow</router-link>

                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <div class="nav-link" v-show="!isLoggedIn" id="my-signin2"></div>
                        </li>
                        <li class="nav-item">
                            
                            <b-btn 
                                class="nav-link" 
                                variant="link" 
                                v-if="!isLoggedIn"
                                style="color:#F1FAEE;"
                                @click="showLoginModal=true; showAlert=false"
                                > Login
                            </b-btn> 
                        </li>
                        <li class="nav-item">
                            <b-btn 
                                class="nav-link" 
                                variant="link" 
                                v-if="!isLoggedIn"
                                style="color:#F1FAEE;" 
                                @click="showRegisterModal=true; showAlert=false"
                                > Register
                            </b-btn>
                        </li>
                        <li class="nav-item">
                            <b-btn 
                                class="nav-link" 
                                variant="link" 
                                style="color:#F1FAEE;"
                                v-show="isLoggedIn"
                                @click="logout"
                                > Logout
                            </b-btn>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


        <!-- Login modal -->
        <b-modal v-model="showLoginModal" title="Login">
            <b-form >
                <b-form-group label="Email address:">
                    <b-form-input 
                        type="email"
                        v-model="inputLogin.email"
                        required
                        placeholder="Enter email">
                    </b-form-input>
                </b-form-group>
                <b-form-group label="Password:">
                    <b-form-input 
                        type="password"
                        v-model="inputLogin.password"
                        required
                        placeholder="Enter password">
                    </b-form-input>
                </b-form-group>
                <b-alert 
                    variant="danger"
                    :show="showAlert"
                    fade
                    @dismissed="showAlert=false">
                    {{ errorMessage }}
                </b-alert>
            </b-form>
            <div slot="modal-footer" class="w-100">

                
                <!-- <div class="g-signin2" data-onsuccess="onSuccess"></div> -->

                <b-btn size="sm" class="float-right" variant="primary" @click="login">Login</b-btn>
            </div>
        </b-modal>

        <!-- Register modal -->
        <b-modal v-model="showRegisterModal" title="Register">
            <b-form >
                <b-form-group label="Name:">
                    <b-form-input type="text"
                                v-model="inputRegister.name"
                                required
                                placeholder="Enter name">
                    </b-form-input>
                </b-form-group>
                <b-form-group label="Email address:">
                    <b-form-input type="email"
                                v-model="inputRegister.email"
                                required
                                placeholder="Enter email">
                    </b-form-input>
                </b-form-group>
                <b-form-group label="Password:">
                    <b-form-input type="password"
                                v-model="inputRegister.password"
                                required
                                placeholder="Enter password">
                    </b-form-input>
                </b-form-group>
                <b-form-group label="Birthday:">
                    <b-form-input type="date"
                                v-model="inputRegister.birthday"
                                required
                                >
                    </b-form-input>
                </b-form-group>
                <b-alert variant="danger"
                    :show="showAlert"
                    fade
                    @dismissed="showAlert=false">
                    {{ errorMessage }}
                </b-alert>
            </b-form>
            <div slot="modal-footer" class="w-100">
                <b-btn size="sm" class="float-right" variant="primary" @click="register">Register</b-btn>
            </div>
        </b-modal>



    </div>
</template>

<script>
import axios from '@/api/hacktivOverflow-api.js'
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState(['isLoggedIn']) 
    },
    data() {
        return {
            showLoginModal: false,
            showRegisterModal: false,
            inputLogin: {
                email: "",
                password: ""
            }, 
            inputRegister: {
                name: "",
                email: "",
                password: "",
                birthday: ""
            },
            showAlert: false,
            errorMessage: ""
        };
    },

    methods: {
        onSuccess: function(googleUser) {
			var id_token = googleUser.getAuthResponse().id_token;

            axios({
				method: 'POST',
				url: `/googleLogin`,
				data: {
					googleToken: id_token
				}
			})
				.then((result) => {

					localStorage.setItem('accesstoken', result.data.accesstoken)
                    localStorage.setItem('email', result.data.email)
                    this.$store.dispatch('checkToken')
                    this.$router.push('/')
				})
				.catch((err) => {
					console.log('Google Login Error: ', err.response);
				});
        },

        onFailure() {
            console.log('fail')
        },

        renderButton: function() {
			gapi.signin2.render('my-signin2', {
				'scope': 'profile email',
				'width': 150,
				'height': 30,
				'longtitle': true,
				'theme': 'dark',
				'onsuccess': this.onSuccess,
				'onfailure': this.onFailure
			});
		},

        logout: function() {
            var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                console.log('User signed out.');
            });
            localStorage.removeItem('accesstoken')
            localStorage.removeItem('email')
            this.$store.dispatch('checkToken')
            this.$router.push('/')
        },

        login: function() {
            axios({
                method: 'POST',
                url: 'login',
                data: {
                    email: this.inputLogin.email,
                    password: this.inputLogin.password
                }
            })
            .then( response => {
                localStorage.setItem('accesstoken', response.data.accesstoken)
                localStorage.setItem('email', response.data.email)
                this.$store.dispatch('checkToken')
                this.showLoginModal = false
                this.$router.push('/')
                this.inputLogin = {
                    email: "",
                    password: ""
                }
            })
            .catch( err => {
                this.errorMessage = err.response.data.message
                this.showAlert = true
            })
        },

        register: function() {
            let birthday = moment(this.inputRegister.birthday).format('DD-MM')
            axios({
                method: 'POST',
                url: 'register',
                data: {
                    name: this.inputRegister.name,
                    email: this.inputRegister.email,
                    password: this.inputRegister.password,
                    birthday: birthday
                }
            })
            .then( response => {
                this.showRegisterModal = false
                this.$toasted.success(
                    `${response.data.message}`, 
                    { 
                        theme: "outline", 
                        position: "top-right", 
                        duration : 5000
                    }
                )
                this.inputRegister = {
                    name: "",
                    email: "",
                    password: ""
                }
            })
            .catch( err => {
                this.errorMessage = err.response.data.err
                this.showAlert = true
            })
        },
    },

    mounted() {
        this.renderButton()
    }

}
</script>