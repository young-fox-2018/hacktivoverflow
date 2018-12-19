<template>
    <div>

        <div v-if="answers.length === 0">
            No answers yet. Be the first to answer!
        </div>
        <div v-else-if="answers.length !== 0">
            <h1>Answers: </h1>
            <div class="card" v-for="answer in answers" :key="answer._id">
                <div class="card-header">
                    By: {{ answer.userID.email }} 
                </div>
                <div class="card-body">
                    <p class="card-text">{{ answer.detail }}</p>
                    <button class="btn btn-primary btn-sm mr-2" @click="upvoteAnswer(answer._id, answer.questionID)"> Upvote </button> 
                    {{ answer.upvote.length }}
                    <button class="btn btn-primary btn-sm mx-2" @click="downvoteAnswer(answer._id, answer.questionID)"> Downvote </button>
                    {{ answer.downvote.length }}
                    <button 
                        class="btn btn-warning btn-sm mx-2" 
                        data-toggle="collapse" 
                        :data-target="`#editAnswer${answer._id}`" 
                        v-if="email == answer.userID.email"> Edit 
                    </button>

                    <!-- EDIT ANSWER -->
                    <div class="collapse mt-3" :id="`editAnswer${answer._id}`" tabindex="-1" role="dialog"> 
                        <form>
                            <div class="form-group">
                                <textarea class="form-control" rows="3" placeholder="Write detail here" v-model="answer.detail"></textarea>
                            </div>
                            <button type="submit" data-toggle="collapse" :data-target="`#editAnswer${answer._id}`"  class="btn btn-dark btn-sm" @click.prevent="editAnswer(answer)">Edit Answer</button>
                        </form>
                    </div>


                </div>
            </div>

        </div>




    </div>
</template>

<script>
import axios from '@/api/hacktivOverflow-api.js'
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState(['answers', 'email']) 
    },
    data() {
        return {
        }
    }, 
    methods: {
        editAnswer: function(answer) { 
            axios({
                method: 'PUT',
                url: `answers/${answer.questionID}/${answer._id}`,
                headers: {
                    accesstoken: localStorage.getItem('accesstoken')
                },
                data: {
                    detail: answer.detail
                }
            })
            .then( response => {
                this.$store.dispatch('getAnswers', this.$route.params.questionID)
            })
            .catch( err => {
                console.log(err.response);
            })
        },


        upvoteAnswer: function(answerID, questionID) {
            axios({
                method: 'PATCH',
                url: `answers/${questionID}/${answerID}/upvote`,
                headers: {
                    accesstoken: localStorage.getItem('accesstoken')
                }
            })
            .then( response => {
                this.$store.dispatch('getAnswers', this.$route.params.questionID) 
                this.$store.dispatch('getPopularUsers') 
            })
            .catch( err => {
                this.$toasted.error(
                    `${err.response.data.message}`, 
                    { 
                        theme: "outline", 
                        position: "top-right", 
                        duration : 5000
                    }
                )
            })
        },

        downvoteAnswer: function(answerID, questionID) {
            axios({
                method: 'PATCH',
                url: `answers/${questionID}/${answerID}/downvote`,
                headers: {
                    accesstoken: localStorage.getItem('accesstoken')
                }
            })
            .then( response => {
                this.$store.dispatch('getAnswers', this.$route.params.questionID) 
                this.$store.dispatch('getPopularUsers') 
            })
            .catch( err => {
                this.$toasted.error(
                    `${err.response.data.message}`, 
                    { 
                        theme: "outline", 
                        position: "top-right", 
                        duration : 5000
                    }
                )
            })
        }
    }
}
</script>
