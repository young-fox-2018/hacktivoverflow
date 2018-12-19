<template>
    <div>
        <h5 class="card-header"> {{ question.title }} </h5> 
        <div class="card-body">
            <p class="card-text"> by: {{ question.userID.name }} </p> 
            <p class="card-text"> {{ question.detail }} </p>

            <button class="btn btn-sm btn-info mr-2" data-toggle="modal" data-target="#editQuestion" v-if="email == question.userID.email">Edit</button>
            <button class="btn btn-sm btn-danger mr-2" @click="deleteQuestion(question._id)" v-if="question.userID.email === email" > Delete </button>
            <button class="btn btn-sm btn-info" data-toggle="modal" data-target="#addAnswer">Add answer</button>
        </div>


        <!-- EDIT QUESTION -->
        <div class="modal fade" id="editQuestion" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> 
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addAnswerLabel">Answer</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label>Title</label>
                                <input type="text" class="form-control" placeholder="Write title here" v-model="question.title">
                            </div>
                            <b-form-group label="Please select tag">
                                <b-form-checkbox-group id="checkboxes1" name="flavour1" v-model="selected" :options="options">
                                </b-form-checkbox-group>
                            </b-form-group>
                            <div class="form-group">
                                <label>Content: </label>
                                <textarea class="form-control" rows="10" placeholder="Write detail here" v-model="question.detail"></textarea>
                            </div>
                            <button type="submit" class="btn btn-dark" @click.prevent="editQuestion" data-dismiss="modal">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>



        <!-- ADD ANSWER MODAL -->
        <div class="modal fade" id="addAnswer" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> 
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addAnswerLabel">Answer</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <textarea class="form-control" rows="10" placeholder="Write detail here" v-model="answer.detail"></textarea>
                            </div>
                            <button type="submit" class="btn btn-dark btn-sm" data-dismiss="modal" @click.prevent="addAnswer">Add Answer</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <Answers></Answers>

    </div>
</template>

<script>
import axios from '@/api/hacktivOverflow-api.js'
import Answers from '@/components/Answers.vue'
import { mapState } from 'vuex'

export default {
    components: { Answers },

    computed: {
        ...mapState(['isLoggedIn', 'email', 'tags']) 
    },

    data() {
        return {
            question: {
                userID: {},
                detail: "",
                title: "",
                _id: ""
            },
            answer: {
                detail: ""
            },
            selected: [],
            options: []
        }
    },

    methods: {
        setTagOptions: function() {
            this.tags.forEach( tag => {
                let newOpt = {}
                newOpt['value'] = tag._id
                newOpt['text'] = tag.name
                this.options.push(newOpt)
            })
        },

        editQuestion: function() {
            axios({
                method: 'PATCH',
                url: `questions/${this.question._id}`,
                headers: {
                    accesstoken: localStorage.getItem('accesstoken')
                },
                data: {
                    title: this.question.title,
                    detail: this.question.detail,
                    tag: this.selected || []
                }
            })
            .then( response => {
                this.$store.dispatch('getQuestions')
                this.$router.push('/questions')
            })
            .catch( err => {
                console.log(err.response);
            })
        },

        addAnswer: function() {
            axios({
                method: 'POST',
                url: `answers/${this.question._id}`,
                headers: {
                    accesstoken: localStorage.getItem('accesstoken')
                },
                data: {
                    detail: this.answer.detail
                }
            })
            .then( response => {
                this.$store.dispatch('getAnswers', this.question._id)
            })
            .catch( err => {
                console.log(err.response);
            })
        },

        deleteQuestion: function(questionID) {
            axios({
                method: 'DELETE',
                url: `questions/${questionID}`,
                headers: {
                    accesstoken: localStorage.getItem('accesstoken')
                }
            })
            .then( response => {
                this.$store.dispatch('getQuestions')
                this.$router.push('/questions')
                this.$toasted.info(
                    `${response.data.message}`, 
                    { 
                        theme: "outline", 
                        position: "top-right", 
                        duration : 5000
                    }
                )
            })
            .catch( err => {
                console.log(err.response)
            })
        },

        getQuestionDetail: function() {
            axios({
                method: 'GET',
                url: `questions/${this.$route.params.questionID}`
            })
            .then( response => {
                this.question = response.data.question
            })
            .catch( err => {
                console.log(err.response);
            })
        }

    },

    created() {
        this.getQuestionDetail()
        this.$store.dispatch('getAnswers', this.$route.params.questionID)
        this.setTagOptions()
    }
}
</script>
