<template>
    <div>
        <h3 class="text-left">{{question.title}}</h3>
        <hr>
        <div class="row">
            <div class="col-2 d-flex flex-column">
                <i class="fas fa-caret-up fa-3x vote"></i>
                <!-- isi dengan firebase -->
                0
                <i class="fas fa-caret-down fa-3x vote"></i>
            </div>
            <div class="col-10 text-left">
                <p>{{question.content}}</p>
            </div>

        </div>
        <form @submit.prevent="submitAnser" class="mr-2">
            <textarea class="form-control" id="answerText" rows="3"></textarea>
            <input type="submit" class="btn btn-primary"/>
        </form>
    </div>
</template>

<script>
import axios from '@/helpers/axios'
export default {
    name: 'QuestionDetail',
    data: function() {
        return {
            question: {},
            questionId : this.$route.params.id
        }
    },
    created(){
        this.fetchQuestionDetail()
    },
    methods: {
        fetchQuestionDetail(){
            axios({
                method: 'GET',
                url: 'questions/' + this.questionId
            })
            .then(({data}) =>{
                console.log(data)
                this.question = data.question
            })
            .catch(({response}) =>{
                console.log(response.data)
            })
        },
        submitAnswer(){

        }
    }
}
</script>

<style>
.vote{
    color: grey
}
.vote:hover{
    color: black
}
</style>
