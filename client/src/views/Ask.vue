<template>
    <div id="ask">
        <div class="row mt-2">
            <div class="col-4">
                <h3 style="float: left">Ask a question</h3>
            </div>
        </div>
        <div class="card text-center" v-if="loginStatus">
            <div class="card-body">
                <form action="" @submit.prevent="asking">
                    <div class="form-group">
                        <label for="title" >Title</label>
                        <div class="small-font">
                            <input type="text" class="form-control" v-model="currentQuestion.title" v-if="$route.params.id" required>
                            <input type="text" class="form-control" v-model="question.title" v-else required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="question" >Question</label>
                        <wysiwyg id="formQuestion" v-model="currentQuestion.body" v-if="$route.params.id"/>
                        <wysiwyg id="formQuestion" v-model="question.body" v-else/>
                    </div>
                    <div class="form-group" >
                        <label for="tags">Tags</label>
                        <tags-input @get-tags="question.tags=$event" v-if="$route.params.id" :usage="'edit'" :currentTags="currentQuestion.tags"></tags-input>
                        <tags-input @get-tags="question.tags=$event" v-else :usage="'create'"></tags-input>
                    </div>
                    <div>
                        <input type="submit" value="Ask" class="btn btn-primary">
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
        }
    },
    computed: {
        ...mapState(['loginStatus', 'token', 'currentQuestion']),
    },
    created(){
        if(!this.loginStatus){
            // this.isLogin()
            this.$router.replace('/')
        } else {
            if(this.$route.params.id){
                this.getQuestion(this.$route.params.id)
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


