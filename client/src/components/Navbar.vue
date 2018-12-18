<template>
    <b-navbar toggleable="md" type="light" variant="info" class="bg-transparent">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <img src="@/assets/scatter.png" width="auto" height="40px" alt="">
        <b-navbar-brand href="#">Scatter <b> Overflow </b></b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">
           <b-navbar-nav class="mr-auto ml-auto">
               <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
          </b-navbar-nav>

          <b-navbar-nav v-if="!isLoggedIn" >
              <b-btn v-b-modal="'signInModal'" variant="primary">Sign In</b-btn>
              <b-btn v-b-modal="'registerModal'" variant="outline">Register</b-btn>
          </b-navbar-nav>

          <b-navbar-nav v-if="isLoggedIn" >
            <b-nav-item-dropdown text="Profile" right>
              <b-dropdown-item>
                Welcome {{usersName}}
              </b-dropdown-item>
                <!-- <b-dropdown-item href="#"
                @click='toMyArticles'>
                    My Article
                </b-dropdown-item> -->
                <b-dropdown-item href="#" @click="logOut">
                    Log Out
                </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>

        <sign-in-modal />
        <register-modal />

        

    </b-navbar>
</template>

<script>
import SignInModal from '@/components/SignInModal.vue';
import RegisterModal from '@/components/RegisterModal.vue';

export default {
    name: 'Navbar',
    data: function() {
        return{
            userName: localStorage.getItem('userName'),
            dismissCountDown: 0
        }
    },
    components: {
        SignInModal,
        RegisterModal,
    },
    computed: {
        isLoggedIn(){
            return this.$store.state.isLoggedIn
        }
    },
    created(){
        this.checkLog()
    },
    methods: {
        checkLog(){
            if (localStorage.token) {
                this.$store.dispatch('checkLog',true)
            } else {
                this.$store.dispatch('checkLog',false)
            }
        },
        logOut() {
            localStorage.clear();
            this.$store.dispatch('checkLog',false)
        },
    },
}

</script>
