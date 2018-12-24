<template>
    <div>
        <div>
            <b-row>
                <b-col cols="10">
                    <h1>{{questionDetail.title}}</h1>
                    <small class="text-muted">by {{questionDetail.user.name}} | Posted {{relativeDate(questionDetail.date)}}</small>
                    <hr>
                    <p style="text-align: justify;">{{questionDetail.body}}</p>
                </b-col>
                <b-col cols="2" v-if="isLogin">
                    <b-row class="justify-content-center">
                        <b-button @click.prevent="upvoting(questionDetail._id)" type="button" variant="outline-secondary"><i class="fa fa-angle-double-up" aria-hidden="true"></i></b-button>
                    </b-row>
                    <b-row class="justify-content-center mt-2">
                        <h2>{{voteNumber(questionDetail.upvote.length, questionDetail.downvote.length)}}</h2>
                    </b-row>
                    <b-row class="justify-content-center">
                        <b-button @click.prevent="downvoting(questionDetail._id)" type="submit" variant="outline-secondary"><i class="fa fa-angle-double-down" aria-hidden="true"></i></b-button>
                    </b-row>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-card :title="singlePluralWord(questionDetail.answers.length, 'answer')">
                        <hr>
                        <div v-for="(answer, index) in answers" :key="index">
                            <b-row>
                                <b-col cols="9">
                                    <div><strong>{{ answer.user.name }}</strong></div>
                                    <small class="text-muted">Posted {{relativeDate(answer.date)}} | {{singlePluralWord(voteNumber(answer.upvote, answer.downvote), 'vote')}}</small>                                      
                                    <hr>
                                    <p style="text-align: justify;">{{answer.body}}</p>
                                </b-col>
                                <b-col cols="3" v-if="isLogin">
                                    <b-row class="justify-content-center">
                                        <b-button @click="answerUpvoting(answer._id)" type="button" variant="outline-secondary"><i class="fa fa-angle-double-up" aria-hidden="true"></i></b-button>
                                    </b-row>
                                    <b-row class="justify-content-center mt-2">
                                        <h2>{{voteNumber(answer.upvote.length, answer.downvote.length)}}</h2>
                                    </b-row>
                                    <b-row class="justify-content-center">
                                        <b-button @click="answerDownvoting(answer._id)" type="button" variant="outline-secondary"><i class="fa fa-angle-double-down" aria-hidden="true"></i></b-button>
                                    </b-row>
                                </b-col>
                            </b-row>
                            <hr>
                        </div>
                        <b-form>
                            <b-form-textarea placeholder="Post your answer..."
                                             v-model="newAnswer.body"
                                             class="mb-2"
                                             :rows="3">
                            </b-form-textarea>
                            <b-button @click.prevent="createAnswer" type="submit" variant="secondary">Post</b-button>
                        </b-form>
                    </b-card>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
import moment from 'moment'
import db from '@/api/server.js'

export default {
    name: 'questionDetail',
    data() {
        return {
            newAnswer: {
                body: ''
            }
        }
    },
    methods: {
        relativeDate(date) {
            return moment(date, 'DD/MM/YYYY hh:mm:ss').fromNow()
        },
        voteNumber(upvote, downvote) {
            // console.log(upvote, downvote)
            return upvote - downvote
        },
        upvoting(questionId) {
            db.request({
                url: `questions/upvote/${questionId}`,
                method: 'POST',
                data: {},
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({data}) => {
                this.$store.dispatch('actionQuestion', this.$route.params.questionId)
            })
            .catch(error => {
                console.log(error)
            })
        },
        downvoting(questionId) {
            db.request({
                url: `questions/downvote/${questionId}`,
                method: 'POST',
                data: {},
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({data}) => {
                this.$store.dispatch('actionQuestion', this.$route.params.questionId)
            })
            .catch(error => {
                console.log(error)
            })
        },
        singlePluralWord(num, word) {
            if (num < 2) return `${num} ${word}`
            else return `${num} ${word}s`
        },
        answerUpvoting(answerId) {
            db.request({
                url: `answers/upvote/${answerId}`,
                method: 'POST',
                data: {},
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({data}) => {
                this.$store.dispatch('actionGetAnswers', this.$route.params.questionId)
            })
            .catch(error => {
                console.log(error)
            })
        },
        answerDownvoting(answerId) {
            db.request({
                url: `answers/downvote/${answerId}`,
                method: 'POST',
                data: {},
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({data}) => {
                this.$store.dispatch('actionGetAnswers', this.$route.params.questionId)
            })
            .catch(error => {
                console.log(error)
            })
        },
        createAnswer() {
            let data = {
                body: this.newAnswer.body
            }
            db.request( {
                url: `answers/${this.$route.params.questionId}`,
                method: 'POST',
                data,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({data}) => {
                this.newAnswer.body = ''
                this.$store.dispatch('actionGetAnswers', this.$route.params.questionId)
            })
            .catch(error => {
                console.log(error)
            })
        }
    },
    computed: {
        ...mapState(['questionDetail', 'answers', 'isLogin'])
    },

    watch: {
        $route() {
            this.$store.dispatch('actionQuestion', this.$route.params.questionId)
            this.$store.dispatch('actionGetAnswers', this.$route.params.questionId)
        }
    },

    created() {
        this.$store.dispatch('actionQuestion', this.$route.params.questionId)
        this.$store.dispatch('actionGetAnswers', this.$route.params.questionId)
        this.$store.dispatch('actionAllQuestion')
    }
}
</script>
