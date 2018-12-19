<template>
    <div class="d-flex justify-content-center" style="margin-left:200px;">
        <span class="form__field" style=" padding-right:50px;">
            <label for="title">Title : </label>
            <input type="text" name="title" v-model="title" placeholder="title" class="form__input" style="width:300px; height:60px;" required>
        </span>   
        <span class="form__field" style=" padding-right:50px;">
            <label for="question">Question : </label>          
            <textarea name="question" form="form-article" v-model="question" placeholder="question" class="form__input" style="width:600px; height:60px;" required></textarea>        
        </span>
        <span class="form__field" style=" padding-right:50px;">
            <button id="buttonAddQuestion" v-on:click.prevent="addQuestion()">ADD QUESTION</button>
        </span>                    
    </div>
</template>

<script>
import axios from '@/apis/axios'

export default {
    name: 'AddQuestion',
    data() {
        return  {
            title: "",
            question: ""
        }
    },
    methods: {
        addQuestion() {
            axios({
                method: "POST",
                url: `/questions`,
                headers: {
                    token: localStorage.getItem("token")
                },
                data: {
                    title: this.title,
                    question: this.question,
                }
            })
            .then(result => {
                this.$store.dispatch('getAllQuestion')
                this.title = ''
                this.question = ''
            })
            .catch(err => {
                console.log(err.response)
            })  
        }
    }
}
</script>