<template>
    <div class="sidenav">
        <div>
            <h3 style="font-size:24px"> Search by Tag </h3>
            <div class="row" style="justify-content: space-evenly">
                <button v-for="(tag, index) in tagsList" :key="index" class="col-5 tags" @click="filterbyTag(tag)">
                    {{tag}}
                </button>
            </div>
        </div>
        <button class="clearTag" @click="getQuestion"> Clear Tags </button>
        <hr>
        <div v-if="loading">
            <img src="../../assets/loading_small.gif" alt="loading" style="width:100%">
        </div>
        <ul id="left" v-else>
            <li><router-link to="/questions">Questions</router-link></li>
            <ul>
                <li v-for="(list, index) in questionList" :key="index" @click="sendQuestiontoParent(list)">
                    <router-link :to="`/questions/${list.slug}`" style="font-size:12px">{{list.title}}</router-link>
                </li>
            </ul>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
import {mapState} from 'vuex'

export default {
    name: 'SideBar',
    data() {
        return {
            
        }
    },
    methods: {
        sendQuestiontoParent: function (question) {
            this.$store.dispatch("resetError")
            this.$emit('sendQuestionId', question)
        },
        getQuestion () {
            this.$store.dispatch('storeQuestions_Action')
        },
        filterbyTag(tag) {
            this.$store.dispatch('filterQuestions', tag)
        }
    },
    computed: mapState ({
        questionList: state => state.questionList,
        tagsList: state => state.tagsList,
        loading: state => state.loading

    }),
    watch: {
        questionList: function() {
            this.$store.dispatch('getAllTags')
        }
    }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sidenav {
    padding-top: 10px;
    height: 100%;
    width: 180px;
    position: absolute;
    top: 120px;
    left: 0;
    transition: 0.5s;
    border-right: 2px solid lightgray;  
    margin: 0px
}
ul#left {
    list-style: none;
    padding-left: 10px;
    text-align: left;
    color: #2c3e50;
}
.sidenav li{
    margin-bottom: 10px;
}
a {
  font-weight: bold;
  color: black;
  font-size: 18px;
}
.tags {
    background-color: #6610f2;
    color: white;
    margin-right: 10px;
    margin-bottom: 5px;
    height: 25px;
    font-size: 12px
}
.tags:focus {
    background-color: lightblue;
    color: black
}
.clearTag {
    width: 100%;
    background-color: #6610f2;
    color: white;
}
.clearTag:active {
    width: 100%;
    background-color: lightblue;
    color: black
}

</style>
