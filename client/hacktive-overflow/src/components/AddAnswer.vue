<template>
    <div>
        <div class="form__field">
            <label for="content">Answer</label>          
            <textarea name="content" form="form-article" v-model="content" placeholder="content" class="form__input" required></textarea>        
        </div>                  
        <div class="form__field">
            <button id="buttonAddComment" data-dismiss="modal" v-on:click.prevent="addAnswer()">Add Answer</button>
        </div>   
    </div>
</template>

<script>
import axios from '@/apis/axios'

export default {
    name: 'AddAnswer',
    data() {
        return  {
            content: "",
        }
    },
    props: ['articleId'],
    methods: {
        addComment() {
            axios({
                method: "POST",
                url: `/comments/${this.articleId}`,
                headers: {
                    token: localStorage.getItem("token")
                },
                data: {
                    content: this.content,
                }
            })
            .then(result => {
                // this.$emit("read-all")
                this.$emit("readone")
            })
            .catch(err => {
                console.log(err.response)
            })  
        }
    }
}
</script>