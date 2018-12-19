<template>
    <div>
        Detail Question:
        <br>
        <h3>{{question.title}}</h3>
        <h5>{{question.question}}</h5>

        <button data-toggle="modal" data-target="#editQuestionModal">EDIT QUESTION</button>
        <button @click.prevent="deleteQuestion()">DELETE QUESTION</button>

        <div class="modal fade" id="editQuestionModal" tabindex="-1" role="dialog" aria-labelledby="editQuestionModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editQuestionModalLabel">Edit Question</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body"> 
                        <div class="grid">    
                            <form method="post" id="form-question" onsubmit="return false">
                                <div class="form__field">
                                    <label for="title">Title</label>
                                    <input type="text" name="title" v-model="question.title" class="form__input" required>
                                </div>   
                                <div class="form__field">
                                    <label for="text">Content</label>          
                                    <textarea name="text" form="form-question" v-model="question.question" class="form__input" required></textarea>        
                                </div>
                                <div class="form__field">
                                    <button id="buttonEditQuestion" data-dismiss="modal" v-on:click.prevent="updateQuestion()">UPDATE QUESTION</button>
                                </div>                    
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <FormComment :questionId="this.$route.params.id" @readone="readQuestion"></FormComment> -->
        <br>
        <ul> Comments:
            <li v-for="comment in question.commentList" :key="comment._id">
                {{comment.content}}
            </li>
        </ul>
    </div>
</template>

<script>
import axios from '@/apis/axios'
// import FormComment from '@/components/FormComment.vue';

export default {
    name: 'QuestionDetail',
    data() {
        return  {
            question: "",
        }
    },
    components: {
        // FormComment
    },
    props: {    
    },
    methods: {
        readQuestion() {
            axios({
                method: 'GET',
                url: `/questions/${this.$route.params.id}`,
            })
            .then(({ data }) => {
                this.question = data.question;
            })
            .catch((err) => {
                console.log(err.response);
            });
        },
        updateQuestion() {
            axios({
                method: 'PUT',
                url: `/questions/${this.$route.params.id}`,
                headers: {
                    token: localStorage.getItem("token")
                },
                data: {
                    title: this.question.title,
                    text: this.question.text,
                }
            })
            .then(result => {                
                this.readQuestion()
                this.$store.dispatch('getAllQuestion')
            })
            .catch((err) => {
                console.log(err.response);
            });
        },
        deleteQuestion() {
            axios({
                method: 'DELETE',
                url: `/questions/${this.$route.params.id}`,
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            .then(result => {
                this.readQuestion()
                this.$store.dispatch('getAllQuestion')
            })
            .catch((err) => {
                console.log(err.response);
            });
        },
    },
    created() {
        this.readQuestion()
    },
}
</script>