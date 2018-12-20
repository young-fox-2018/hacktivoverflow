<template>
    <div class="container">
        <cardjawaban v-for="(jawab, index) in jawaban" :key="index" :jawab="jawab"/>
    </div>
</template>
<script>
import { mapActions} from 'vuex'
import cardjawaban from '@/components/card-jawaban.vue'
export default {
    props : ['jawaban'],
    components : {
        cardjawaban
    },
    methods : {
        ...mapActions(['deleteJawaban'])
    }
}
</script>
