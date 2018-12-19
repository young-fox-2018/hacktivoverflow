<template>
    <div>
        
        <router-link to="newQuestion"> 
            <button 
            class="btn btn-sm btn-info my-3" 
            v-if="isLoggedIn"
            >Create New Question
            </button>
        </router-link>
        
        <div 
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

                <router-link :to="`${question._id}/${slug(question.title)}`">
                    <button class="btn btn-info btn-sm ml-3" > Read more </button>
                </router-link>

            </div>
        </div>



    </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from '@/api/hacktivOverflow-api.js'

export default {
    computed: {
        ...mapState(['isLoggedIn', 'questions', 'email']) 
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
                getData: 'getQuestions',
                tagID: null
            })
        },

        downvote: function(questionID) {
            this.$store.dispatch('downvote', {
                questionID,
                getData: 'getQuestions',
                tagID: null   
            })
        }
    },

    created() {
        this.$store.dispatch('getQuestions')
    }

}
</script>
