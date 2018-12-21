<template>
<v-container>
    <v-layout row>
        <v-flex xs4 lg2>
        <v-container>
        <v-layout justify-center>
          <v-btn
            color="pink"
            dark
            @click.stop="drawer = !drawer"
            style="margin-bottom:80px; margin-right:300px;"
          >
            DASHBOARD
          </v-btn>
        </v-layout>
      </v-container>
  
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="mini"
        absolute
        dark
        temporary
      >
        <v-list class="pa-1">
          <v-list-tile v-if="mini" @click.stop="mini = !mini">
            <v-list-tile-action>
              <v-icon>chevron_right</v-icon>
            </v-list-tile-action>
          </v-list-tile>
  
          <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <img :src="avatar">
            </v-list-tile-avatar>
  
            <v-list-tile-content>
              <v-list-tile-title>{{username}}</v-list-tile-title>
            </v-list-tile-content>
  
            <v-list-tile-action>
              <v-btn icon @click.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
  
        <v-list class="pt-0" dense>
          <v-divider light></v-divider>
  
          <v-list-tile
            v-for="item in items"
            :key="item.title"
            :to="item.path"
            
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
  
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
        </v-flex>
    <v-flex xs8 lg12>
      <h1>List Questions</h1>
      <v-card dark v-for="(question, index) in questions" :key="index" style="margin-top:10px;">
        <v-card-title primary-title>
          <div>
            <hr>
            <div class="headline"><h5>Question <br>
              {{question.content}}</h5></div>
            <hr>
            <br>
             <p style="text-align: right">Created At: {{getDate(question.createdAt)}}</p>
             <p style="text-align: left"> Last Edited: {{getDate(question.updatedAt)}}</p>
             <p style="text-align: left">By: {{question.userId.name}}</p>
          </div>
        </v-card-title>

        <v-card-actions>
    <div class="text-xs-right">
        &nbsp;&nbsp;&nbsp;
    <v-badge color="green" left>
      <v-icon slot="badge" dark small @click="upVoteQuestion(question._id)">thumb_up</v-icon>
      <span>Upvote</span>
      <span slot="badge">{{question.upVote.length}}</span>
    </v-badge>

    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

    <v-badge color="red" right>
      <v-icon slot="badge" dark small @click="downVoteQuestion(question._id)">thumb_down</v-icon>
      <span>Downvote</span>
        <span slot="badge">{{question.downVote.length}}</span>
    </v-badge>
  </div>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show; findOneQuestion(question._id)">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-slide-y-transition dark>
          <v-card-text class="text-lg-left" v-show="show && questionId===question._id" scrollable max-width="300px">
            <h3>Answers: </h3>
             <ul class="collection" v-for="(answer, index) in answers" :key="index">
                <li class="collection-item avatar">
                    <img :src="answer.userId.avatar" alt="" class="circle" style="color:black">
                    <p style="text-align: left;color:black;">{{answer.userId.name}}<br>
                    {{answer.content}}
                    </p>
                    <br style="color:black;">
                        <p style="text-align: left;" class="black--text">Created At: {{getDate(answer.createdAt)}}</p>
                        <p style="text-align: left; margin-top:10px;" class="black--text"> Last Edited: {{getDate(answer.updatedAt)}}</p>
                     <div class="text-xs-right">
                         
                    <v-badge color="green" left>
                    <v-icon slot="badge" dark small @click="upVoteAnswer(answer._id)">thumb_up</v-icon>
                    <span>Upvote</span>
                    <span slot="badge" style="color:black;">{{answer.upVote.length}}</span>
                    </v-badge>

                    <v-badge color="red" right>
                    <v-icon slot="badge" dark small @click="downVoteAnswer(answer._id)">thumb_down</v-icon>
                    <span>Downvote</span>
                        <span slot="badge" style="color:black;">{{answer.downVote.length}}</span>
                    </v-badge>
                        <router-link :to="'editanswer/'+answer._id">
                        <v-btn
                        v-if="userId===answer.userId._id"
                        color="pink"
                        style="margin-right:37px;"
                        dark
                        small
                        absolute
                        center
                        right
                        fab
                        >
                        <v-icon>edit</v-icon>
                        </v-btn>
                        </router-link>
            
                    </div>
                </li>
            </ul>
             <v-container fluid grid-list-md>
                <v-textarea
                name="input-7-1"
                box
                label="Your Answer"
                auto-grow
                v-model="content"
                ></v-textarea>
             <v-btn @click="postAnswer(question._id)">POST ANSWER</v-btn>
            </v-container>
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'
import moment from 'moment'
const IP = `http://35.240.198.92`
const localhost = `http://localhost:3000`
export default {
    data () {
        return {
            show: false,
            questionId: '',
            drawer: null,
            items: [
                { title: 'Post New Question', icon: 'dashboard', path: 'newquestion' },
                { title: 'My Question Lists', icon: 'question_answer', path: 'myquestion' }
            ],
            mini: false,
            right: null,
            content: '',
            updateAnswer: '',
            username: localStorage.getItem('name'),
            avatar: localStorage.getItem('avatar'),
            userId: localStorage.getItem('userId')
        }
    },
    created () {
        this.getQuestion()
    },
    mounted () {
        this.getAnswer(this.questionId)
        this.getQuestion()
    },
    computed:{
        ...mapState(['answers', 'questions', 'userLogin']),

    },
    methods: {
        getQuestion () {
            this.$store.dispatch('getAllQuestionAction')
        },
        findOneQuestion (id) {
            axios({
                method: `GET`,
                url: `http://hacktivoverflow.vinco.icu/questions/${id}`,
            })
            .then((question) => {
                this.questionId = id
                this.getAnswer(id)
            })
            .catch((err) => {
                console.log(err)
            })
        },
        getAnswer (id) {
            this.$store.dispatch('getAllAnswerAction', id)
        },
        postAnswer (id) {
            axios({
                method: `POST`,
                url: `http://hacktivoverflow.vinco.icu/answers/${id}`,
                data: {
                    content: this.content
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then((answer) => {
                this.getAnswer(id)
                this.content = ''
            })
            .catch((err) => {
                console.log(err)
            })
        },
        upVoteQuestion (id) {
          axios({
            method: `POST`,
            url: `http://hacktivoverflow.vinco.icu/questions/upvote/${id}`,
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then((result) => {
            this.getQuestion()
          })
          .catch((err) => {
            console.log(err.data)
          })
        },
        downVoteQuestion (id) {
          axios({
            method: `POST`,
            url: `http://hacktivoverflow.vinco.icu/questions/downvote/${id}`,
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then((result) => {
            console.log(result)
            this.getQuestion()
          })
          .catch((err) => {
            console.log(err)
          })
        },
        upVoteAnswer (id) {
          axios({
            method: `POST`,
            url: `http://hacktivoverflow.vinco.icu/answers/upvote/${id}`,
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then((result) => {
            this.getAnswer(id)
            console.log(result)
          })
          .catch((err) => {
            console.log(err)
          })
        },
         downVoteAnswer (id) {
          axios({
            method: `POST`,
            url: `http://hacktivoverflow.vinco.icu/answers/downvote/${id}`,
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then((result) => {
            this.getAnswer(id)
            console.log(result)
          })
          .catch((err) => {
            console.log(err)
          })
        },
        getDate(date) {
          return moment(date).format('DD-MM-YYYY hh:mm:ss')
        }
    }
}
</script>

<style>

</style>


