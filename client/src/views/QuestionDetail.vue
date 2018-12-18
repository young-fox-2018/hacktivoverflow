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
        <div id="answersComp">
            <h3 class="text-left">{{answersLength}} Answers</h3>
            <hr>
            <div class="row" v-for="answer in answers" :key="answer.id">
                <div class="col-2 d-flex flex-column">
                    <i class="fas fa-caret-up fa-3x vote"></i>
                    <!-- isi dengan firebase -->
                    0
                    <i class="fas fa-caret-down fa-3x vote"></i>
                </div>
                <div class="col-10">
                    <p>{{answer.content}}</p>

                    <p> answered "time"</p>
                        {{answer.author}}
                </div>
            </div>
        </div>
        
        <form @submit.prevent="submitAnswer" class="mr-2">
            <textarea class="form-control" id="answerText" rows="3" v-model="newQuestion"></textarea>
            <input type="submit" class="btn btn-primary"/>
        </form>
    </div>
</template>

<script>
import axios from '@/helpers/axios'
import db from '@/helpers/firebase'

export default {
    name: 'QuestionDetail',
    data: function() {
        return {
            newQuestion: '',
            question: {},
            questionId : this.$route.params.id,
            currentUser: localStorage.getItem('userName'),
            answers: {},
            answersLength: 0
        }
    },
    created(){
        this.fetchQuestionDetail()
        this.fetchAnswer()
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
            db.ref(this.questionId + "/answers")
            .push({
                content: this.newQuestion,
                author: this.currentUser
            })
        },
        fetchAnswer() {
            let self = this
            console.log(this.questionId + "/answers")
            db.ref(this.questionId + "/answers")
            .on('value', (snapshot) => {
                self.answersLength = snapshot.numChildren()
                self.answers = snapshot.val()
            })
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
