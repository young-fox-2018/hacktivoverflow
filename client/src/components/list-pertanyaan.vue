<template>
    <div>
        <div class="contianer">
            <div class="accordion">
               <cardpertanyaan v-for="(tanya, index) in pertanyaan" :key="index" :tanya="tanya"/>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapState } from 'vuex'
import profilepenanya from '@/components/profile-penanya.vue'
import bestanswer from '@/components/best-answer.vue'
import cardpertanyaan from '@/components/card-pertanyaan.vue'
export default {
    name : 'list_pertanyaan',
    props : ['jtoken','user_id'],
    components : { profilepenanya, bestanswer, cardpertanyaan},
    methods : {
        ...mapActions(['initializePertanyaan'])
    },
    computed : {
     ...mapState(['pertanyaan'])
    },
    created() {
        this.initializePertanyaan()
    }
}
</script>
