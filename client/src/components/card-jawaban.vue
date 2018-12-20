<template>
       <div class="row">
                <div class="col-lg-4">
                    <img :src="jawab.user.avatar" class="rounded-circle image-fluid border-dark" style="width:50px;height:50px;"/>
                     <div>
                        <button  @click="upvoteJawaban({ id : jawab._id})" class="btn bg-white">
                            <i class="far fa-heart" :class="{'bg-danger' : isUpvoter}">{{jawab.upvote.length}}</i>
                        </button>
                        <button @click="downvoteJawaban({id : jawab._id})" class="btn bg-white">
                            <i class="fab fa-gripfire" :class="{'bg-danger' : isDownVoter}">{{jawab.downvote.length}}</i>
                        </button>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="row">
                        <div class="col-lg-9">
                            <h5 class="font-weight-bold">{{jawab.user.name}}</h5>
                            <p class="font-italic">{{jawab.isi}}</p>
                        </div>
                        <div class="col-lg-3">
                            <button @click="deleteJawaban({ id : jawab._id})" class="btn bg-white"><span>&times;</span></button>
                            <button type="button" data-toggle="modal" :data-target="'#x'+jawab._id" class="btn bg-white"><i class="fas fa-wrench"></i></button>
                            <!-- Modal -->
                             <div class="modal fade" :id="'x'+jawab._id" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header bg-dark text-white">
                                                <div class="d-flex align-items-center">
                                                    <div class="container">
                                                        <img :src="jawab.user.avatar" class="img-fluid img-thumbnail" style="width:100px; height:100px;">
                                                    </div>
                                                    <div class="modal-title">
                                                        <h5 class="font-weight-bold"> {{ jawab.user.name}}</h5>
                                                    </div>
                                                </div>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="container p-2">
                                                <div v-if="success" class="alert alert-success alert-dismissible fade show" role="alert">
                                                    <strong>Success!</strong> Edit Answer.
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
                                                <form @submit.prevent="updatejawaban" class="card card-form p-3 bg-dark text-success">
                                                    <div class="form-group">
                                                        <label class="font-weight-bold">isi :</label>
                                                        <textarea class="form-control" v-model="isi"></textarea>
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
                    </div>
                </div>
            </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    props : ['jawab'],
    data(){
        return {
            isi : this.jawab ?  this.jawab.isi : '',
            success : false,
            error  : false,
        }
    },
    methods : {
        ...mapActions(['updateJawaban','initializePertanyaan','upvoteJawaban','downvoteJawaban']),
        clear(){
            this.success = false
            this.error = false
            this.isi = ''
        },
        updatejawaban(){
            this.updateJawaban({
                id : this.jawab._id,
                data : {
                    isi : this.isi
                }
            })
            .then( ({ data }) => {
                this.clear()
                this.success = true
                this.initializePertanyaan()
            })
            .catch( ({response}) => {
                console.log( response.data)
                // let message = ``
                // response.data.path.forEach((p, index) => {
                //     message += `${index+1}. ${p} : ${response.data.message[i]}`
                // })
                // this.error = message
            })
        }
    },
    computed : {
         isUpvoter(){        
            let found = this.jawab.upvote.indexOf(localStorage.getItem('user_id'))
            if ( found !== -1 ){
                return true
            }else{
                return false
            }
        },
        isDownVoter(){        
            let found = this.jawab.downvote.indexOf(localStorage.getItem('user_id'))
            if ( found !== -1 ){
                return true
            }else{
                return false
            }
        }
    }
}
</script>
