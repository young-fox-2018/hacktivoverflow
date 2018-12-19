<template>
    <div>
        <div v-if="success" class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success!</strong> post answer.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <form @submit.prevent="jawab" class="card card-form p-2 border bg-dark">
            <div class="form-group">
                <label class="font-weight-bold text-success">Jawaban :</label>
                <textarea class="form-control" :class="{'is-invalid': error}" v-model="jawaban"></textarea>
                <div class="invalid-feedback">
                    answer must be filled!
                </div>
            </div>
            <div class="d-flex justify-content-end">
                <button type="submit" class="btn btn-primary mr-2">Submit</button>
                <button type="reset" @click="clear" class="btn btn-info">Clear</button>
            </div>
        </form>
    </div>
</template>
<script>
import request from '@/axios.js'
import { mapActions} from 'vuex'
export default {
    props : ['idpertanyaan'],
    methods: {
        clear(){
            this.error = false
            this.jawaban = ''
            this.success = false
        },
         ...mapActions(['addJawaban','initializePertanyaan']),
      jawab(){
          this.addJawaban({
              isi : this.jawaban,
              pertanyaan : this.idpertanyaan
          })
          .then( ( response ) =>{
              this.clear()
              this.success = true
              this.initializePertanyaan('dipanggil dari form!')
          })
          .catch( error => {
              this.error = true
          })
      }
    },
    data(){
        return {
            error : false,
            jawaban : '',
            success : false
        }
    }
}
</script>
