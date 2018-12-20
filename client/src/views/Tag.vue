<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-lg-4">
                <div class="d-flex flex-column">
                    <div>
                        <h3 class="font-weight-bold">Tags :</h3>
                        <ul class="list-group mb-4">
                            <li v-for="(tag, index) in tags" :key="index" class="list-group-item">
                                <router-link to="/tags">    
                                    <button @click="changeCurrentTag(tag)" class="btn btn-block btn-success">
                                    <span class="font-weight-bold text-dark">{{ tag }}</span> 
                                    </button>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-lg-8">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import { mapState } from 'vuex'
export default {
    data(){
        return {
        }
    },
    methods : {
        ...mapActions(['initializeTags','changeCurrentTag'])
    },
    computed : {
        ...mapState(['tags','tag'])
    },
    created(){
        this.initializeTags()
    }
}
</script>
