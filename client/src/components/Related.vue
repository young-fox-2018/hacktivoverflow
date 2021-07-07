<template>
    <div class="related">
        <b-card :title="title"
            sub-title="Card subtitle">
            
        </b-card>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    props: {
        title: {
            type: String,
            default: 'related questions'
        },
        items: [{
            
        }]
    }
}

</script>

<style>

</style>



