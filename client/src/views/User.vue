<template>
    <div class="mt-5">
        <b-alert :show="dismissCountDown"
            dismissible
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            <p>{{errorMessage}}</p>
        </b-alert>
        <table class="table table-dark">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(question, index) in questions" :key="index">
                <th scope="row">{{ index +1 }}</th>
                <td>{{question.title}}</td>
                <td>
                    <button 
                    class="btn btn-warning btn-sm" 
                    @click="showEditModal(question)"
                    >
                        Edit Question
                    </button>
                    <button 
                    class="btn btn-danger btn-sm" 
                    @click="deleteQuestion"
                    >
                        Delete Question
                    </button>
                </td>
                </tr>
            </tbody>
        </table>
        <b-modal id="editQuestionModal" title="Bootstrap-Vue" ref="editQuestionModal">
            <form>
                <div class="form-group">
                    <label for="editTitle">Title</label>
                    <input  type="text" class="form-control" id="editTitle" v-model="form.title" >
                </div>
                <div>
                    <wysiwyg v-model="form.content" />
                </div>
                <div>
                    <b-form-group label="Add Category">
                        <b-form-checkbox-group v-model="form.tags"
                                                buttons
                                                button-variant="primary"
                                                size="sm"
                                                name="buttons2"
                                                :options="tags">
                        </b-form-checkbox-group>
                    </b-form-group>
                </div>
                <!-- <button type="submit" class="btn btn-primary" style="display:none" ></button> -->
            </form>
            <div slot="modal-footer" class="w-100">
                <b-btn size="sm" class="float-right" variant="warning" @click="editQuestion">
                Edit
                </b-btn>
            </div>
        </b-modal>
    </div>
</template>

<script>
import axios from '@/helpers/axios'

export default {
    name: 'User',
    data () {
        return {
            questions: [],
            dismissCountDown: 0,
            errorMessage: '',
            form:{
                title: '',
                content: '',
                tags: [],
            }
        }
    },
    created() {
        this.fetchOwnQuestions()
    },
    methods: {
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown;
        },
        fetchOwnQuestions(){
            axios({
                method: 'GET',
                url: '/questions/own',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({data}) =>{
                console.log(data)
                this.questions = data.questions
            })
            .catch(({response}) =>{
                console.log(response.data)
            })
        },
        deleteArticle(question, index) {
            axios({
                method: 'DELETE',
                url: '/questions/' + question._id,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({data}) =>{
                this.errorMessage = data.message;
                this.fetchOwnQuestions()
                this.countDownChanged(3);
            })
            .catch(({response: {data}}) =>{
                this.errorMessage = data.message;
                this.countDownChanged(3);
            })
        },
        updateArticle(question, index) {
            this.$router.push('/edit-question/' + question._id)
        },
        showEditModal(question){
            this.form = {... question}

            this.$refs.editQuestionModal.show()
        },
        editQuestion(){
            let input = {
                title: this.form.title,
                content: this.form.content,
                tags: this.form.tags
            }

            axios({
                url: '/questions/' + this.questionId,
                method: 'PATCH',
                headers: {
                    token: localStorage.token
                },
                data: input
            })
            .then(({data}) =>{
                alert(data.message)
                this.$refs.editQuestionModal.hide()
            })
            .catch(({response}) =>{
                console.log(response)
            })
        },
        deleteQuestion(){
            axios({
                url: '/questions/' + this.questionId,
                method: 'DELETE',
                headers: {
                    token: localStorage.token
                },
            })
            .then(({data}) =>{
                alert(data.message)
                this.$router.push('/')
            })
            .catch(({response}) =>{
                console.log(response)
            })
        }
    }
}
</script>
