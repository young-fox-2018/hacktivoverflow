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
            <button>Facebook</button>
        </form>
        <hr>
        <loading v-if="loading" width="30px" />
    </div>
</template>

<script>
    import apiHacktiv from '@/config/api-hacktivoverflow.js';
    import Loading from '@/components/Loading.vue';
    import { mapActions } from 'vuex';
    
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
            };
        },
        methods: {
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