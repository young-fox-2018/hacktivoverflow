<template>
	<div class="row ml-2 mb-3">
        <div class="col-12 text-center border rounded bg-primary py-1 text-white mb-2">
            <strong>Filter By Tag</strong>
        </div>
        <select class="form-control" v-model="tag">
            <option v-for="(tag, index) in tags" :key="index" :value="tag">{{tag}}</option>
        </select>
        <button @click="filterTag" class="col-12 btn text-center  btn-outline-primary py-1  mb-3 mt-2">
            Search
        </button>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'FilterTag',
    data() {
        return {
            tag: ''
        } 
    },
    methods: {
        filterTag() {
            this.$store.dispatch('getFilteredPost', this.tag)
        }
    },
    computed: mapState({
       tags: state => state.tags 
    }),
    created() {
        this.$store.dispatch('getAllTags')
            .then(() => {
                this.tag = this.tags[0]
            })
    }
}
</script>

<style>

</style>
