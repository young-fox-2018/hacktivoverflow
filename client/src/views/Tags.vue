<template>
    <div>
        <h3 style="font-family: 'Lobster', cursive;">Tags</h3>
        <hr>
        <span class="badge badge-warning p-2 mr-1 mb-1" v-for="(data, index) in tags" :key="index">
            <router-link :to="'/tags/'+data" style="color: black;">{{ data }}</router-link>
        </span>
        <br><br>
        <router-view></router-view>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import Card from '@/components/Card.vue';
    
    export default {
        name: 'Tag',
        created() {
            this.getAllTag();
        },
        computed: {
            ...mapState({
                tags: state => state.allTag,
            }),
        },
        methods: {
            ...mapActions(['getAllTag']),
        },
    };
</script>
