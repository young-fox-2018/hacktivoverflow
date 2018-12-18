<template>
    <div>
        <h3 class="text-left">{{question.title}}</h3>
        <hr>
    </div>
</template>

<script>
import axios from '@/helpers/axios'
export default {
    name: 'QuestionDetail',
    data: function() {
        return {
            question: {},
            questionId : this.$route.params.id
        }
    },
    created(){
        this.fetchQuestionDetail()
    },
    methods: {
        fetchQuestionDetail(){
            axios({
                method: 'GET',
                url: 'questions/' + this.questionId
            })
            .then(({data}) =>{
                console.log(data)
                this.question = data.question
            })
            .catch(({response}) =>{
                console.log(response.data)
            })
        }
    }
}
</script>
