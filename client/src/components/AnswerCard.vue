<template>
    <div class="col-md-12 rounded mt-2">
        <!-- header top question sama tombol tanya -->
        <div class="row">
            <div class="col-md-8">
            </div>
            <div class="col-md-4 text-right">
                <p class="text-muted mb-0">answered {{convertTime(answer.timeStamp)}}</p>
            </div>
        </div>    
        <hr class="mt-0"> 
        <div class="row mt-2">
            <div class="col-md-2 mr-0 pl-0 justify-content-center">
                    <p class="text-center">{{countVotes(answer.upvotes, answer.downvotes)}}</p>
                    <p class="text-muted text-center my-0 py-2">Votes</p>
            </div>
            <div class="col-md-10 ml-0 pl-0">
                <div v-html="answer.content"></div>
                <p class="text-muted mb-2">answered by : {{answer.owner.name}}</p>
                <p class="text-muted mb-2"><span class="fas fa-star yellow mr-3"></span>popularity : {{answer.owner.popularity}}</p>
                <div class="row">
                    <div class="container mb-2">
                        <button class="btn btn-outline-success" @click="upvote">upvote</button>
                        <button class="btn ml-2 btn-outline-danger" @click="downvote">downvote</button>
                        <button v-if="answer.owner.name === userName" data-toggle="modal" :data-target="`#no${answer._id.substr(10, 16)}`" class="btn ml-2 btn-outline-warning" @click="editAnswer(answer)">edit</button>
                    </div>
                </div>
            </div>
        </div>
        
        
        <hr class="mt-0"> 
        <!-- Modal -->
        <div class="text-left">
            <div class="modal fade" :id="'no'+answer._id.substr(10, 16)" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" >Edit Answer</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                <div class="form-group">
                    <label for="comment">Your Answer:</label>
                    <wysiwyg v-model="editData.content" style="min-height:200px" />
                </div>
                    <button type="button" class="btn btn-primary" @click="updateAnswer(answer._id)"  data-dismiss="modal">Submit</button>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import api from '@/api/axios'
import miniToastr from 'mini-toastr'

export default {
    props: ['answer','convertTime', 'countVotes'],
    data () {
        return {
            userName: localStorage.getItem('name'),
            editData: {}
        }
    },
    methods: {
        upvote() {
            api({
                method: 'PATCH',
                url: 'answers/upvote/' + this.answer._id,
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(data => {
                this.$emit('upvoteAnswer')
                this.$store.dispatch('getPopulerUser')
            })
            .catch(err => {
                console.log(err)
                miniToastr.warn('you cannot upvote your own answer', '', 2000)
            })
        },
        downvote(id) {
            api({
                method: 'PATCH',
                url: 'answers/downvote/' + this.answer._id,
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(data => {
                this.$emit('downvoteAnswer')
                this.$store.dispatch('getPopulerUser')
            })
            .catch(err => {
                console.log(err)
                miniToastr.warn('you cannot downvote your own answer', '', 2000)
            })
        },
        editAnswer(answer) {
            this.editData = {...answer}
        },
        updateAnswer(id) {
            api({
                method: 'PUT',
                url: 'answers/' + id,
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    content: this.editData.content
                }
            })
            .then(data=> {
                console.log('updated')
                console.log(data)
                this.$emit('updated')
            })
            .catch(err => {
                console.log(err)
                miniToastr.warn('update answer failed', '', 2000)
            })
        }
    }
}
</script>
<style>
    @import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>