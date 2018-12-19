<template>
    <div>
        <div class="list-group" id="list-tab" role="tablist">
            <router-link class="list-group-item btn-outline-warning" to="/">Home</router-link>
            <router-link class="list-group-item btn-outline-warning" to="/tags">Tags</router-link>
            <router-link class="list-group-item btn-outline-warning" to="/user-popularity">User Popularity</router-link>
            <router-link class="list-group-item btn-outline-warning" to="/my-questions" v-if="userAktif">My Questions</router-link>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    
    export default {
        name: 'LeftBar',
        computed: {
            ...mapState({
                userAktif: state => state.userAktif,
            }),
        },
    };
</script>
