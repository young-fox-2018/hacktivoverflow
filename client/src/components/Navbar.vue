<template>
    <b-navbar toggleable="md" type="light" variant="info" class="bg-transparent background-custom">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <router-link to="/">
            <img src="@/assets/scatter.png" width="auto" height="40px" alt="">
            <b-navbar-brand href="#">Scatter <b style="color: orange"> Overflow </b></b-navbar-brand>
        </router-link>

        <b-collapse is-nav id="nav_collapse">
           <b-navbar-nav class="mr-auto ml-auto">
               <form @submit.prevent="searchArticle" class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"  v-model="searchQuery">
                    <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                </form>
          </b-navbar-nav>

          <b-navbar-nav v-if="!isLoggedIn" >
              <b-btn v-b-modal="'signInModal'" variant="primary">Sign In</b-btn>
              <b-btn v-b-modal="'registerModal'" variant="outline">Register</b-btn>
          </b-navbar-nav>

          <b-navbar-nav v-if="isLoggedIn" >
            <b-nav-item-dropdown text="Profile" right>
              <b-dropdown-item>
                Welcome {{userName}}
              </b-dropdown-item>
                <b-dropdown-item href="#"
                @click='toMyQuestion'>
                    My Question
                </b-dropdown-item>
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
            dismissCountDown: 0,
            searchQuery: ''
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
            if(localStorage.provider){
                var auth2 = gapi.auth2.getAuthInstance();

                auth2.signOut().then(function () {
                    console.log('User signed out.');
                })
                localStorage.clear()
                this.$store.dispatch('checkLog',false)
            }
            else {
                localStorage.clear();
                this.$store.dispatch('checkLog',false)
            }
        },
        searchArticle(){
            this.$router.push('/?search='+ this.searchQuery )
        },
        toMyQuestion(){
            this.$router.push('/user')
        }
    },
}

</script>

<style scoped>
.background-custom{
    background-color: white !important;
} 
</style>

