<template>
    <div class="card mt-5">
        <h2 class="card-title tag-title">Tags</h2>
        <div 
          class="card tag-card"
          v-for="(tag, index) in tags" 
          :key="index"
          @click="toFilteredQuestions(tag)">
            <p class="card-title">{{tag}}</p>  
        </div>
        <!-- <Ul>
            <li v-for="(tag, index) in tags" :key="index"> {{tag}}</li>
        </Ul> -->

    </div>
</template>

<script>
export default {
    name: 'Tags',
    computed: {
        tags(){
            return this.$store.state.tags
        }
    },
    methods: {
        toFilteredQuestions(tag) {
            this.$router.push('/?tag='+ tag )
        }
    }
}
</script>

<style>
.tag-title{
    background-color: orange;
    color: white
}
.tag-card:hover{
  background-color: orange;
  color: white;  
}
</style>
