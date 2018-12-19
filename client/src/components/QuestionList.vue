<template>
    <div class="col-md-8 mt-0 rounded">
        <question-form v-if="isLogin" />
        <div class="row">
            <div class="col">
                <h3>
                    Top Question
                </h3> 
            </div>
            <div class="col text-right">
                <!-- <ask-button v-if="isLogin" /> -->
            </div>
        </div>    
        <hr>     
        <!-- disni pertanyaan -->
        <question-card v-for="question in questionList" v-bind:key="question._id" :question="question" />
    </div>
</template>

<script>
import AskButton from '@/components/AskButton.vue'
import QuestionCard from '@/components/QuestionCard.vue'
import QuestionForm from '@/components/QuestionForm.vue'
import {mapState} from 'vuex'

export default {
    components : {
        AskButton,
        QuestionCard,
        QuestionForm
    },
    computed : { ...mapState([
        'isLogin',
        'questionList',
    ])
    }    
}
</script>
