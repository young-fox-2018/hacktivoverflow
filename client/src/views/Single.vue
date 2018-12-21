<template>
    <div id="single">
        <div class="row mt-2  mb-2">
            <div class="col-12">
                <h3 style="float: left">{{currentQuestion.title}} </h3>
            </div>
        </div>
        <card-detail :usage="'question'" :item="currentQuestion" @get-vote="getQuestion(this.$route.params.id)"></card-detail>
        <div class="row mb-4">
            <div class="col-md-12">
                <form action="" @submit.prevent="setAnswer">
                    <div class="form-group" v-if="loginStatus">
                        <label for="question">Your Answer</label>
                        <wysiwyg id="formQuestion" v-model="answer.body"/>
                    <input type="submit" class="btn btn-primary mt-2" value="submit answer" style="float: left">
                    </div>
                </form>
            </div>
        </div>
        <h3>Answers : </h3>  
        <card-detail :usage="'answer'" v-for="(answer, index) in currentQuestion.answers" :key="index" :item="answer" class="mb-2"></card-detail>
        
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import CardDetail from '@/components/CardDetail.vue'
import api from '../assets/api-server.js'

export default {
    name: 'single',
    computed: {
        ...mapState(['currentQuestion', 'loginStatus'])
    },
    methods: {
        ...mapActions(['getQuestion']),
        setAnswer(){
            api.post(`/questions/${this.$route.params.id}/answer`, {
                body: this.answer.body
            }, {headers: {token: localStorage.token}})
                .then(({data})=> {
                    let answeredQuestion = data
                    this.getQuestion(this.$route.params.id)
                    this.answer={
                        body: ''
                    }
                    this.$swal({
                        type: 'success',
                        title: 'Answer Successfully Added',
                        text: 'Thanks for your answer',
                    })
                })
                .catch(err=> {
                    console.log(err.response)
                })

        }
    },
    created() {
        this.getQuestion(this.$route.params.id)
    },
    components: {
        CardDetail,
    },
    data(){
        return {
            answer : {
                body: ''
            }
        }
    }
}
</script>

<style>
.vote{
    align-content: center;
    align-items: center;
}
</style>




