<template>
    <div class="row">
        <div class="col-lg-3">
            <img :src="tanya.user.avatar" class="img-thumbnail">
            <div>
                <button  @click="upvotePertanyaan({ id : tanya._id})" class="btn bg-white">
                    <i class="far fa-heart" :class="{'bg-danger' : isUpvoter}">{{tanya.upvote.length}}</i>
                </button>
                <button @click="downvotePertanyaan({id : tanya._id})" class="btn bg-white">
                    <i class="fab fa-gripfire" :class="{'bg-danger' : isDownVoter}">{{tanya.downvote.length}}</i>
                </button>
            </div>
        </div>
        <div class="col-lg-6">
            <button class="btn btn-link text-success" type="button" data-toggle="collapse" :data-target="'#k'+tanya._id">
                <h3 class="font-weight-bold">{{tanya.user.name}}</h3>
                <p class="font-italic">
                    {{tanya.description}}
                </p>
            </button>
        </div>
        <div class="col-lg-3">
            <!-- button updown -->
            <div  v-if="!isQuestioner" class="d-flex justify-content-center">
                <div class="p-2">
                    <button class="btn btn-success">
                        <i class="fas fa-thumbs-up"></i>
                    </button>
                    <br>
                    <span class="badge badge-outline-success">{{tanya.upvote.length}}</span>
                </div>
                <div class="p-2">
                    <button class="btn btn-success">
                        <i class="fas fa-hand-point-down"></i>
                    </button>
                    <br>
                    <span class="badge badge-success">{{tanya.downvote.length}}</span>
                </div>
            </div>
            <!--Option-->
            <div v-if="isQuestioner" class="container text-center">
                <button type="button" data-toggle="modal" :data-target="'#k'+tanya._id" class="btn btn-dark mr-2"><i class="fas fa-wrench"></i></button>
                <button @click="deletePertanyaan({id : tanya._id})" class="btn btn-dark"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="d-flex justify-content-around mt-1">
                <span v-for="(tag, index) in tanya.tags" :key="index" class="bg-primary text-white rounded p-1">{{ tag.text }}</span>
            </div>
        </div>
        <div class="modal fade" :id="'k'+tanya._id" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-dark text-white">
                            <div class="d-flex align-items-center">
                                <div class="container">
                                    <img :src="tanya.user.avatar" class="img-fluid img-thumbnail" style="width:100px; height:100px;">
                                </div>
                                <div class="modal-title">
                                    <h5 class="font-weight-bold"> {{ tanya.title}}</h5>
                                </div>
                            </div>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container p-2">
                            <div v-if="success" class="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>Success!</strong> Edit Question.
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div v-if="error" class="alert alert-success alert-dismissible fade show" role="alert">
                                {{ error}}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form @submit.prevent="editPertanyaan" class="card card-form p-3 bg-dark text-success">
                                <div class="form-group">
                                    <label class="font-weight-bold">Title :</label>
                                    <input type="text" class="form-control" v-model="title"/>
                                </div>
                                <div class="form-group">
                                    <label class="font-weight-bold">Description :</label>
                                    <input type="text" class="form-control" v-model="description"/>
                                </div>
                                <div class="d-flex justify-content-end">
                                    <button type="button" class="btn btn-info mr-2" data-dismiss="modal">Close</button>
                                    <button class="btn btn-primary">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    props : ['tanya'],
    data(){
        return {
            error : false,
            success :false,
            title : this.tanya ? this.tanya.title : '',
            description : this.tanya ? this.tanya.description : ''
        }
    },
    methods : {
        ...mapActions(['updatePertanyaan','initializePertanyaan','deletePertanyaan','upvotePertanyaan','downvotePertanyaan']),
        clear(){
            this.error = false
            this.success = false
        },
        editPertanyaan(){
            this.updatePertanyaan({
                id : this.tanya._id,
                data : {
                    title : this.title,
                    description : this.description
                }
            })
            .then( ({ data }) => {
                this.clear()
                this.success = true
                this.initializePertanyaan()
            })
            .catch( ({ response }) => {
                let message = ``
                response.data.path.forEach((p, index) => {
                    message += `${index+1}. ${p} : ${response.data.message[i]}`
                })
                this.error = message
            })
        },
    },
    computed : {
        isQuestioner(){
            return localStorage.getItem('user_id') === this.tanya.user._id
        },
        isUpvoter(){        
            let found = this.tanya.upvote.indexOf(localStorage.getItem('user_id'))
            if ( found !== -1 ){
                return true
            }else{
                return false
            }
        },
        isDownVoter(){        
            let found = this.tanya.downvote.indexOf(localStorage.getItem('user_id'))
            if ( found !== -1 ){
                return true
            }else{
                return false
            }
        }
    }
}
</script>
