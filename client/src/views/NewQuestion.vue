<template>
    <div>
        <form v-on:submit.prevent='addQuestion'>
            <h1>New Question</h1>
            <hr>

            <label><b>Title:</b></label><br>
            <input style='width: 75%; margin: 0 auto;' type='text' v-model='title' placeholder='' name='title' required><br><br>

            <div style='width: 75%; margin: 0 auto;' class='form-group'>
                <label><b>Question:</b></label>
                <wysiwyg v-model="myHTML" />
            </div> 

            <button type='submit' class='addbtn'>Let's Ask~!</button>
        </form>
        
    </div>
</template>

<script>
import axios from '@/helpers/axios.js'

export default {
    name: "NewQuestion",
    data: function() {
        return {
            title: "",
            myHTML: ""
        }
    },
    methods:{
        addQuestion(){
            axios.post('/questions', {
                title: this.title,
                question: this.myHTML
            }, {headers: {token: localStorage.token}})
            .then(response => {
              this.$router.push('/')  
            })
            .catch(err => {
                this.$store.dispatch('errmsg', err.response.data)
            })
        }
    }
}
</script>

<style scoped>
    @import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
