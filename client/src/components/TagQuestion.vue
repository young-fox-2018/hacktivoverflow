<template>
    <div>
        <h3 class="py-2">Tag: {{ $route.params.tagName }}</h3>
        <h5 v-if="questions.length === 0">No Questions in this tag category</h5>
        
        <div 
            v-else-if="questions.length > 0"
            class="card" 
            v-for="question in questions" 
            :key="question._id">
            <h5 class="card-header"> {{ question.title }} </h5> 
            <div class="card-body">
                <p class="card-text"> <b>by:</b> {{ question.userID.name }} </p>
                <p class="card-text"> <b>Tag:</b> {{ joinTag(question.tag) }} </p>
                <p class="card-text"> {{ question.detail }} </p>
                <button class="btn btn-primary btn-sm mr-2" @click="upvote(question._id)"> Upvote </button> 
                {{ question.upvote.length }}
                <button class="btn btn-primary btn-sm mx-2" @click="downvote(question._id)"> Downvote </button>
                {{ question.downvote.length }}

                <router-link :to="`/${question._id}/${slug(question.title)}`">
                    <button class="btn btn-info btn-sm ml-3" > Read more </button>
                </router-link>

            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/api/hacktivOverflow-api.js' 
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState(['questions']) 
    },

    methods: {
        joinTag: function(tags) {
            if (tags.length === 0) {
                return '-'
            }
            else {
                return tags.map(tag => tag.name).join(', ')
            }
        },

        slug: function(title) {
            return title.split(' ').join('-')
        },

        upvote: function(questionID) {
            this.$store.dispatch('upvote', {
                questionID, 
                getData: 'getQuestionsByTag',
                tagID: this.$route.params.tagID
            })
        },

        downvote: function(questionID) {
            this.$store.dispatch('downvote', {
                questionID,
                getData: 'getQuestionsByTag',
                tagID: this.$route.params.tagID   
            })
        }

    },
    created() {
        this.$store.dispatch('getQuestionsByTag', this.$route.params.tagID)
    },

    watch: {
        '$route' (to, from) {
            this.$store.dispatch('getQuestionsByTag', this.$route.params.tagID)
        }
    }
}
</script>
