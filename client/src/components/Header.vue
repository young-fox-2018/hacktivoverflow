<template>
    <div>
        <nav class="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
        <div class="container">
            <img src="../assets/logo.png" alt="" style="max-width:40px">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <router-link :to="{path: '/'}">
            <div class="navbar-brand ml-2">Hacktiv Overflow</div>
            </router-link>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                </ul>
                <div class="form-inline my-2 my-lg-0">
                <button v-if="!isLogin" class="btn btn-outline-success my-2 my-sm-0 ml-3" data-toggle="modal" data-target="#loginModal" type="submit">Sign In</button>
                <router-link :to="'/mypost'">
                    <button v-if="isLogin" class="btn btn-outline-success my-2 my-sm-0 ml-3" type="submit">My Account</button>
                </router-link>
                <button v-if="isLogin" class="btn btn-outline-success my-2 my-sm-0 ml-3" @click="signOut">Sign Out</button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Modal login -->
    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title">Login Page</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input v-model="user.email" type="email" class="form-control"  aria-describedby="emailHelp" placeholder="Enter email">
                        </div>
                        <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input v-model="user.password" type="password" class="form-control"  placeholder="Password">
                        </div>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="login">Submit</button>
                    </form>
                </div>
            </div>
            </div>
        </div>
    </div>
    
</template>

    
<script>
import { mapState } from 'vuex'
import miniToastr from 'mini-toastr'

export default {
    data () {
        return {
            user : {}
        }
    },
    computed : mapState({
        isLogin : state => state.isLogin 
    }),
    methods : {
        login() {
            this.$store.dispatch('loginUser', this.user)
                .then(() => {

                })
                .catch(() => {
                    miniToastr.warn('login failed, please check your input', '', 2000)
                })
            this.user = {}
        },
        signOut() {
            let self = this
            // //self.$store.dispatch('logoutUser')
            // //self.$store.dispatch('logoutUser')]
            
            // var auth2 = gapi.auth2.getAuthInstance();
            // auth2.signOut().then(function () {
            //     console.log('User signed out.')
            //     self.$store.dispatch('logoutUser')
            //     self.$router.replace("/")
            // });
            self.$store.dispatch('logoutUser')
            self.$router.replace("/")
        }
    },
    created() {
        //this.onLoad()
    },
    mounted() {
    }
}
</script>
