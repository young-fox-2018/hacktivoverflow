<template>
    <div>
        <form v-on:submit.prevent='addAnswer'>
            <label><b>Answer:</b></label><br>
                <wysiwyg v-model="myHTML" />
            <button type='submit' class='addbtn'>Answer~!</button>
        </form>
    </div>
</template>

<script>
import Firebase from '@/config/keyfile.js'
var database = Firebase.database()

export default {
    name:"AnswerBox",
    data: function(){
        return {
            myHTML: "",
        }
    },
    methods:{
        addAnswer(){
            database.ref('answers/' + this.$route.params.id).push({
                answer: this.myHTML,
                votes: 1,
                username: localStorage.username
            })
            this.myHTML = ""
        }
    }
}
</script>

<style scoped>
    @import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
