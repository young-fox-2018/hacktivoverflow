<template>
    <div class="row">
        <div class="col-2 d-flex flex-column">
            <i class="fas fa-caret-up fa-3x vote" v-if="!upvoted" @click.prevent="upvoteAnswer"></i>
            <!-- isi dengan firebase -->
            {{votes}}
            <i class="fas fa-caret-down fa-3x vote" v-if="!downvoted" @click.prevent="downvoteAnswer"></i>
        </div>
        <div class="col-10">
            <p>{{answer.content}}</p>

            <p> answered "time"</p>
                {{answer.author.name}}

                <button class="btn btn-warning" v-if="ownAnswer">edit Answer</button>
        </div>
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
        }
    }
}
</script>

