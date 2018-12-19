<template>
    <div class="card mb-4 p-3">
        <div v-html="answer.content"></div>
        <hr>
        <div>
            <small class="mr-2">
                <b>
                    <router-link :to="'/profile/'+answer.user._id">{{ answer.user.email }}</router-link> | 
                    {{ new Date(answer.createdAt).toDateString() }}
                </b>
            </small>
            <span v-if="userAktif">
                <button
                    :class="'btn btn-outline-'+colorUpvote+' btn-sm mr-1'"
                    @click="upvoteAnswer"
                    v-if="userAktif._id !== answer.user._id"
                >Upvote <span>{{ answer.upvote.length }}</span></button>
                <button
                    :class="'btn btn-outline-'+colorDownvote+' btn-sm mr-1'"
                    @click="downvoteAnswer"
                    v-if="userAktif._id !== answer.user._id"
                >Downvote <span>{{ answer.downvote.length }}</span></button>
                <b-btn
                    class="btn btn-outline-warning btn-sm"
                    v-if="userAktif._id === answer.user._id"
                    @click="editAnswer(answer)"
                ><i class="fa fa-edit"></i></b-btn>
                <ModalEditAnswer
                    v-if="modalEditAnswer"
                    @close="modalEditAnswer=false"
                    :data-answer="answerActive"
                    :question-id="questionId"
                    @update-succes="updateAnswer"
                />
            </span>
        </div>
    </div>
</template>

<script>
    import ModalEditAnswer from '@/components/ModalEditAnswer.vue';
    import apiHacktiv from '@/config/api-hacktivoverflow.js';
    
    export default {
        name: 'CardAnswer',
        props: ['questionId', 'answer', 'userAktif'],
        components: {
            ModalEditAnswer,
        },
        data() {
            return {
                modalEditAnswer: false,
                answerActive: {},
                colorUpvote: '',
                colorDownvote: '',
            };
        },
        created() {
            this.updateColor();
        },
        watch: {
            answer: function() {
                this.updateColor();
            },
        },
        methods: {
            editAnswer(dataAnswer) {
                this.answerActive = dataAnswer;
                this.modalEditAnswer = true;
            },
            updateAnswer() {
                this.modalEditAnswer = false;
            },
            upvoteAnswer() {
                if(this.colorUpvote === 'warning') {
                    let popularity = 1;
                    if(this.colorDownvote === 'danger') {
                        popularity = 2;
                    }
                    apiHacktiv.post(`/questions/upvote/answer`,
                        {
                            questionId: this.questionId,
                            answerId: this.answer._id,
                            userAnswer: this.answer.user._id,
                            popularity: popularity,
                        },
                        { headers: { token: localStorage.getItem('token-hacktiv') } }
                    )
                        .then(question => {
                            this.$emit('update-vote-answer');
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    apiHacktiv.post(`/questions/noupvote/answer`,
                        {
                            questionId: this.questionId,
                            answerId: this.answer._id,
                            userAnswer: this.answer.user._id,
                            popularity: -1,
                        },
                        { headers: { token: localStorage.getItem('token-hacktiv') } }
                    )
                        .then(question => {
                            this.$emit('update-vote-answer');
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            },
            downvoteAnswer() {
                if(this.colorDownvote === 'warning') {
                    let popularity = -1;
                    if(this.colorUpvote === 'success') {
                        popularity = -2;
                    }
                    apiHacktiv.post(`/questions/downvote/answer`,
                        {
                            questionId: this.questionId,
                            answerId: this.answer._id,
                            userAnswer: this.answer.user._id,
                            popularity: popularity,
                        },
                        { headers: { token: localStorage.getItem('token-hacktiv') } }
                    )
                        .then(question => {
                            this.$emit('update-vote-answer');
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    apiHacktiv.post(`/questions/nodownvote/answer`,
                        {
                            questionId: this.questionId,
                            answerId: this.answer._id,
                            userAnswer: this.answer.user._id,
                            popularity: 1,
                        },
                        { headers: { token: localStorage.getItem('token-hacktiv') } }
                    )
                        .then(question => {
                            this.$emit('update-vote-answer');
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            },
            updateColor() {
                if(this.userAktif) {
                    this.colorUpvote = 'warning';
                    this.colorDownvote = 'warning';
                    for(let i = 0; i < this.answer.upvote.length; i++) {
                        if(this.answer.upvote[i] === this.userAktif._id) {
                            this.colorUpvote = 'success'
                        }
                    }
                    for(let i = 0; i < this.answer.downvote.length; i++) {
                        if(this.answer.downvote[i] === this.userAktif._id) {
                            this.colorDownvote = 'danger'
                        }
                    }
                }
            },
        },
    };
</script>