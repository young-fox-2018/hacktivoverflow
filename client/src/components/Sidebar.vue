<template>
    <div class="col-md-4">
        <div class="container">
            <filter-tag v-if="$route.path!='/mypost'" />
            <top-user-bar />
            <div class="row ml-2 mt-2">
                <h3 class="text-center">Hot Questions</h3>
            </div>
            <hr class="mt-2">
            <div class=" bg-white mt-2 ml-2" :key="question._id" v-for="question in questionList">
                <router-link :to="'/' + question.slug">
                    <a >{{question.title}} </a>
                </router-link>
                <p class="text-muted ">asked by : {{question.owner.name}} </p>
            </div>
            
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import TopUserBar from '@/components/TopUserBar'
import FilterTag from '@/components/FilterTag'

export default {
    computed : mapState({
        questionList : state => state.questionList
    }),
    components: {
        TopUserBar,
        FilterTag
    }
}
</script>
