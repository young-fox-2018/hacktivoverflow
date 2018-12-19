<template>
    <b-modal id="signInModal" hide-footer ref="signInModal">
        <b-alert :show="errDismissCountDown"
                dismissible
                @dismissed="errDismissCountDown=0"
                @dismiss-count-down="countDownChanged">
            <p>{{errorMessage}}</p>
        </b-alert>
        <form @submit.prevent="submitSignIn">
            <div class="form-group">
                <label for="signInEmail">Email address</label>
                <input type="email" class="form-control" v-model="form.email"
                id="signInEmail" aria-describedby="emailHelp" placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="signInPassword">Password</label>
                <input type="password" class="form-control" v-model="form.password"
                id="signInPassword" placeholder="Password">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
            <div id="google-signin-button"></div>
    </b-modal>
</template>



<script>
import axios from '@/helpers/axios.js';

export default {
  name: 'signInModal',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      errDismissCountDown: 0,
      errorMessage: '',
      isLoggedIn: this.$store.state.isLoggedIn,
    };
  },
  mounted() {
    gapi.signin2.render('google-signin-button', {
      onsuccess: this.onSignIn
    })
  },
  methods: {
    onSignIn (user) {
      const profile = user.getBasicProfile()
      console.log("---- onSignIn",profile)
      axios({
        method: 'POST',
        data: {
          email: profile.U3,
          name: profile.ig
        },
        url: '/users/googleSignIn'
      })
      .then(({ data }) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', data.user.email);
        localStorage.setItem('userName', data.user.name);
        this.$store.dispatch('checkLog',true)
        this.hideModal();
      })
      .catch(({ response: { data } }) => {
        this.errorMessage = data.message;
        this.countDownChanged(3);
      });
    },
    countDownChanged(errDismissCountDown) {
      this.errDismissCountDown = errDismissCountDown;
    },
    submitSignIn() {
      console.log('----submit signin')
      axios({
        method: 'POST',
        data: this.form,
        url: '/users/signIn',
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userEmail', data.user.email);
          localStorage.setItem('userName', data.user.name);
          this.$store.dispatch('checkLog',true)
          this.hideModal();
        })
        .catch(({ response: { data } }) => {
          this.errorMessage = data.message;
          this.countDownChanged(3);
        });
    },
    hideModal() {
      this.$refs.signInModal.hide();
    },
    checkLog() {
      if (localStorage.token) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    },
  },
};
</script>
