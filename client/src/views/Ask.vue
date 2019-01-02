<template>
    <div id="ask">
        <div class="row mt-2">
            <div class="col-4">
                <h3 style="float: left" v-if="usage== 'create'">Ask a question</h3>
                <h3 style="float: left" v-else-if="usage=='edit'">Edit a question</h3>
            </div>
        </div>
        <loading-spinner v-show="isLoading"></loading-spinner>
        <div class="card text-center" v-if="!isLoading">
            <div class="card-body">
                <form @submit.prevent>
                    <div class="form-group">
                        <label for="title" >Title</label>
                        <div class="small-font">
                            <input type="text" class="form-control" v-model="editQuestion.title" v-if="usage=='edit'" required>
                            <input type="text" class="form-control" v-model="question.title" v-else required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="question" >Question</label>
                        <wysiwyg id="formQuestion" v-model="editQuestion.body" v-if="usage=='edit'"/>
                        <wysiwyg id="formQuestion" v-model="question.body" v-else/>
                    </div>
                    <div class="form-group" >
                        <label for="tags">Tags</label>
                        <tags-input @get-tags="editQuestion.tags=$event" v-if="usage=='edit'" :usage="'edit'" :currentTags="editQuestion.tags"></tags-input>
                        <tags-input @get-tags="question.tags=$event" v-else :usage="'create'" :currentTags="[{text: ''}]"></tags-input>
                    </div>
                    <div>
                        <input type="submit" @click.prevent="edit" value="Edit" class="btn btn-primary"  v-if="usage=='edit'">
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
import LoadingSpinner from '@/components/Loading.vue'

export default {
    name: 'ask',
    components: {
        TagsInput,
        LoadingSpinner
    },
    props: {
        userLoggedIn: Object,
    },
    data(){
        return {
            question: {
                tagstitle: '',
                body: '',
                tags: []
            }, 
            editQuestion: {
                title: '',
                body: '',
                tags: []
            }, 
            usage: 'create',
            isLoading: false
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
                    console.log(response)
                    this.$swal({
                        type: 'warning',
                        title: 'Error euy!',
                        text: response.statusText
                    })
                })
        }, 
        edit(){
            this.$swal.showLoading()
            api.put(`/questions/${this.$route.params.id}`, this.editQuestion, {headers: {token: localStorage.token}})
                .then(({data})=> {
                    this.$swal({
                        type: 'success',
                        title: 'Edit Success',
                        text: 'changes successfully added',
                        timer: 2500
                    })
                    // this.$swal.close()
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
                this.usage = 'edit'
                this.isLoading = true
                api.get(`/questions/${this.$route.params.id}`)
                    .then(({data})=> {
                        let dummyTags = []
                        for(let i = 0; i < data.tags.length; i++){
                            let newDummy = {
                                text: data.tags[i].name,
                                tiClasses: ['valid']
                            }
                            dummyTags.push(newDummy)
                        } 
                        data.tags = dummyTags
                        // console.log(data.tags, '=======')
                        this.editQuestion = data
                        this.isLoading = false
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
                this.usage = 'edit'
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


