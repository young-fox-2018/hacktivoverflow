<template>
    <div>
        <form id="register">
            <h1>Join Us and Be Connected</h1>
            <input type="text" name="name" v-model="input.name" placeholder="Username" />
            <br><br>
            <input type="email" name="email" v-model="input.email" placeholder="Email" />
            <br><br>
            <input type="password" name="password" v-model="input.password" placeholder="Password" />
            <br><br>
            <button @click.prevent="register()">Register</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2'

export default {
  name: "Register",
  components: {
  },
  data() {
    return {
      input: {
        email: "",
        password: "",
        name: ""
      },
    };
  },
  methods: {
    register() {
        document.getElementById('register').reset()
        let email = this.input.email
        let password = this.input.password
        let name = this.input.name
        axios({
            method:"post",
            url: "https://xavier-ho-server.thenile.online/ho/signup",
            data: {
                name:name,
                email:email,
                password:password
            }
        })
        .then((response) => {
            localStorage.setItem('token', response.data.token)
            this.$emit('loggedin')
            this.$store.dispatch("decode");
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
#register {
  width: 500px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  padding: 20px;
}
h1 {
    font-size: 28px
}

</style>