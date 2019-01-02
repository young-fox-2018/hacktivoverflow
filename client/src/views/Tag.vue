<template>
    <div id="tag">
        <div class="row mb-3 mt-2">
            <div class="col-md-3">
                <h2>Tags</h2>
            </div>
            <div class="col-md-3 offset-6">
                <input type="text" class="form-control" placeholder="filter by tag name">
            </div>
        </div>
        <div class="row">
            <loading-spinner v-show="isLoading"></loading-spinner>
            <div class="col-md-3 mb-2" 
             v-for="(tag, index) in tags" :key="index" v-if="!isLoading">
                <b-card :title="tag.name">
                    <router-link :to="{path: ''}" class="card-link">see questions</router-link>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../assets/api-server.js'
import LoadingSpinner from '@/components/Loading.vue'

export default {
    name: 'tag',
    components: {
        LoadingSpinner
    },
    data(){
        return {
            tags: [],
            isLoading: true
        }
    },
    methods: {
        getTags(){
            api.get('/tags')
                .then(({data})=> {
                    this.tags = data
                    this.isLoading = false
                })
                .catch(err=> {
                    console.log(err.response)
                })
        }
    }, 
    created(){
        this.getTags()
    }
}
</script>

<style scoped>

</style>

