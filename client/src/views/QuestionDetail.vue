<template>
    <div>
        <h3 class="text-left">{{question.title}}</h3>
        <hr>
        <div class="row">
            <div class="col-2 d-flex flex-column">
                <i class="fas fa-caret-up fa-3x vote" v-if="!upVoted" @click='upvoteQuestion'></i>
                <!-- isi dengan firebase -->
                {{votes}}
                <i class="fas fa-caret-down fa-3x vote"  v-if="!downVoted" @click.prevent='downvoteQuestion'></i>
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
            currentUserName: localStorage.getItem('userName'),
            currentUserEmail: localStorage.getItem('userEmail'),
            answers: {},
            answersLength: 0,
            upvoters: [],
            downvoters: [],
            upVoted: false,
            downVoted: false,
            ownUpvoteId: '',
            ownDownvoteId: '',
        }
    },
    computed: {
        votes(){
            return this.upvoters.length - this.downvoters.length
        }
    },
    created(){
        this.fetchQuestionDetail()
        this.fetchAnswer()
        this.fetchQuestionUpvotes()
        this.fetchQuestionDownvotes()
    },
    methods: {
        fetchQuestionDetail(){
            axios({
                method: 'GET',
                url: 'questions/' + this.questionId
            })
            .then(({data}) =>{
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
                author: this.currentUserName
            })
        },
        fetchAnswer() {
            let self = this
            db.ref(this.questionId + "/answers")
            .on('value', (snapshot) => {
                self.answersLength = snapshot.numChildren()
                self.answers = snapshot.val()
            })
        },
        upvoteQuestion(){
            if(this.downVoted){
                db.ref(this.questionId + "/downvote/" + this.ownDownvoteId)
                .remove()
                this.downVoted = false
                this.fetchQuestionDownvotes()
            }
            else {
                db.ref(this.questionId + "/upvote")
                .push(this.currentUserEmail)
            }
        },
        fetchQuestionUpvotes(){
            let self = this
            db.ref(this.questionId + "/upvote")
            .on('value', (snapshot) => {
                if(snapshot.val()){
                    self.upvoters = Object.values(snapshot.val())
                    for(let key in snapshot.val()){
                        if(snapshot.val()[key] === self.currentUserEmail){
                            self.ownUpvoteId = key
                        }
                    }
                }
                else {
                    self.ownUpvoteId = ''
                    self.upvoters = []
                }

                self.checkUpvote();
            })
        },
        downvoteQuestion(){
            if(this.upVoted){
                db.ref(this.questionId + "/upvote/" + this.ownUpvoteId)
                .remove()
                this.upVoted = false
                this.fetchQuestionUpvotes()
            }
            else {
                db.ref(this.questionId + "/downvote")
                .push(this.currentUserEmail)
            }
        },
        fetchQuestionDownvotes(){
            let self = this
            db.ref(this.questionId + "/downvote")
            .on('value', (snapshot) => {
                if(snapshot.val()){
                    self.downvoters = Object.values(snapshot.val())
                    for(let key in snapshot.val()){
                        if(snapshot.val()[key] === self.currentUserEmail){
                            self.ownDownvoteId = key
                        }
                    }
                }
                else {
                    self.ownDownvoteId = ''
                    self.downvoters = []
                }
                console.log('sampe sini')
                console.log(self.che)
                self.checkDownvote();
            })
        },
        checkUpvote(){
            let upVoted = this.upvoters.find((element) =>{
                // console.log(element);
                return element == this.currentUserEmail
            })
            
            console.log(upVoted)
            
            if(upVoted){
                this.upVoted = true
            }
            
        },
        checkDownvote(){
            let downVoted = this.downvoters.find((element) =>{
                return element == this.currentUserEmail
            })
            console.log('testt')
            console.log(downVoted, 'down')

            if(downVoted){
                this.downVoted = true
            }
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
