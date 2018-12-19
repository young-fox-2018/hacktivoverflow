<template>
    <div class="navbar navbar-light fixed-top" style="background-color: #F0FE94;">
        <span class="navbar-brand">
            <img src="" class="border border-danger rounded" style="width: 50px; height: auto;" />
            <router-link style="font-family: 'Lobster', cursive; color: black" to="/"><b>Zainal HacktivOverflow</b></router-link>
        </span>
        <div class="form-inline mt-2 mt-md-0">
            <form>
                <div class="input-group mr-1">
                    <input
                        class="form-control"
                        type="text"
                        placeholder="Search Question"
                        autocomplete="off"
                        style="font-family: 'Lobster', cursive;"
                    />
                    <span class="input-group-append">
                        <button class="btn btn-outline-warning" type="submit">
                            <i class="fa fa-user"></i>
                        </button>
                    </span>
                </div>
            </form>
            <span v-if="userAktif">
                <b-btn class="btn btn-outline-warning mr-1" id="formProfile">
                    {{ userAktif.email }}
                    <span style="color: red;" v-if="notif"><i class="fa fa-bell"></i> {{ notif }}</span>
                </b-btn>
                <b-popover
                    target="formProfile"
                    placement="auto"
                ><form-profile/></b-popover>
                <b-btn
                    class="btn btn-outline-warning mr-1"
                    @click="logout"
                ><i class="fa fa-user"></i> Logout</b-btn>
            </span>
            <span v-if="!userAktif">
                <b-btn
                    id="formLogin"
                    class="btn btn-outline-warning mr-1"
                ><i class="fa fa-user"></i> Login</b-btn>
                <b-popover
                    target="formLogin"
                    placement="auto"
                ><FormLogin /></b-popover>
                <b-btn
                    id="formRegister"
                    class="btn btn-outline-warning mr-1"
                ><i class="fa fa-user"></i> Register</b-btn>
                <b-popover
                    target="formRegister"
                    placement="auto"
                ><FormRegister/></b-popover>
            </span>
        </div>
    </div>
</template>

<script>
    import FormLogin from '@/components/headers/FormLogin.vue';
    import FormRegister from '@/components/headers/FormRegister.vue';
    import FormProfile from '@/components/headers/FormProfile.vue';
    import { mapState, mapActions } from 'vuex';
    
    export default {
        name: 'Header',
        components: {
            FormLogin, FormRegister, FormProfile,
        },
        data() {
            return {
                message: null,
                notif: null,
                messageChat: '',
                chat: [],
            };
        },
        created() {
            this.checkToken();
        },
        computed: {
            ...mapState({
                userAktif: state => state.userAktif,
            }),
        },
        methods: {
            logout() {
                localStorage.removeItem('token-hacktiv');
                this.checkToken();
                this.$router.push('/');
            },
            ...mapActions(['checkToken']),
        },
    };
</script>
