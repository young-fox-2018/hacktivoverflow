<template>
  <div class="sticky-top">
    <h3 class="mt-5">Top Rated Users</h3>
   <ul class="list-group">
  <li @click="onClicked(user)" style="cursor:pointer" v-for="user in topUsers" :key="user._id" class="list-group-item d-flex justify-content-between">
      <img :src="user.avatar" class="img-fluid" style="max-height:20px" alt="">
      <p>{{user.name}}</p>
      <i style="color:gold" class="fa fa-star" aria-hidden="true"><span style="color:black">{{user.reputation}}</span></i>
  </li>
  
  
</ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'top-rated-users',
    mounted(){
        this.$store.dispatch('topUsers')
    },
    methods: {
        onClicked(input){
            this.$store.dispatch('searchQuestion', `/questions?userId=${input._id}`)
        }
    },
    computed: {
        ...mapState(['topUsers'])
    }
};
</script>

<style>
</style>
