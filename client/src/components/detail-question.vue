<template>
  <pertanyaancard :tanya="tanya"/>
</template>
<script>
import request from '@/axios.js'
import pertanyaancard from '@/components/card-pertanyaan.vue'
export default {
  components : {
    pertanyaancard
  },
  data(){
    return {
      id : '',
      tanya : {
        user : {
          avatar : '',
          name : ''
        },
        upvote : [],
        downvote : []
      }
    }
  },
  methods : {
    readOne(id){
      request.get(`pertanyaan/${this.id}`,{
        headers : {
          jtoken :localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        this.tanya = data
      })
      .catch( ({ response }) => {
        console.log(response.data)
      })
    }
  },
  name : 'detail-pertanyaan',
  created(){
    this.id = this.$route.params.id
    this.readOne()
  },
  watch : {
    $route(){
      this.id = this.$route.params.id
      this.readOne()
    }
  }
}
</script>
