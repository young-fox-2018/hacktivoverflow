<template>
    <div class="container">
        <h1>New Question</h1>
        <hr>
        <form>
            <div class="form-group">
                <label>Title</label>
                <input type="text" class="form-control" placeholder="Write title here" v-model="question.title">
            </div>
            <b-form-group label="Please select tag">
                <b-form-checkbox-group id="checkboxes1" name="flavour1" v-model="selected" :options="options">
                </b-form-checkbox-group>
            </b-form-group>
            <div class="form-group">
                <label>Content: </label>
                <textarea class="form-control" rows="10" placeholder="Write detail here" v-model="question.detail"></textarea>
            </div>
            <button type="submit" class="btn btn-dark" @click.prevent="postQuestion">Submit</button>
        </form>
    </div> 
</template>

<script>
import { mapState } from 'vuex'
import axios from '@/api/hacktivOverflow-api.js'

export default {
    computed: {
        ...mapState(['tags'])
    },

    data() {
        return {
            question: {
                title: "",
                detail: ""
            },
            alert: false,
            message: "",
            selected: [],
            options: []
        }
    },

    methods: {
        setTagOptions: function() {
            this.tags.forEach( tag => {
                let newOpt = {}
                newOpt['value'] = tag._id
                newOpt['text'] = tag.name
                this.options.push(newOpt)
            })
        },

        postQuestion: function() {
            axios({
                method: 'POST',
                url: 'questions',
                data: {
                    title: this.question.title,
                    detail: this.question.detail,
                    tag: this.selected
                },
                headers: {
                    accesstoken: localStorage.getItem('accesstoken')
                }
            })
            .then( response => {
                this.$store.dispatch('getQuestions')
                this.$router.push('/questions')
                this.$toasted.success(
                    `${response.data.message}`, 
                    { 
                        theme: "outline", 
                        position: "top-right", 
                        duration : 5000
                    }
                )
            })
            .catch( err => {
                console.log(err.response);
            })
        }
    },
    created() {
        this.setTagOptions()
    }
}
</script>
