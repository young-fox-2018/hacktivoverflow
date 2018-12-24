<template>
    <div>
        <!-- create question -->
        <b-card v-if="isLogin" class="mb-3">
        <b-form>
            <b-form-group>
            <b-form-input v-model="newQuestion.title" placeholder="Question title"></b-form-input>
            </b-form-group>
            <b-form-group>
                <b-textarea v-model="newQuestion.body" :rows="3" placeholder="Your question here ..."></b-textarea>
            </b-form-group>
            <b-button @click.prevent="createQuestion" type="submit" variant="secondary">Post</b-button>
        </b-form>
        </b-card>
        <b-card v-for="(question, index) in allQuestions" :key="index" :title="question.title" class="mb-3">
            <small class="text-muted">by {{question.user.name}} | Posted {{relativeDate(question.date)}}</small>
            <hr>
            <b-row>
                <b-col cols="7">
                    <p>{{question.body}}</p>
                </b-col>
                <b-col cols="5" style="text-align: center;">
                    <b-card>
                    <b-row>
                        <b-col cols="6">
                            <div class="text-muted">
                                {{voteNumber(question.upvote, question.downvote)}}
                            </div>
                        </b-col>
                        <b-col cols="6">
                            <div class="text-muted">
                                {{question.answers.length}}
                            </div>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="6">
                            <small class="text-muted">{{singlePluralWord(voteNumber(question.upvote, question.downvote), 'vote')}}</small>
                        </b-col>
                        <b-col cols="6">
                            <small class="text-muted">{{singlePluralWord(question.answers.length, 'answer')}}</small>
                        </b-col>
                    </b-row>

                    </b-card>
                </b-col>
            </b-row>
            <hr>
            <div style="text-align: center;">
                <router-link :to="`/question/${question._id}`">
                    <b-button type="button" variant="secondary" @click="getQuestion(question._id)">Read more</b-button>
                </router-link>
            </div>
        </b-card>
    </div>
</template>

<script>
import db from '@/api/server.js'
import { mapState } from "vuex"
import moment from 'moment'

export default {
    name: 'questionList',
    data() {
        return {
            newQuestion: {
                title: '',
                body: ''
            }
        }
    },

    methods: {
        relativeDate(date) {
            return moment(date, 'DD/MM/YYYY hh:mm:ss').fromNow()
        },
        voteNumber(upvote, downvote) {
            return upvote.length - downvote.length
        },
        singlePluralWord(num, word) {
            if (num < 2) return word
            else return `${word}s`
        },
        createQuestion() {
            let data = {
                title: this.newQuestion.title,
                body: this.newQuestion.body
            }
            db.request({
                url: 'questions',
                method: 'POST',
                data,
                headers: {
                token: localStorage.getItem('token')
                }
            })
            .then(({data}) => {
                this.newQuestion.title = ''
                this.newQuestion.body = ''
                this.$store.dispatch('actionAllQuestion')
            })
            .catch(error => {
                console.log(error)
            })
        },
        getQuestion(questionId) {
            this.$store.dispatch('actionQuestion', questionId)
        }
    },

    computed: {
        ...mapState(['allQuestions', 'isLogin'])
    },

    created() {
        this.$store.dispatch('actionAllQuestion')
    }
}
</script>
