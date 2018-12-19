<template>
    <div class="row ml-2 mb-3">
        <div class="card col-12 mx-0 px-0">
            <div class="card-header text-center text-white bg-primary   ">
                <p class="mb-0"><strong>Top 5 Populer Users</strong></p>
            </div>
            <div class="card-body ml-0 pl-3">   
                <table class="table">
                    <tbody>
                        <tr v-for="(user, index) in topUser" :key="index">
                            <th scope="row">{{index+1}}</th>
                            <td>{{user.name}}</td>
                            <td>{{user.popularity}}</td>
                        </tr>
                    </tbody>
                    </table>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'TopUser',
    methods: {
        getTopUser() {
            this.$store.dispatch('getPopulerUser')
        }
    },
    computed: mapState({
        topUser: state => state.topUserList
    }),
    created() {
        this.getTopUser()
    }
}
</script>

<style>

</style>
