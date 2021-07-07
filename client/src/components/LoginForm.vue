<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn round slot="activator" color="primary" small>Login</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Login Form</span>
        </v-card-title>
        <v-card-text>
        <success-alert />
        <error-alert />
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <g-signin-button
                  :params="googleSignInParams"
                  @success="onSignInSuccess"
                  @error="onSignInError">
                  Sign in with Google
                </g-signin-button>
              </v-flex>
              <v-flex xs12>
               -- OR --
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="loginForm.email" label="Email*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="loginForm.password" label="Password*" type="password" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click="dialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click="loginUser">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import axios from '@/assets/dotapi';
import SuccessAlert from '@/components/SuccessAlert.vue';
import ErrorAlert from '@/components/ErrorAlert.vue';

export default {
  name: 'LoginForm',
  components: {
    SuccessAlert,
    ErrorAlert,
  },
  data() {
    return {
      dialog: false,
      loginForm: {
        email: '',
        password: '',
      },
      googleSignInParams: {
        client_id: '907636860373-hqmna18kfoam6f51f649462nup5amcha.apps.googleusercontent.com',
      },
    };
  },
  methods: {
    loginUser() {
      axios
        .post('/login',
          {
            email: this.loginForm.email,
            password: this.loginForm.password,
          })
        .then(({ data }) => {
          this.$store.commit('setSuccessMessage', data.msg);

          localStorage.setItem('token', data.token);
          localStorage.setItem('current_user', data.userId);
          localStorage.setItem('name', data.name);

          setTimeout(() => {
            this.$store.commit('setUserLoggedIn', true);
            this.dialog = false;
            this.$router.push('/');
          }, 2000);
        })
        .catch((err) => {
          this.$store.commit('setErrorMessage', err.response.data.msg);
        });
    },
    onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile();
      axios
        .post('/login/socialaccount',
          {
            name: profile.ig,
            email: profile.U3,
            provider: 'google',
            google_token: googleUser.Zi.id_token,
          })
        .then(({ data }) => {
          this.$store.commit('setSuccessMessage', data.msg);

          localStorage.setItem('token', data.token);
          localStorage.setItem('current_user', data.userId);
          localStorage.setItem('name', data.name);

          setTimeout(() => {
            this.$store.commit('setUserLoggedIn', true);
            this.dialog = false;
          }, 2000);
        })
        .catch((err) => {
          this.$store.commit('setErrorMessage', err.response.data.msg);
        });
    },
    onSignInError(error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error);
    },
  },
};
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
.v-card__text, .v-text-field {
  padding: 0;
}
button {
  margin: 0;
  padding: 0;
}
</style>
