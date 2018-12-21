<template>
    <div>
        <div class="card text-white bg-secondary mb-3" style="width: 1700px; margin-left:50px;" v-for="question in questionsAllList.questions" :key="question._id">
            <div class="card-header"><router-link :to='{name:"question",params:{id:question._id}}'>{{question.title}}</router-link></div>
            <div class="card-body">
                <h5>{{question.question}}</h5>
            </div>
        </div>
    </div>
    
</template>

<script>;

export default {
    name: 'ReadAll',
    data() {
        return {
            
        }
    },
    components: {
        
    },
    methods: {
        
    },
    computed: {
        questionsAllList() {
            return this.$store.state.questions
        }
    },
    mounted(){
        
    }
}
</script>