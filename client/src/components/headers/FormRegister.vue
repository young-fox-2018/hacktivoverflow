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
        <form @submit.prevent="saveRegister">
            <input type="text" class="form-control form-control-sm mb-2" placeholder="Full Name" v-model="form.name" ref="name" />
            <input type="text" class="form-control form-control-sm mb-2" placeholder="E-mail" v-model="form.email" ref="email" />
            <input type="password" class="form-control form-control-sm mb-2" placeholder="Password" v-model="form.password" ref="password" />
            <input type="password" class="form-control form-control-sm mb-2" placeholder="Retype Password" v-model="form.password2" ref="password2" />
            <button class="btn btn-outline-success btn-sm mr-2">Register</button>
        </form>
        <hr>
        <loading v-if="loading" width="30px" />
    </div>
</template>

<script>
    import apiHacktiv from '@/config/api-hacktivoverflow.js';
    import Loading from '@/components/Loading.vue';
    
    export default {
        name: 'FormRegister',
        components: {
            Loading,
        },
        data() {
            return {
                form: {
                    name: '',
                    email: '',
                    password: '',
                    password2: '',
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
            saveRegister() {
                if (this.form.name === '') {
                    this.alert.dismissCountDown = 2;
                    this.alert.value = 'Full name must be diisi';
                    this.alert.variant = 'danger';
                    this.$refs.name.focus();
                } else if (this.form.email === '') {
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
                } else if (this.form.password2 === '') {
                    this.alert.dismissCountDown = 2;
                    this.alert.value = 'Retype Password must be diisi';
                    this.alert.variant = 'danger';
                    this.$refs.password2.focus();
                } else if (this.form.password !== this.form.password2) {
                    this.alert.dismissCountDown = 2;
                    this.alert.value = 'Password no match, please entry again';
                    this.alert.variant = 'danger';
                    this.form.password = '';
                    this.form.password2 = '';
                    this.$refs.password.focus();
                } else {
                    this.loading = true;
                    apiHacktiv.post(
                        `/users/register`,
                        {
                            name: this.form.name,
                            email: this.form.email,
                            password: this.form.password,
                        },
                    )
                        .then(result => {
                            this.loading = false;
                            this.alert.dismissCountDown = 100;
                            this.alert.value = 'Successfully registration, please login..., and plaese check email to on spam folder if not masuk';
                            this.alert.variant = 'success';
                            this.form.name = '';
                            this.form.email = '';
                            this.form.password = '';
                            this.form.password2 = '';
                            this.$refs.name.focus();
                        })
                        .catch(error => {
                            this.loading = false;
                            this.alert.dismissCountDown = 10;
                            this.alert.value = error.response.data.error;
                            this.alert.variant = 'danger';
                            this.$refs.email.focus();
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