<template>
    <div class="card-detail">
        <div class="row">
            <div class="col-md-1 vote">

                <!-- {{item.upVoters.length}}
                {{item.downVoters.length}} -->

                <div>
                    <a href="" @click.prevent="upVoteQuestion" v-if="usage == 'question'"><i class="fas fa-arrow-up"></i></a>
                    <a href="" @click.prevent="upVoteAnswer" v-if="usage == 'answer'"><i class="fas fa-arrow-up"></i></a>
                </div>
                <div>
                    {{item.upVoters.length - item.downVoters.length}}
                </div>
                <div>
                    <a href="" @click.prevent="downVoteQuestion" v-if="usage == 'question'"><i class="fas fa-arrow-down"></i></a>
                    <a href="" @click.prevent="downVoteAnswer" v-if="usage == 'answer'"><i class="fas fa-arrow-down"></i></a>
                </div>
            </div>
            <div class="col-md-11 question-summary">
                <div v-html="item.body"></div>
                <div style="display: inline" v-if="usage == 'question'">
                    <button class="btn btn-default btn-sm mr-1" v-for="(tag, index) in item.tags" :key="index">{{tag}}</button>
                </div>
                <div class="mt-2">
                    <small v-if="usage == 'question'">asked by {{item.author.name}}</small>
                    <small v-if="usage == 'answer'" >answered by {{item.author.name}}</small>
                    <small v-if="usage == 'answer' && item.author._id == userLoggedIn.id">delete</small>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import api from '../assets/api-server.js'

export default {
    props: {
        item: {
            type: Object, 
            default: {
                upVoters: [],
                downVoters: [],
                answers: [{
                    upVoters: [],
                    downVoters: [],
                    author: {
                        name: '',
                        _id: ''
                    }
                }]
            }
        },
        usage: String,
    }, 
    methods: {
        ...mapActions(['getQuestion']),
        upVoteQuestion(){
            if(!this.userLoggedIn.id){
                this.$swal({
                    type: 'warning',
                    title: 'please login to vote',
                    time: 2000
                })
            } else {
                if(this.item.author._id == this.userLoggedIn.id){
                    this.$swal({
                        type: 'warning', 
                        title: 'Can not upvote your own question'
                    })
                } else {
                    api.patch(`/questions/${this.$route.params.id}/upvote`, {}, {headers: {token: localStorage.token}})
                        .then(({data})=> {
                            // console.log(data)
                            // this.$emit('get-vote')
                            this.getQuestion(this.$route.params.id)
                        })
                        .catch(err=> {
                            console.log(err.response)
                        })
                }
            }
            
        },
        downVoteQuestion(){
            if(!this.userLoggedIn.id){
                this.$swal({
                    type: 'warning',
                    title: 'please login to vote'
                })
            } else {
                if(this.item.author._id == this.userLoggedIn.id){
                    this.$swal({
                        type: 'warning', 
                        title: 'Can not downvote your own question'
                    })
                } else {
                    api.patch(`/questions/${this.$route.params.id}/downvote`, {}, { headers: {token: localStorage.token}})
                    .then(({data})=> {
                        this.getQuestion(this.$route.params.id)
                    })
                }
            }
        }, 
        upVoteAnswer(){
            if(!this.userLoggedIn.id){
                this.$swal({
                    type: 'warning',
                    title: 'please login to vote'
                })
            } else {
                if(this.item.author._id == this.userLoggedIn.id){
                    this.$swal({
                        type: 'warning',
                        title: 'Error!',
                        text: 'Can not upvote your own answer'
                    })
                }
            } 
        },
        downVoteAnswer(){
            if(!this.userLoggedIn.id){
                this.$swal({
                    type: 'warning',
                    title: 'please login to vote'
                })
            } else {
                if(this.item.author._id == this.userLoggedIn.id){
                    this.$swal({
                        type: 'warning',
                        title: 'Error!',
                        text: 'Can not downvote your own answer'
                    })
                }
            }
            
        }
    },
    computed: {
        ...mapState(['currentQuestion', 'userLoggedIn'])
    },
    created(){
        console.log(this.item)
    }
}
</script>



