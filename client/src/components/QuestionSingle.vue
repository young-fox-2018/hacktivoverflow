<template>
    <div class="col-md-8">
        <div class="row mt-2">
            <div class="col-md-12 rounded mt-2">
                    <!-- header top question sama tombol tanya -->
                <div class="row">
                    <div class="col-md-8">
                        <h3>
                            {{question.title}}
                        </h3> 
                    </div>
                    <div class="col-md-4 text-right">
                    </div>
                </div>    
                <hr class="mt-0"> 
                <!-- disni pertanyaan -->
                <div class="row mt-2">
                    <div class="col-md-2 mr-0 pl-0 justify-content-center">
                            <p class="text-center">{{countVotes(question.upvotes, question.downvotes)}}</p>
                            <p class="text-muted text-center my-0 py-2">Votes</p>
                            <p class="text-center mb-0 pb-0 mt-2">{{answerList.length}}</p>
                            <p class="text-muted text-center my-0 py-2">Answers</p>
                    </div>
                    <div class="col-md-10 ml-0 pl-0">
                        <div v-html="question.content"></div>
                        <p class="text-muted mb-0">asked by : {{question.owner.name}}</p>
                        <p class="text-muted mb-0"><span class="fas fa-star yellow mr-3"></span>popularity : {{question.owner.popularity}}</p>
                        <p class="text-muted mt-1">{{convertTime(question.timeStamp)}}</p>
                        <div class="row">
                                <div class="container mb-2">
                                    <button class="btn btn-outline-success" @click="upvote(question._id)">upvote</button>
                                    <button class="btn ml-2 btn-outline-danger" @click="downvote(question._id)">downvote</button>
                                </div>
                            </div>
                    </div>
                    
                </div>     
                <hr class="mt-0"> 
            </div>
        </div>

        <!-- disini postingan form untuk menjawab -->
        <div class="row mt-2">
            <div class="container">
                <label for="comment">Your Answer:</label>
                <wysiwyg v-model="answer" style="min-height:200px" />
                <div class="row mt-2 mr-1   ">
                    <button class="btn btn-primary ml-auto" @click="createAnswer">post it</button>
                </div>
            </div>   
        </div>
        <!-- disini kumpulan jawaban -->
        <div class="row mt-4">
            <answer-card @updated="fetchAnswer" @upvoteAnswer="readQuestionById" :convertTime="convertTime" :countVotes="countVotes" @downvoteAnswer="readQuestionById" v-for="answer in answerList" :key="answer._id" :answer="answer" />
        </div>
    </div> 
</template>

<script>
import axios from 'axios'
import api from '@/api/axios'
import AnswerCard from '@/components/AnswerCard.vue'
import {mapState} from 'vuex'
import miniToastr from 'mini-toastr'
export default {
data () {
    return {
        question: {
            _id: '',
            upvotes : [],
            downvotes: [],
            owner: {
                name : ''
            },
            timeStamp:'',
            content:''
        },
        answer: '',
        answerList: []
    }
},
components: {
    AnswerCard
},
computed: mapState({
    isLogin: state => state.isLogin,
    questionList: state => state.questionList
}),
methods: {
    /* eslint-disable */
    readQuestionById () {
        api({
            method: 'GET',
            url: 'questions/slug/' + this.$route.params.id
        })
        .then(data => {
            this.question = data.data
            this.fetchAnswer()
        })
        .catch(err => {
            console.log(err)
        })
    },
    update(val) {
        console.log('dari single', val)
    },
    convertTime (time) {
        let minute = new Date(time).getMinutes()
        let hour = new Date(time).getHours()
        if (minute < 10) {
            minute = `0${minute}`
        } 
        if (hour < 10) {
            hour = `0${hour}`
        }
        let newTime = time.slice(0,10)
        return newTime + ' ' + hour + ':' + minute
    },
    countVotes(upvote, downvote) {
        return upvote.length - downvote.length
    },
    upvote(id) {
        api({
            method: 'PATCH',
            url: 'questions/upvote/' + id,
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(data => {
            this.readQuestionById()
            this.$store.dispatch('getPopulerUser')
        })
        .catch(err => {
            miniToastr.warn('you cannot upvote your own question', '', 2000)
        })
    },
    downvote(id) {
        api({
            method: 'PATCH',
            url: 'questions/downvote/' + id,
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(data => {
            this.readQuestionById()
            this.$store.dispatch('getPopulerUser')
        })
        .catch(err => {
            miniToastr.warn('you cannot downvote your own question', '', 2000)
        })
    },
    createAnswer() {
        api({
            method: 'POST',
            url: 'answers/' + this.question._id,
            headers: {
                token: localStorage.getItem('token')
            },
            data: {
                content: this.answer
            }
        })
        .then(data => {
            console.log(data)
            this.answer = ''
            this.fetchAnswer()
        })
        .catch(err => {
            miniToastr.warn('create answer failed', '', 2000)
        })
    },
    fetchAnswer () {
        api({
            method: 'GET',
            url:'answers/' + this.question._id,
        })
        .then(data => {
            console.log(data.data)
            this.answerList = data.data.answer
        })
        .catch(err => {
            console.log(err)
        })
    }
},
mounted () {
    this.readQuestionById()
},
watch: {
    '$route.params.id': function () {
        this.readQuestionById()
    }
}
}
</script>
<style>
    @import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>