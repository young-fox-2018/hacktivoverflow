<template>
    <div>
        <h2>Question</h2>

    <div class="question-list">
            <div v-for="(question) in questions" :key="question.id" >
                <div class="card" @click.prevent="toQuestionDetail(question._id)">
                    <div class="card-body d-flex align-items-start flex-column">
                        <div class="row">
                            <div class="col-4 d-flex align-items-center justify-content-center ">
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
