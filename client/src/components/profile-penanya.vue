<template>
    <div class="bg-light mt-2">
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
                <h3 class="font-weight-bold "> {{ tanya.user.name }}</h3>
                <router-link :to="'/'+tanya._id">
                  <h5 class="font-weight-bold"> {{ tanya.title }}</h5> 
                </router-link> 
              </div>
            </div>
          </div> 
          <div class="col-3 my-auto">

            <button v-if="jtoken && tanya.user._id === user_id" class="close" @click="delete_question(tanya._id)">
                <span aria-hidden="true">&times;</span>
            </button>

        </div>
       </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import { format } from 'url';
export default {
    props : ['tanya', 'jtoken', 'user_id','index'],
    data(){
      return{
      
      }
    },
    methods : {
      ...mapActions(['initializePertanyaan']),
      delete_question : function(id){
       
        axios({
          method : 'DELETE',
          url : `http://localhost:3000/pertanyaan/${id}`,
          headers : { jtoken : this.jtoken}
        })
        .then( ({ data}) => {
          this.initializePertanyaan()
        })
        .catch( (error) => {

          console.log( error )
        })
      }
    },
    computed : {
      jumlahVote : function(){
        let vote = this.tanya.upvote.length - this.tanya.downvote.length
        if( vote < 0 ){
            return 0
        }

        return vote
      }
    }
}
</script>
