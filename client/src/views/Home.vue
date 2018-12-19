<template>
    <div>
        <h3 style="font-family: 'Lobster', cursive;">Home</h3>
        <hr>
        <Card
            v-for="(data, index) in allQuestion" :key="index"
            :question="data"
        />
        <router-view />
    </div>
</template>

<script>
    import Card from '@/components/Card.vue';
    import { mapState } from 'vuex';
    import { mapActions } from 'vuex';
    
    export default {
        name: 'Home',
        components: {
            Card,
        },
        computed: {
            ...mapState({
                allQuestion: state => state.allQuestion,
                userAktif: state => state.userAktif,
            }),
        },
        created() {
            this.getAllQuestion();
        },
        methods: {
            ...mapActions(['getAllQuestion']),
        },
    };
</script>
