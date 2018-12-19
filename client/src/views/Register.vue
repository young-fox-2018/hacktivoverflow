<template>
    <div>
        <b-container class="mt-5">
            <b-row>
                <b-col cols="3"></b-col>
                <b-col cols="6">
                    <b-card title="Register">
                        <hr>
                        <b-form-group label="Name:">
                            <b-form-input v-model="name" type="text" placeholder="John Doe"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Birth date:">
                            <b-form-input v-model="birthday" type="date"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Email:">
                            <b-form-input v-model="email" type="email" placeholder="user@mail.com"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Password:">
                            <b-form-input v-model="password" type="password" placeholder="myPassword123!@#"></b-form-input>
                        </b-form-group>
                        <b-button @click.prevent="register" type="submit" variant="secondary" block class="mt-4 mb-4">Submit</b-button>
                        <p class="text-muted" style="text-align: center;">Already have an account? <router-link to="/login" style="text-decoration: none;">login</router-link> here.</p>
                    </b-card>
                </b-col>
                <b-col cols="3"></b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import db from '@/api/server.js'

export default {
    name: 'register',
    data() {
        return {
            name: '',
            birthday: '',
            email: '',
            password: ''
        }
    },
    methods: {
        register() {
            let data = {
                name: this.name,
                birthday: this.birthday,
                email: this.email,
                password: this.password
            }
            db.request({
                url: 'users/register',
                method: 'POST',
                data
            })
            .then(({data}) => {
                let loginData = {
                    email: data.newUserData.email,
                    password: this.password
                }
                return db.request({
                    url: 'users/login',
                    method: 'POST',
                    data: loginData
                })
            })
            .then(({data}) => {
                localStorage.setItem('token', data)
                this.name = ''
                this.birthday = ''
                this.email = ''
                this.password = ''
                this.$store.dispatch('actionUserLoggedIn')
                this.$router.push('/')
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
}
</script>
