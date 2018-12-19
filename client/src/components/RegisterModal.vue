<template>
    <b-modal id="registerModal" hide-footer ref="registerModal">
        <b-alert :show="dismissCountDown"
                dismissible
                @dismissed="dismissCountDown=0"
                @dismiss-count-down="countDownChanged">
            <p>{{errorMessage}}</p>
        </b-alert>
        <form @submit.prevent="submitRegister">
            <div class="form-group">
                <label for="registerName">Name</label>
                <input type="text" class="form-control" id="registerName" v-model="form.name" placeholder="Enter Name">
            </div>
            <div class="form-group">
                <label for="registerEmail">Email address</label>
                <input type="email" class="form-control" id="registerEmail" aria-describedby="emailHelp" v-model="form.email" placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="registerPassword">Password</label>
                <input type="password" class="form-control" id="registerPassword" v-model="form.password" placeholder="Password">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </b-modal>
</template>

<script>

import axios from '@/helpers/axios.js';

export default {
  name: 'registerModal',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
      },
      dismissCountDown: 0,
      errorMessage: '',
    };
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    submitRegister() {
      axios({
        method: 'POST',
        url: '/users',
        data: this.form,
      })
        .then(({ data }) => {
          this.$store.dispatch('successMessage', {message: data.message})
          this.hideModal();
        })
        .catch(({ response: { data } }) => {
          this.errorMessage = data.message;
          this.countDownChanged(3);
        });
    },
    hideModal() {
      this.$refs.registerModal.hide();
    },
  },
};
</script>
