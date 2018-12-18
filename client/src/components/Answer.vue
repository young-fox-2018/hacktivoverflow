<template>
    <div class="row">
        <div class="col-2 d-flex flex-column">
            <i class="fas fa-caret-up fa-3x vote" v-if="!upvoted" @click.prevent="upvoteAnswer"></i>
            <i class="fas fa-caret-up fa-3x disabled-icon" v-if="ownAnswer"></i>
            <!-- isi dengan firebase -->
            {{votes}}
            <i class="fas fa-caret-down fa-3x vote" v-if="!downvoted" @click.prevent="downvoteAnswer"></i>
            <i class="fas fa-caret-down fa-3x disabled-icon"  v-if="ownAnswer"></i>
        </div>
        <div class="col-10">
            <div>
                <p v-if="!editing">{{answer.content}}</p>
                <form v-if="editing" @submit.prevent="submitEditAnswer">
                    <textarea class="form-control" id="answerText" rows="3" v-model="answer.content"></textarea>
                    <input type="submit" class="btn btn-primary"/>
                </form>
            </div>

            <p> answered "time"</p>
                {{answer.author.name}}

                <button 
                  class="btn btn-warning" 
                  v-if="ownAnswer"
                  @click="showEditForm">
                    edit Answer
                </button>
        </div>

        <!-- <b-modal id="editAnswerModal" title="Bootstrap-Vue" ref="editAnswerModal">
            <form>
                <div class="form-group">
                    <label for="editTitle">Title</label>
                    <input  type="text" class="form-control" id="editTitle" v-model="answer.title" >
                </div>
                <div class="form-group">
                    <label for="editContent">Content</label>
                    <textarea type="text" class="form-control" id="editContent" rows="5" v-model="answer.content"/>
                </div>
            </form>
            <div slot="modal-footer" class="w-100">
                <b-btn size="sm" class="float-right" variant="warning" @click="editAnswer">
                Edit
                </b-btn>
            </div>
        </b-modal>  -->
    </div>
</template>

<script>
import db from '@/helpers/firebase'

export default {
    name: 'Comment',
    props: ['answer', 'answerId', 'questionId'],
    data: function(){
        return{
            downvoted: false,
            upvoted: false,
            ownUpvoteId: '',
            ownDownvoteId: '',
            currentUserName: localStorage.getItem('userName'),
            currentUserEmail: localStorage.getItem('userEmail'),
            upvoters: [],
            downvoters: [],
            ownAnswer: false,
            editing:false,
        }
    },
    computed: {
        votes(){
            return this.upvoters.length - this.downvoters.length
        }
    },
    created(){
        this.checkOwn()
        this.fetchAnswerUpvotes()
        this.fetchAnswerDownvotes()
    },
    methods: {
        upvoteAnswer(){
            if(this.downvoted){
                console.log('1')
                console.log(this.questionId + "/answers/" + this.answerId + "/downvote/" + this.ownDownvoteId)
                db.ref(this.questionId + "/answers/" + this.answerId + "/downvote/" + this.ownDownvoteId)
                .remove()
                this.downvoted = false
                this.fetchAnswerDownvotes()
            }
            else {
                db.ref(this.questionId + "/answers/" + this.answerId + "/upvote")
                .push(this.currentUserEmail)
            }
        },
        downvoteAnswer(){
            if(this.upvoted){
                db.ref(this.questionId + "/answers/" + this.answerId + "/upvote/" + this.ownUpvoteId)
                .remove()
                this.upvoted = false
                this.fetchAnswerUpvotes()
            }
            else {
                db.ref(this.questionId + "/answers/" + this.answerId + "/downvote")
                .push(this.currentUserEmail)
            }
        },
        fetchAnswerUpvotes(){
            let self = this
            db.ref(this.questionId + "/answers/" + this.answerId + "/upvote")
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
        fetchAnswerDownvotes(){
            let self = this
            db.ref(this.questionId + "/answers/" + this.answerId + "/downvote")
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
            

            if(this.answer.author.email === this.currentUserEmail){
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

            if(this.answer.author.email === this.currentUserEmail){
                downvoted = true
            }

            if(downvoted){
                this.downvoted = true
            }
        },
        checkOwn(){
            if(this.answer.author.email === this.currentUserEmail){
                this.ownAnswer = true
            }
        },
        showEditForm(){
            this.editing = true
        },
        submitEditAnswer(){
            let self = this
             db.ref(this.questionId + "/answers/" + this.answerId)
             .update({
                 content: this.answer.content
             }, function(err){
                 if(err) console.log(err)
                 else {
                     alert('You Successfully updated a data')
                     self.editing = false
                }
             })
        },
    }
}
</script>

<style>
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


