<template>
 <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="email" name="email" label="Email" type="text" v-model="email"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Password" type="password" v-model="password"></v-text-field>            
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark @click="login">
                    <v-icon dark left>send</v-icon>Login
                </v-btn>
                <div class="g-signin2" data-onsuccess="onSignIn" id="google-signin-button" data-theme="dark" target="_blank"></div>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>


<script>
export default {
    name: 'signIn',
    data () {
        return {
            email: '',
            password: ''
        }
    },
    mounted () {
            gapi.signin2.render('google-signin-button', {
            onsuccess: this.onSignIn
            })
    },
    methods: {
        login () {
            axios({
                method: `POST`,
                url: `http://localhost:3000/users/sign`,
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then((userLogin) => {
                localStorage.setItem('token', userLogin.data.token)
                localStorage.setItem('name', userLogin.data.name)
                localStorage.setItem('avatar', userLogin.data.avatar)
                localStorage.setItem('userId', userLogin.data._id)
                this.$store.dispatch('getUserLogin', userLogin.data)
                this.$store.dispatch('actionUserLogIn')
                this.$router.push('/')
            })
            .catch((err) => {
                console.log(err)
            })
        },
     
        onSignIn (user) {
            const profile = user.getBasicProfile()
            const token = user.getAuthResponse().id_token
            axios({
                method: `POST`,
                url:`http://localhost:3000/users/sign`,
                data: {
                    googleToken: token
                }
            })
            .then((googleToken) => {
                console.log(googleToken)
                localStorage.setItem('token', googleToken.data.token)
                this.$store.dispatch('actionUserLogIn')
                this.$router.push('/')
            })
            .catch((err) => {
                console.log(err)
            })
            
        },
       
    }
}
</script>
