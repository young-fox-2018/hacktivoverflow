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
                                        {{Number(question.upvoteSum) - Number(question.downvoteSum)}}<br>
                                        votes    
                                    </div>
                                    <div class="col-4">
                                        {{question.answersSum}} <br>
                                        answer
                                    </div>
                                    <div class="col-4">
                                        {{question.viewsSum}} <br>
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
    import db from '@/helpers/firebase.js'

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
                this.fetchQuestionDetail()
            })
            .catch(({response}) =>{
                console.log(response.data)
            })
        },
        toQuestionDetail(questionId){
            let newViewsSum 

            this.questions.map(element =>{
                if(element._id = questionId){
                    newViewsSum = element.viewsSum +1
                }
            })

            db.ref(questionId +'/views')
            .set(newViewsSum)

            this.$router.push(`/questions/${questionId}`);
        },
        fetchQuestionDetail(){
            let self = this


            this.questions.map(element =>{
                db.ref(element._id +'/answers')
                .on('value', (snapshot) =>{
                    element.answersSum = snapshot.numChildren()
                })
            })

            this.questions.map(element =>{
                db.ref(element._id +'/upvote')
                .on('value', (snapshot) =>{
                    element.upvoteSum = snapshot.numChildren()
                })
            })

            this.questions.map(element =>{
                db.ref(element._id +'/downvote')
                .on('value', (snapshot) =>{
                    element.downvoteSum = snapshot.numChildren()
                })
            })

            this.questions.map(element =>{
                db.ref(element._id +'/views')
                .on('value', (snapshot) =>{
                    element.viewsSum = snapshot.val()
                })
            })
        }
    }
}
</script>
