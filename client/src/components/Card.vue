<template>
    <div id="card">
        <div class="row">
            <div class="col-md-3">
                <div class="votes">
                    <div>
                        {{question.upVoters.length - question.downVoters.length}}
                    </div>
                    <div>
                        <small>votes</small>
                    </div>
                </div>
                <div class="votes">
                    <div>
                        {{question.answers.length}}
                    </div>
                    <div>
                        <small>answers</small>
                    </div>
                </div>
            </div>
            <div class="col-md-9">
                <div class="question-summary">
                    <div>
                        <router-link :to="{name: 'single', params: {slug: question.slug, id: question._id}}">{{question.title}}</router-link>
                    </div>
                    <div style="display: inline">
                        <button class="btn btn-default btn-sm mr-1" v-for="(tag, index) in question.tags" :key="index">{{tag}}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
    data(){
        return {

        }
    },
    computed: {
        
    },
    created(){

    }, 
    methods: {
        
    },
    props: {
        question: Object
    }
}
</script>

<style>
.votes{
    display: inline-block;
    height: 38px;
    min-width: 38px;
    margin: 0 3px 0 0;
    font-size: 13px;
    color: #848d95;
    padding: 7px 6px;
    text-align: center;
}

.question-summary {
    text-align: left;
}

</style>


