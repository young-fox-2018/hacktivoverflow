<template>
    <div>
        <form id="login">
            <h1>Login</h1>
            <input type="email" name="email" v-model="input.email" placeholder="Email" />
            <br><br>
            <input type="password" name="password" v-model="input.password" placeholder="Password" />
            <br><br>
            <button @click.prevent="login()">Login</button>
        </form>
        
    </div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2'

export default {
  name: "login",
  components: {
  },
  data() {
    return {
      input: {
        email: "",
        password: ""
      },
    };
  },
  methods: {
    login() {
        let email = this.input.email
        let password = this.input.password
        axios({
            method:"post",
            url: "https://xavier-ho-server.thenile.online/ho/signin",
            data: {
                email:email,
                password:password
            }
        })
        .then((response) => {
            localStorage.setItem('token', response.data.token)
            this.$store.dispatch("decode");
            this.$emit('loggedin')
            this.$router.push('questions')
        })
        .catch((err) => {
            console.log(err.response)
            let timerInterval
            Swal({
                title: err.response.data.message,
                html: 'Auto close in <b></b> seconds.',
                type: 'error',
                confirmButtonText: 'Ok',
                backdrop: false,
                allowOutsideClick: false,
                timer: 3000,
                onBeforeOpen: () => {
                    timerInterval = setInterval(() => {
                    Swal.getContent().querySelector('b')
                        .textContent = (Swal.getTimerLeft()/1000)
                          .toFixed(0)
                    }, 100)
                },
                onClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                if (
                    // Read more about handling dismissals
                    result.dismiss === Swal.DismissReason.timer
                ) {
                    console.log('I was closed by the timer')
                }
            })
      })
    }
  },
  mounted: function() {
    this.$store.dispatch("resetError")
  }
};
</script>

<style scoped>
#login {
  width: 500px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  padding: 20px;
}
</style>