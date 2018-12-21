<template>
  <div>
    <div class="container">
      <h1>
        Sign in
      </h1>
      <div class="row">
        <div class="col-sm-3">
          <form id="signInForm" @submit.prevent="signin">
            <label><strong>Email</strong></label>
            <div class="form-group pass_show">
              <input v-model="email" type="email" class="form-control" placeholder="john@doe.com">
            </div>
            <label><strong>Password</strong></label>
            <div class="form-group pass_show">
              <input v-model="password" type="password" class="form-control" placeholder="Password">
            </div>
            <button class="btn btn-primary" type="submit">
              Submit
            </button>
            <p class="signInPrompt">doesn't have an account? sign up
              <router-link to="/signup" class="toSignup">Here</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Signin',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signin() {
        axios.request({
            method: 'POST',
            url: '/user/signin',
            data: {
              email: this.email,
              password: this.password
            }
          })
          .then(result => {
            localStorage.setItem('token', result.data.token)
            console.log(result)
            this.email = '',
              this.password = '',
              alert('Signin Success')
            this.$router.push('/')
          })
          .catch(err => {
            console.log(err)
            alert(err)
          })
      }
    }
  }

</script>

<style>
  .signInPrompt {
    margin-top: 3%
  }

  .toSignup {
    color: darkslategray;
  }

  h1 {
    text-align: center
  }

  .col-sm-3 {
    height: 40vh;
    background-color: silver;
    border-radius: 10px;
    display: flex;
    justify-content: center;
  }

  #signInForm {
    margin-top: 25px;
  }

  .row {
    display: flex;
    justify-content: center;
    vertical-align: middle
  }

</style>
