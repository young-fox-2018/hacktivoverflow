<template>
    <div class="col-md-8 mt-0 rounded">
        <div class="row container align-middle">
            <img src="../assets/robot-01-icon.png" class="img-fluid " style="max-width: 75px; max-height: 75px" alt="">
            <div class="col align-middle">
                <h3 class="mt-3">
                    {{name}} Post List
                </h3> 
            </div>
            <div class="col-md-4 mt-3 text-right">
            </div>
        </div>     
        <hr>     
        <!-- disni pertanyaan -->
        <own-question v-for="question in myPostList" v-bind:key="question._id" :question="question" />
    </div>
</template>

<script>
import OwnQuestion from '@/components/OwnQuestion.vue'
import {mapState} from 'vuex'

export default {
    data () {
        return {
            name : localStorage.getItem('name')
        }
    },
    methods: {
        checkToken() {
            if(!localStorage.getItem('token')) {
                this.$router.replace({path: '/'})
            }
        }
    },
    components : {  
        OwnQuestion
    },
    computed : mapState({
        isLogin : state => state.isLogin,
        questionList : state => state.questionList,
        myPostList: state => state.myPostList
    }),
    created () {
        this.checkToken()
        this.$store.dispatch('getMyPost')
    }
}
</script>
