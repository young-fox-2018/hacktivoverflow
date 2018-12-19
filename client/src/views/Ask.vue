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
                            <input type="text" class="form-control" v-model="question.title" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="question" >Question</label>
                        <wysiwyg id="formQuestion" v-model="question.body"/>
                    </div>
                    <div class="form-group" >
                        <label for="tags">Tags</label>
                        <tags-input @get-tags="question.tags=$event"></tags-input>
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
            }
        }
    },
    methods: {
        ...mapActions(['ask', 'isLogin']),
        asking(){
            api.post('/questions', this.question, {headers: {token: localStorage.token}})
                .then(({data})=> {
                    this.ask(data)
                    this.$swal({
                        type: 'success',
                        title: 'Question is saved!'
                    })
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
        ...mapState(['loginStatus', 'token']),
    },
    created(){
        if(!this.loginStatus){
            // this.isLogin()
            this.$router.replace('/')
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


