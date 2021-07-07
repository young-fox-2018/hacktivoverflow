<template>
   <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" flat small>Register</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Register Form</span>
        </v-card-title>
        <v-card-text>
        <success-alert />
        <error-alert />
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="registerForm.name" :rules="nameRules" label="Display Name" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="registerForm.email" :rules="emailRules" label="Email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="registerForm.password" :rules="passwordRules" label="Password" type="password" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click="dialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click="registerUser">Register</v-btn>
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
  name: 'RegisterForm',
  components: {
    SuccessAlert,
    ErrorAlert,
  },
  data() {
    return {
      dialog: false,
      registerForm: {
        name: '',
        email: '',
        password: '',
      },
      emailRules: [
        v => !!v || 'E-mail is required. Don\'t worry, we hate spam as well.',
        v => /.+@.+/.test(v) || 'E-mail must be valid. '
      ],
      nameRules: [
        v => !!v || 'Name cannot be empty. What should we call you then?',
        // v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      passwordRules: [
        v => !!v || 'Login without password, seriously?'
      ]
    };
  },
  methods: {
    registerUser() {
      console.log('inside method registeruser');
      axios
        .post('/register',
          {
            name: this.registerForm.name,
            email: this.registerForm.email,
            password: this.registerForm.password,
          })
        .then(({ data }) => {
          this.$store.commit('setSuccessMessage', data.msg);
          this.registerForm.name = '';
          this.registerForm.email = '';
          this.registerForm.password = '';
        })
        .catch(err => {
          this.$store.commit('setErrorMessage', err.response.data.msg);
        });
    },
  },
};
</script>

<style scoped>
button {
  margin: 0;
  padding: 0;
}
</style>
