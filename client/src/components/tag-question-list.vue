<template>
  <div class="d-flex flex-column">
    <div v-for="(pertanyaan , index) in pertanyaanBerdasarkanTag" :key="index" class="card mb-3">
      <div class="card-header">
        <div class="row">
            <div class="col-lg-2">
                <img :src="pertanyaan.user.avatar" class="img-fluid">
            </div>
            <div class="col-lg-8">
              <h5 class="font-weight-bold">{{ pertanyaan.user.name}}</h5>
            </div>
        </div>
      </div>
      <div class="card-body">
        <h5 class="card-title font-weight-bold">{{ pertanyaan.title }}</h5>
        <p class="card-text">{{pertanyaan.description}}</p>
        <div class="d-flex justify-content-between">
          <router-link :to="'/tags/'+pertanyaan.slug+'/'+pertanyaan._id">
            <button class="btn btn-primary">Detail</button>
          </router-link>
          <div>
            <span v-for="(tag, index) in pertanyaan.tags" :key="index"  class="badge badge-primary m-1">{{ tag.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import request from '@/axios.js'
export default {
  data(){
    return {
      pertanyaanBerdasarkanTag : []
    }
  },
  computed : {
    ...mapState(['tag'])
  },
  watch : {
      tag(){
        request.get(`/pertanyaan/search-tag?tag=${this.tag}`,{
          headers : {
            jtoken : localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          this.pertanyaanBerdasarkanTag = data
        })
        .catch(({ response }) =>{
          console.log(response.data)
        })
      }
  },
  mounted() {
        request.get(`/pertanyaan/search-tag?tag=${this.tag}`,{
          headers : {
            jtoken : localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          this.pertanyaanBerdasarkanTag = data
        })
        .catch(({ response }) =>{
          console.log(response.data)
        })
      
  }
}
</script>
