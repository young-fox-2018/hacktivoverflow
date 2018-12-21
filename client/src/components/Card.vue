<template>
    <div id="card">
        <div class="row">
            <div class="col-md-3">
                <div class="votes">
                    <div>
                        {{question.upVoters.length - question.downVoters.length}}
                    </div>
                    <div>
                        <small>votes</small>
                    </div>
                </div>
                <div class="votes">
                    <div>
                        {{question.answers.length}}
                    </div>
                    <div>
                        <small>answers</small>
                    </div>
                </div>
            </div>
            <div class="col-md-9">
                <div class="question-summary">
                    <div>
                        <router-link :to="{name: 'single', params: {slug: question.slug, id: question._id}}">{{question.title}}</router-link>
                    </div>
                    <div style="display: inline">
                        <button class="btn btn-default btn-sm mr-1" v-for="(tag, index) in question.tags" :key="index">{{tag}}</button>
                    </div>
                    <div v-if="question.author._id == userLoggedIn.id" style="text-align: right !important;">
                        <a href="" @click.prevent="toUpdate(question._id)" class="btn btn-info btn-sm mr-2">update</a>
                        <a href="" @click.prevent="toDelete(question._id)" class="btn btn-danger btn-sm">delete</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import api from '../assets/api-server.js'

export default {
    data(){
        return {

        }
    },
    computed: {
        ...mapState(['userLoggedIn']),
    },
    created(){
        
    }, 
    methods: {
        ...mapActions(['getQuestions']),
        toDelete(id){
            this.$swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        api.delete(`/questions/${id}`, {headers: {token: localStorage.token}})
                            .then(({data})=> {
                                // console.log(data)
                                this.$swal(
                                    'Deleted!',
                                    'Your Question has been deleted.',
                                    'success'
                                    )
                                    this.getQuestions()
                            })
                            .catch(err=> {
                                console.log(err)
                            })
                    }
            })
        }, 
        toUpdate(id){
            this.$router.push(`/ask/${id}/edit`)
        }
    },
    props: {
        question: Object
    }
}
</script>

<style>
.votes{
    display: inline-block;
    height: 38px;
    min-width: 38px;
    margin: 0 3px 0 0;
    font-size: 13px;
    color: #848d95;
    padding: 7px 6px;
    text-align: center;
}

.question-summary {
    text-align: left;
}

</style>


