<template>
    <div>
        <div class="d-flex justify-content-between mb-3">
            <h2>Question</h2>
            <router-link to="/addquestion">
                <button class="btn btn-primary mr-3" > Ask a Question</button>
            </router-link>
        </div>
        <hr>

        <div class="question-list">
            <div v-for="(question) in questions" :key="question.id" >
                <div class="card" @click.prevent="toQuestionDetail(question._id)">
                    <div class="card-body ">
                        <div class="row">
                            <div class="col-4 ">
                                <div class="row justify-content-between">
                                    <div class="col-4">
                                        0 <br>
                                        votes    
                                    </div>
                                    <div class="col-4">
                                        0 <br>
                                        answer
                                    </div>
                                    <div class="col-4">
                                        0 <br>
                                        views
                                    </div>
                                </div>
                            </div>
                            <div class="col-8 text-left">
                                <h5 class="card-title">{{ question.title }}</h5>
                                <p>by: {{ question.author.name }}</p>
                                <!-- <p>created_at: {{ question.created_at }}</p> -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pt-2"></div>
            </div>
        </div>
    </div>

</template>

<script>
    import axios from '@/helpers/axios.js'

export default {
    name: 'QuestionList',
    data: function() {
        return{
            questions: []
        }
    },
    created() {
        this.fetchQuestion()
    },
    methods: {
        fetchQuestion() {
            axios({
                method: 'GET',
                url: '/questions',
            })
            .then(({data}) =>{
                this.questions = data.questions
            })
            .catch(({response}) =>{
                console.log(response.data)
            })
        },
        toQuestionDetail(questionId){
            this.$router.push(`/questions/${questionId}`);
        }
    }
}
</script>
