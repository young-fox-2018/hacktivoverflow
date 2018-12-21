<template>
<div class="signupPage">
    <div class="container">
      <h1>Sign up</h1>
      <div class="row">
        <div class="col-3">
          <form id="signUpForm" @submit.prevent="signup">
            <label><strong>Full Name</strong></label>
            <div class="form-group pass_show">
              <input v-model="fullName" type="text" class="form-control" placeholder="john doe">
            </div>
            <label><strong>Email</strong></label>
            <div class="form-group pass_show">
              <input v-model="email" type="email" class="form-control" placeholder="john@doe.com">
            </div>
            <label><strong>Password</strong></label>
            <div class="form-group pass_show">
              <input v-model="password" type="password" class="form-control" placeholder="Password">
            </div>
            <label><strong>Birth Date</strong></label>
            <div class="form-group pass_show">
              <input v-model="birthDate" type="date" class="form-control" placeholder="birth date">
            </div>
            <button class="btn btn-primary" type="submit">
                Submit
            </button>
            <p class="signUpPrompt">already have an account? sign in 
                <router-link to="/signin" class="toSignin">Here</router-link>    
            </p>
          </form>
        </div>
      </div>
    </div>
</div>
</template>

<script>

export default {
    name: 'Signup',
    data() {
      return {
        fullName: '',
        email: '',
        password: '',
        birthDate: ''
      }
    },
    methods: {
      signup() {
        axios.request({
          method: 'POST',
          url: '/user/signup',
          data: {
            fullName: this.fullName,
            email: this.email,
            password: this.password,
            birthDate: this.birthDate
          }
        })
          .then(result =>  {
            this.fullName = '',
            this.email = '',
            this.password = '',
            this.birthDate = ''
            localStorage.setItem('token', result.token)
            alert('Signup Success')
            this.$router.push('/')
          })
          .catch(err => {
            alert(err)
          })
      }
  }
}
</script>

<style>
.signUpPrompt {
    margin-top: 3%
}
.col-3 {
  height: 63vh;
  background-color: silver;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  border-right: 0;
}
#signUpForm {
    margin-top: 25px;
}
.row {
    display: flex;
    justify-content: center;
    vertical-align: middle

}
.toSignin {
  color: darkslategray;
}
h1 {
  text-align: center
}
.pass_show .ptxt:hover{color: #333333;} 
</style>

