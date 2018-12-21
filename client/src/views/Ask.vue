<template>
    <div id="ask">
        <div class="row mt-2">
            <div class="col-4">
                <h3 style="float: left">Ask a question</h3>
            </div>
        </div>
        <div class="card text-center" v-if="loginStatus">
            <div class="card-body">
                <form @submit.prevent>
                    <div class="form-group">
                        <label for="title" >Title</label>
                        <div class="small-font">
                            <input type="text" class="form-control" v-model="editQuestion.title" v-if="$route.params.id" required>
                            <input type="text" class="form-control" v-model="question.title" v-else required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="question" >Question</label>
                        <wysiwyg id="formQuestion" v-model="editQuestion.body" v-if="$route.params.id !== ''"/>
                        <wysiwyg id="formQuestion" v-model="question.body" v-else/>
                    </div>
                    <div class="form-group" >
                        <label for="tags">Tags</label>
                        <tags-input @get-tags="question.tags=$event" v-if="$route.params.id" :usage="'edit'" :currentTags="editQuestion.tags"></tags-input>
                        <tags-input @get-tags="question.tags=$event" v-else :usage="'create'"></tags-input>
                    </div>
                    <div>
                        <input type="submit" @click.prevent="edit" value="Edit" class="btn btn-primary"  v-if="$route.params.id">
                        <input type="submit" @click.prevent="asking" value="Ask" class="btn btn-primary" v-else>
                    </div>
                </form>
            </div>
            <div class="card-footer text-muted">
                
            </div>
        </div>
    </div>
</template>

<script>
import TagsInput from '@/components/TagsInput.vue'
import {mapState, mapActions} from 'vuex'
import api from '../assets/api-server.js'

export default {
    name: 'ask',
    components: {
        TagsInput
    },
    props: {
        userLoggedIn: Object,
    },
    data(){
        return {
            question: {
                title: '',
                body: '',
                tags: []
            }, 
            editQuestion: {
                title: '',
                body: '',
                tags: []
            }
        }
    },
    methods: {
        ...mapActions(['ask', 'isLogin', 'getQuestion']),
        asking(){
            api.post('/questions', this.question, {headers: {token: localStorage.token}})
                .then(({data})=> {
                    this.ask(data)
                    this.$swal({
                        type: 'success',
                        title: 'Question is saved!'
                    })
                    this.question= {
                        title: '',
                        body: '',
                        tags: []
                    }
                    this.$router.push('/')
                })
                .catch(({response})=> {
                    this.$swal({
                        type: 'warning',
                        title: 'Error!',
                        text: response.statusText
                    })
                })
        }, 
        edit(){
            api.put(`/questions/${this.$route.params.id}`, this.editQuestion, {headers: {token: localStorage.token}})
                .then(({data})=> {
                    this.$swal({
                        type: 'success',
                        title: 'Edit Success',
                        text: 'changes successfully added'
                    })
                    this.$router.push('/')
                })
                .catch(err=> {
                    console.log(err)
                })
        }
    },
    computed: {
        ...mapState(['loginStatus', 'token', 'currentQuestion']),
    },
    created(){
        if(!this.loginStatus){
            this.$router.replace('/')
        } else {
            if(this.$route.params.id){
                api.get(`/questions/${this.$route.params.id}`)
                    .then(({data})=> {
                        console.log(data, 'data')
                        this.editQuestion = data
                    })
                    .catch(err=> {
                        console.log(err)
                    })
            }
        }
        
    }, 
    watch: {
        $route(){
            if(this.$route.params.id){
                this.getQuestion(this.$route.params.id)
            }
        }
    }
}
</script>

<style>
.vue-tags-input{
    max-width: 900px !important;
}

.small-font {
    font-size: 13px !important;
}
</style>


