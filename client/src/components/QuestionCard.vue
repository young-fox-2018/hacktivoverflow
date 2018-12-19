<template>
    <div>
        <div class="row mt-2">
            <div class="col-md-4 mr-0 pl-0">
                <div class="row">
                    <div class="col-md-6 text-center">
                        <p class="my-0 border border-danger rounded px-0 mx-4 py-2">{{countVotes()}}</p>
                        <p class="text-muted my-0 py-2">Votes</p>
                    </div>
                    <div class="col-md-6 text-center">
                        <p class="my-0 border rounded px-0 border-success mx-4 py-2">{{votes}}</p>
                        <p class="text-muted my-0 py-2">Answers</p>
                    </div>
                </div>
            </div>
            <div class="col-md-8 ml-0 pl-0">
                <div class="container">
                <router-link :to="{path : `${question.slug}`}">
                    <a>{{question.title}} </a>
                </router-link>
                <p class="text-muted">asked by : {{question.owner.name}} </p>
                
                </div>
            </div>
        </div>     
        <hr class="mt-0"> 
    </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
import api from '@/api/axios'

export default {
    name: 'QuestionCard',
    props:['question'],
    data() {
        return {
            votes : 0
        }
    },
    computed : mapState({
        isLogin : state => state.isLogin,
        questionList : state => state.questionList
    }),
    methods: {
        countVotes () {
            return (this.question.upvotes.length - this.question.downvotes.length)
        },
        countAnswer(id) {
            api({
                method: 'GET',
                url: 'answers/' + id
            })
            .then(data => {
                this.votes = data.data.answer.length
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created() {
        this.countAnswer(this.question._id)
    }
}
</script>

