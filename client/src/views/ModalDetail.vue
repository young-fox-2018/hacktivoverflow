<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div class="modal-header">
                        <h5><b>{{ question.title }}</b></h5>
                    </div>

                    <div class="modal-body">
                        <div v-html="question.content"></div>
                        <loading v-if="showLoading" />
                        <hr>
                        <h5>
                            <span class="mr-2">Answer</span>
                            <span v-if="userAktif">
                                <button
                                    :class="'btn btn-outline-'+colorUpvote+' btn-sm mr-1'"
                                    @click="upvoteQuestion"
                                    v-if="userAktif._id !== question.user"
                                >Upvote</button>
                                <button
                                    :class="'btn btn-outline-'+colorDownvote+' btn-sm mr-1'"
                                    @click="downvoteQuestion"
                                    v-if="userAktif._id !== question.user"
                                >Downvote</button>
                            </span>
                        </h5>
                        <wysiwyg v-model="contentAnswer" v-if="userAktif" />
                        <hr>
                        <CardAnswer
                            v-for="(data, index) in question.answers" :key="index"
                            :answer="data"
                            :user-aktif="userAktif"
                            :question-id="question._id"
                            @update-vote-answer="voteAnswerSuccess"
                        />
                    </div>

                    <div class="modal-footer">
                        <loading v-if="showLoadingSave" width="30px" />
                        <button @click="savePublish" class="btn btn-outline-warning btn-sm" v-if="userAktif">Publish</button>
                        <span v-else>Please Login To Answer this.</span>
                        <button @click="$router.go(-1)" class="btn btn-outline-warning btn-sm">Close</button>
                    </div>

                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import apiHacktiv from '@/config/api-hacktivoverflow.js';
    import loading from '@/components/Loading.vue';
    import CardAnswer from '@/components/CardAnswer.vue';
    import { mapActions, mapState } from 'vuex';
    // import { urlSocket } from '@/config/url.js';
    
    // import io from 'socket.io-client';
    
    export default {
        name: 'ModalDetail',
        data() {
            return {
                showLoading: false,
                showLoadingSave: false,
                contentAnswer: '',
                colorUpvote: '',
                colorDownvote: '',
                // socket: io(urlSocket),
            };
        },
        components: {
            loading, CardAnswer,
        },
        created() {
            this.getOneQuestion(this.$route.params.questionId);
        },
        computed: {
            ...mapState({
                question: state => state.oneQuestion,
                userAktif: state => state.userAktif,
            }),
        },
        watch: {
            question: function() {
                this.colorUpvote = 'warning';
                this.colorDownvote = 'warning'
                for(let i = 0; i < this.question.upvote.length; i++) {
                    if(this.question.upvote[i] === this.userAktif._id) {
                        this.colorUpvote = 'success'
                    }
                }
                for(let i = 0; i < this.question.downvote.length; i++) {
                    if(this.question.downvote[i] === this.userAktif._id) {
                        this.colorDownvote = 'danger'
                    }
                }
            },
        },
        methods: {
            ...mapActions(['getOneQuestion', 'getAllQuestion']),
            savePublish() {
                this.showLoadingSave = true;
                apiHacktiv.post(`/questions/answers/${this.question._id}`,
                    {
                        contentAnswer: this.contentAnswer,
                    },
                    { headers: { token: localStorage.getItem('token-hacktiv') } }
                )
                    .then(question => {
                        this.getOneQuestion(this.$route.params.questionId);
                        this.contentAnswer = '';
                        this.showLoadingSave = false;
                        // this.socket.emit('AnswerSaved', question.data.author);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            upvoteQuestion() {
                if(this.colorUpvote === 'warning') {
                    let popularity = 1;
                    if(this.colorDownvote === 'danger') {
                        popularity = 2;
                    }
                    apiHacktiv.post(`/questions/upvote/question`,
                        {
                            questionId: this.question._id,
                            userQuestion: this.question.user,
                            popularity: popularity,
                        },
                        { headers: { token: localStorage.getItem('token-hacktiv') } }
                    )
                        .then(question => {
                            this.getOneQuestion(this.$route.params.questionId);
                            this.getAllQuestion();
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    apiHacktiv.post(`/questions/noupvote/question`,
                        {
                            questionId: this.question._id,
                            userQuestion: this.question.user,
                            popularity: -1,
                        },
                        { headers: { token: localStorage.getItem('token-hacktiv') } }
                    )
                        .then(question => {
                            this.getOneQuestion(this.$route.params.questionId);
                            this.getAllQuestion();
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            },
            downvoteQuestion() {
                if(this.colorDownvote === 'warning') {
                    let popularity = -1;
                    if(this.colorUpvote === 'success') {
                        popularity = -2;
                    }
                    apiHacktiv.post(`/questions/downvote/question`,
                        {
                            questionId: this.question._id,
                            userQuestion: this.question.user,
                            popularity: popularity,
                        },
                        { headers: { token: localStorage.getItem('token-hacktiv') } }
                    )
                        .then(question => {
                            this.getOneQuestion(this.$route.params.questionId);
                            this.getAllQuestion();
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    apiHacktiv.post(`/questions/nodownvote/question`,
                        {
                            questionId: this.question._id,
                            userQuestion: this.question.user,
                            popularity: 1,
                        },
                        { headers: { token: localStorage.getItem('token-hacktiv') } }
                    )
                        .then(question => {
                            this.getOneQuestion(this.$route.params.questionId);
                            this.getAllQuestion();
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            },
            voteAnswerSuccess() {
                this.getOneQuestion(this.$route.params.questionId);
                this.getAllQuestion();
            },
        },
    }
</script>

<style scoped>
    @import "~vue-wysiwyg/dist/vueWysiwyg.css";
    
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        max-width: 90%;
        height: 90%;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
        overflow-y: auto;
    }

    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }

    .modal-body {
        margin: 20px 0;
    }

    .modal-default-button {
        float: right;
    }

    /*
    * The following styles are auto-applied to elements with
    * transition="modal" when their visibility is toggled
    * by Vue.js.
    *
    * You can easily play with the modal transition by editing
    * these styles.
    */

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container, .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>