<template>
    <div>
        <Card
            v-for="(data, index) in questions" :key="index"
            :question="data"
        />
    </div>
</template>

<script>
    import Card from '@/components/Card.vue';
    import apiHacktiv from '@/config/api-hacktivoverflow.js';
    
    export default {
        name: 'TagSearch',
        data() {
            return {
                questions: [],
            };
        },
        components: {
            Card,
        },
        watch: {
            $route: function() {
                this.getSearch();
            },
        },
        methods: {
            getSearch() {
                apiHacktiv.get(`/questions/search-tag/${this.$route.params.text}`)
                    .then(result => {
                        this.questions = result.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
        },
        created() {
            this.getSearch();
        },
    };
</script>
