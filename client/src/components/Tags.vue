<template>
    <div class="mt-5">
        <h2>Tags</h2>

        <Ul>
            <li v-for="(tag, index) in tags" :key="index"> {{tag}}</li>
        </Ul>

    </div>
</template>

<script>
export default {
    name: 'Tags',
    computed: {
        tags(){
            return this.$store.state.tags
        }
    }
}
</script>
