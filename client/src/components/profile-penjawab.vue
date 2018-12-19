<template>
     <div class="container">
            <div class="bg-light">
              <div class="d-flex justify-content-between">
                <div class="col-3 my-auto text-center">
                  <div>
                    <img class="border border-success" src="@/assets/up.png" alt="gagal load image up" style="width:50px">
                  </div>
                  <div>
                    <h3>{{ jumlahVote }}</h3>
                  </div>
                  <div>
                    <img src="@/assets/down.png" alt="gagal load image down" style="width: 50px">
                  </div>
                </div>
                <div class="col-6">
                  <div class="row">
                    <div class="col-3 my-auto">
                      <img class="rounded-circle" src="https://cdn3.iconfinder.com/data/icons/business-and-finance-icons/512/Business_Man-512.png" alt="image profile gagal load" style="width: 100px">
                    </div>
                    <div class="col-9 my-auto">
                      <h3 class="font-weight-bold "> {{ jawab.user.name }} </h3>
                    </div>
                  </div>
                </div> 
                <div class="col-3 my-auto">
                  <!-- modal delete-->
                  <button v-if="jtoken && jawab.user._id === user_id" class="close" @click="delete_answer(jawab._id)">
                      <span aria-hidden="true">&times;</span>
                  </button>
                  
                    <!-- modal update -->
                  <button  class="close mr-2" data-toggle="modal" data-target="#updateAnswered">
                      <span aria-hidden="true" class="fa fa-edit fa-sm"></span>
                  </button>

                  <div class="modal fade" id="updateAnswered" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header bg-dark">
                            <h5 class="modal-title text-white font-weight-bold"> Update Answer ?</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span class="text-white" aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            ...
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                          </div>
                        </div>
                      </div>
                  </div>

                </div>
              </div>
            </div>
            <!-- isi jawaban -->
            <div class="bg-dark text-white">
              <h4 class="font-weight-bold">Answer :</h4>
              <p>{{ jawab.isi }}</p>
            </div>
        </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props :['jawab', 'jtoken','user_id'],
  methods : {
    ...mapActions(['initializePertanyaan']),
    delete_answer : function(id){
      axios({
        method : 'DELETE',
        url :`http://localhost:3000/jawaban/${this.$route.params.id}/${id}`,
        headers: { jtoken : this.jtoken}
      })
      .then( ({ data }) => {
        this.initializePertanyaan()
        this.$emit('deleteAnswer', this.$route.params.id)
      })
      .catch( ({ response }) =>{
        console.log( response.data )
      })
    },
  },
  computed : {
     jumlahVote : function(){
        let vote = this.jawab.upvote.length - this.jawab.downvote.length
        if( vote <0) {
          return 0
        }
        return  vote
      }
  }
    
}
</script>

