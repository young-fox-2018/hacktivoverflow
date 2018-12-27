<template>
    <div id="navbar">
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom fixed-top">
        <div class="container">
            <a class="navbar-brand text-dark" href="#"><img src="../assets/stack-magic.png" style="height: 35px" alt=""> </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link class="nav-link" to="/">Home</router-link>
                </li>
                <li class="nav-item">
                    <a href="javascript:void(0)" class="nav-link" v-b-modal.modalLogin v-if="!loginStatus">Login</a>
                </li>
                <li class="nav-item">
                    <a href="javascript:void(0)" class="nav-link" v-b-modal.modalRegister v-if="!loginStatus">Register</a>
                </li>
                <li class="nav-item" v-if="loginStatus">
                    <a href="javascript:void(0)" class="nav-link" @click="logout">{{userLoggedIn.name}}(Logout)</a>
                </li>
            </ul>
            </div>
        </div>
        </nav>
        <login-modal id="modalLogin"></login-modal>
        <register-modal id="modalRegister"></register-modal>
    </div>
</template>

<script>
import LoginModal from '@/components/login-modal.vue'
import RegisterModal from '@/components/register-modal.vue'
import {mapState, mapActions} from 'vuex'
export default {
   components: {
       LoginModal,
       RegisterModal
   },
   computed: {
       ...mapState(['loginStatus', 'userLoggedIn'])
   },
   created(){
       console.log( this.loginStatus)
   }, 
   methods: {
       ...mapActions(['isLogin']),
        logout(){
            localStorage.clear()
            this.isLogin()
            this.$router.replace('/')
        }
   }
}
</script>

<style>
#navbar{
    margin-bottom: 0%;
}

.container {
    max-width: 1264px !important;
}

.navbar-nav {
    font-size: 13px;
}
</style>

