<template>
    <div>
        <b-alert
            :variant="alert.variant"
            class="p-2 mt-1"
            :show="alert.dismissCountDown"
            fade
            @dismissed="alert.dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
        >{{ alert.value }}</b-alert>
        <hr>
        <form @submit.prevent="saveLogin">
            <input type="text" class="form-control form-control-sm mb-2" placeholder="E-mail" v-model="form.email" ref="email" />
            <input type="password" class="form-control form-control-sm mb-2" placeholder="Password" v-model="form.password" ref="password" />
            <button class="btn btn-outline-success btn-sm mr-2">Login</button>
            <!-- <div class="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false"></div> -->
            <!-- https://github.com/phanan/vue-facebook-signin-button -->
            <fb-signin-button
                :params="fbSignInParams"
                @success="onSignInSuccess"
                @error="onSignInError"
            >Sign in with Facebook</fb-signin-button>
        </form>
        <hr>
        <loading v-if="loading" width="30px" />
    </div>
</template>

<script>
    import apiHacktiv from '@/config/api-hacktivoverflow.js';
    import Loading from '@/components/Loading.vue';
    import { mapActions } from 'vuex';

    window.fbAsyncInit = function() {
    FB.init({
        appId      : '266928807286927',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.2'
    });
        
    FB.AppEvents.logPageView();   
        
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    
    export default {
        name: 'FormLogin',
        components: {
            Loading,
        },
        data() {
            return {
                form: {
                    email: '',
                    password: '',
                },
                loading: false,
                alert: {
                    dismissCountDown: 0,
                    showDismissibleAlert: false,
                    value: '',
                    variant: '',
                },
                fbSignInParams: {
                    scope: 'email',
                    return_scopes: true
                },
            };
        },
        methods: {
            onSignInSuccess (response) {
                FB.api('/me', dude => {
                    console.log('masuk=====', dude)
                    console.log(`Good to see you, ${dude.name}, ${dude.email}.`)
                })
            },
            onSignInError (error) {
                console.log('OH NOES', error)
            },
            ...mapActions(['checkToken']),
            saveLogin() {
                if (this.form.email === '') {
                    this.alert.dismissCountDown = 2;
                    this.alert.value = 'Email must be diisi';
                    this.alert.variant = 'danger';
                    this.$refs.email.focus();
                } else if (this.validateEmail(this.form.email) === false) {
                    this.alert.dismissCountDown = 2;
                    this.alert.value = 'Email must be correct';
                    this.alert.variant = 'danger';
                    this.$refs.email.focus();
                } else if (this.form.password === '') {
                    this.alert.dismissCountDown = 2;
                    this.alert.value = 'Password must be diisi';
                    this.alert.variant = 'danger';
                    this.$refs.password.focus();
                } else {
                    this.loading = true;
                    apiHacktiv.post(
                        `/users/login`,
                        {
                            email: this.form.email,
                            password: this.form.password,
                        },
                    )
                        .then(result => {
                            localStorage.setItem('token-hacktiv', result.data.token);
                            this.checkToken();
                        })
                        .catch(error => {
                            this.loading = false;
                            this.alert.dismissCountDown = 15;
                            this.alert.value = error.response.data.error;
                            this.alert.variant = 'danger';
                        });
                }
            },
            countDownChanged (dismissCountDown) {
                this.alert.dismissCountDown = dismissCountDown;
            },
            validateEmail(email) {
                let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return regex.test(email);
            },
        },
    };
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
</style> 