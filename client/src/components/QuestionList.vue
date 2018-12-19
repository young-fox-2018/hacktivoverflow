<template>
    <div>
        <div class="d-flex justify-content-between mb-3 mt-2">
            <h2>Question</h2>
            <router-link to="/addquestion">
                <button class="btn btn-primary mr-3" > Ask a Question</button>
            </router-link>
        </div>
        <hr>
        

        <div class="question-list">
            <div v-for="(question) in filteredQuestions" :key="question.id" >
                <div class="card" @click.prevent="toQuestionDetail(question._id)">
                    <div class="card-body ">
                        <div class="row">
                            <div class="col-4 ">
                                <div class="row justify-content-between">
                                    <div class="col-4">
                                        {{(question.upvoteSum - question.downvoteSum) || 0}}<br>
                                        votes    
                                    </div>
                                    <div class="col-4">
                                        {{question.answersSum || 0}} <br>
                                        answer
                                    </div>
                                    <div class="col-4">
                                        {{question.viewsSum || 0}} <br>
                                        views
                                    </div>
                                </div>
                            </div>
                            <div class="col-8 text-left">
                                <h5 class="card-title">{{ question.title }}</h5>
                                
                                <div class="d-flex align-items-baseline justify-content-between">
                                    <div class="d-flex flex-col">
                                        <i class="fas fa-tag text-grey mr-2"></i>
                                        <p class="text-grey ml-2" v-for="(tag, index) in question.tags" :key="index">{{tag}}</p>
                                    </div>
                                    <div class="flex-col">
                                        <p>Created at: {{question.created_at}}</p>
                                        <p class="text-right">{{question.author.name}}</p>
                                    </div>
                                </div>
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
            questions: [],
            filteredQuestions: [],
            tag: this.$route.query.tag
        }
    },
    created() {
        this.fetchQuestion()
    },
    watch: {
        $route() {
            this.tag = this.$route.query.tag;
            this.filteredQuestions = []
            this.fetchQuestion()
        }
    },
    methods: {
        fetchQuestion() {
            axios({
                method: 'GET',
                url: '/questions',
            })
            .then(({data}) =>{
                
                const self = this;

                db
                    .ref('/')
                    .on('value', (snapshot) => {

                        const firebaseData = snapshot.val();
                        self.questions = data.questions;

                        for (let i = 0; i < self.questions.length; i++) {
                            const question = self.questions[i];
                            for (let key in firebaseData) {
                                if (key === question._id) {
                                    const questionDetail = firebaseData[key];
                                    question.answersSum = questionDetail.answers ? Object.keys(questionDetail.answers).length : 0;
                                    question.upvoteSum = questionDetail.upvote ? Object.keys(questionDetail.upvote).length : 0;
                                    question.downvoteSum = questionDetail.downvote ? Object.keys(questionDetail.downvote).length : 0;
                                    question.viewsSum = questionDetail.views || 0;
                                }
                            }

                        } 
                        this.filterQuestion()
                    });

            })
            .catch(({response}) =>{
                console.log(response.data)
            })
        },
        toQuestionDetail(questionId){
            let newViewsSum 

            this.questions.map(element =>{
                if(element._id == questionId){
                    if(element.viewsSum){
                        newViewsSum = element.viewsSum +1
                    }
                    else {
                        newViewsSum = 1
                    }
                }
            })

            db.ref(questionId +'/views')
            .set(newViewsSum)

            this.$router.push(`/questions/${questionId}`);
        },
        filterQuestion(){
            console.log('filtering')
            if(this.$route.query.tag){
                this.questions.map(element =>{
                    let foundTag = false
                    if(element.tags){
                        foundTag = element.tags.find(tagElement =>{
                            return tagElement == this.tag
                        })
                    }
                    if(foundTag){
                        this.filteredQuestions.push(element)
                    }
                })
            }
            else if(this.$route.query.search) {
                this.filteredQuestions = this.questions.filter(element =>{
                    let searchRegex = new RegExp(this.$route.query.search, 'gi')
                    if(element.title.match(searchRegex)){
                        return element
                    }
                })
            }
            else {
                this.filteredQuestions = {...this.questions}
            }
        }
    }
}
</script>
