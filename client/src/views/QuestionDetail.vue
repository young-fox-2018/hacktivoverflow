<template>
    <div>
        <h3 class="text-left">{{question.title}}</h3>
        <hr>
        <div class="row">
            <div class="col-2 d-flex flex-column">
                <i class="fas fa-caret-up fa-3x vote" v-if="!upvoted" @click='upvoteQuestion'></i>
                <i class="fas fa-caret-up fa-3x disabled-icon" v-if="ownQuestion"></i>
                <!-- isi dengan firebase -->
                {{votes}}
                <i class="fas fa-caret-down fa-3x vote"  v-if="!downvoted" @click.prevent='downvoteQuestion'></i>
                <i class="fas fa-caret-down fa-3x disabled-icon"  v-if="ownQuestion"></i>
            </div>
            <div class="col-10" v-html='question.content'>
                <!-- <p>{{question.content}}</p> -->
            </div>
            <div class="d-flex ">
                <button 
                  class="btn btn-primary btn-sm m-2"
                  v-for="(tag,index) in question.tags"
                  :key="index">
                  {{tag}}
                </button>
            </div>
        </div>
        <button 
          class="btn btn-warning" 
          v-if="ownQuestion"
          v-b-modal.editQuestionModal
          >
            Edit Question
        </button>
        <button 
          class="btn btn-danger" 
          v-if="ownQuestion"
          @click="deleteQuestion"
          >
            Delete Question
        </button>

        <b-modal id="editQuestionModal" title="Bootstrap-Vue" ref="editQuestionModal">
            <form>
                <div class="form-group">
                    <label for="editTitle">Title</label>
                    <input  type="text" class="form-control" id="editTitle" v-model="question.title" >
                </div>
                <div>
                    <wysiwyg v-model="question.content" />
                </div>
                <!-- <button type="submit" class="btn btn-primary" style="display:none" ></button> -->
            </form>
            <div slot="modal-footer" class="w-100">
                <b-btn size="sm" class="float-right" variant="warning" @click="editQuestion">
                Edit
                </b-btn>
            </div>
        </b-modal>
        

        <div id="answersComp">
            <h3 class="text-left">{{answersLength}} Answers</h3>
            <hr>
            <Answer v-for="(answer, index) in answers" :key="index" :answer="answer" :answerId="index" :questionId="questionId"/>
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
import Answer from '@/components/Answer'

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
            upvoted: false,
            downvoted: false,
            ownUpvoteId: '',
            ownDownvoteId: '',
            ownQuestion: false,
        }
    },
    components: {
        Answer
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
                this.checkUpvote()
                this.checkDownvote()
                this.checkOwn()
            })
            .catch(({response}) =>{
                console.log(response.data)
            })
        },
        submitAnswer(){
            db.ref(this.questionId + "/answers")
            .push({
                content: this.newQuestion,
                author: {
                    name:this.currentUserName,
                    email: this.currentUserEmail    
                }
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
            if(this.downvoted){
                db.ref(this.questionId + "/downvote/" + this.ownDownvoteId)
                .remove()
                this.downvoted = false
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
            if(this.upvoted){
                db.ref(this.questionId + "/upvote/" + this.ownUpvoteId)
                .remove()
                this.upvoted = false
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
                self.checkDownvote();
            })
        },
        checkUpvote(){
            let upvoted = this.upvoters.find((element) =>{
                // console.log(element);
                return element == this.currentUserEmail
            })
            

            if(this.question.author.email === this.currentUserEmail){
                upvoted = true
            }
            
            if(upvoted){
                this.upvoted = true
            }
            
        },
        checkDownvote(){
            let downvoted = this.downvoters.find((element) =>{
                return element == this.currentUserEmail
            })

            if(this.question.author.email === this.currentUserEmail){
                downvoted = true
            }

            if(downvoted){
                this.downvoted = true
            }
        },
        checkOwn(){
            if(this.question.author.email === this.currentUserEmail){
                this.ownQuestion = true
            }
        },
        editQuestion(){
            let input = {
                title: this.question.title,
                content: this.question.content
            }

            axios({
                url: '/questions/' + this.questionId,
                method: 'PATCH',
                headers: {
                    token: localStorage.token
                },
                data: input
            })
            .then(({data}) =>{
                alert(data.message)
                this.$refs.editQuestionModal.hide()
            })
            .catch(({response}) =>{
                console.log(response)
            })
        },
        deleteQuestion(){
            axios({
                url: '/questions/' + this.questionId,
                method: 'DELETE',
                headers: {
                    token: localStorage.token
                },
            })
            .then(({data}) =>{
                alert(data.message)
                this.$router.push('/')
            })
            .catch(({response}) =>{
                console.log(response)
            })
        }
    }
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.disabled-icon{
    color: lightgray
}
.vote{
    color: #167ffb
}
.vote:hover{
    color: orangered
}
</style>
