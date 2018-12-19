<template>
    <div class="col-12 mb-3 px-0">
        <button @click="toggleForm" class="btn btn-primary btn-md col-12 mb-2">
            <strong>Ask a Question</strong>
        </button>
        <img v-show="!isShowing" class="ml-5" src="https://storage.cloud.google.com/dhimas_upload_image/quest.png?_ga=2.187800941.-497190011.1543889567&_gac=1.251301620.1544174663.CjwKCAiA0ajgBRA4EiwA9gFOR5QQZhmNuSIaX50OWQ2EpLheGssySYFN1injaWc8moquV2svWHIguBoC7MgQAvD_BwE" height="300px" alt="">
        <template v-if="isShowing">
            <label for="title">Title : </label>
            <input type="text" v-model="question.title" class="form-control mb-3" >
            <label for="tag">Tags :</label>
            <input type="text" v-model="tagList" class="form-control mb-3" placeholder="Separate multiple tags by space. e.g: javascript php">
            <wysiwyg v-model="question.content" style="min-height:350px" />
            <button @click="createQuestion" class="btn btn-primary btn-md col-12 mb-2">
                <strong>Submit</strong>
            </button>
        </template>
    </div>
</template>

<script>
import miniToastr from 'mini-toastr'

export default {
    name: 'QuestionForm',
    data() {
        return {
            question : {
                content: '',
                title: '',
                tags: []
            },
            tagList: '',
            isShowing: false
        }
    },
    methods: {
        toggleForm() {
            this.isShowing ? this.isShowing = false : this.isShowing = true
        },
        createQuestion() {
            this.$store.dispatch('createQuestion', this.question)
                .then(() => {
                    miniToastr.success('success create question', '', 2000)
                })
                .catch(err => {
                    miniToastr.warn('create question failed', '', 2000)
                })
            this.question.tags = this.tagList.split(' ')
            this.resetForm()
        },
        resetForm() {
            this.question = {
                content: '',
                title: '',
                tags: []
            }
            this.tagList = ''
        }
    },
    created() {
        miniToastr.init()
    }
}
</script>

<style>
    @import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
