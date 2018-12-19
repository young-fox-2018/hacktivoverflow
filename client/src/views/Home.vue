<template>
  <div>
    <b-container class="mt-4">
      <b-row>
        <!-- left side bar -->
        <b-col cols="3">
          <!-- user profile -->
          <b-card v-if='isLogin' class="mb-3" style="text-align: center;">
            <b-img style="max-height: 80px" class="mb-2" src="https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/user.png" fluid></b-img>
            <div><strong>Hi, {{userProfile.name}}</strong></div>
            <small class="text-muted">{{userProfile.email}}</small>
          </b-card>
          
          <b-card title="Recent Post">
            <hr>
            <ul style="text-align: left;">
              <li v-for="(question, index) in recentPost" :key="index">
                <router-link :to="`/question/${question._id}`">
                  {{question.title}}
                </router-link>
              </li>
            </ul>
          </b-card>
        </b-col>

        <!-- center column -->
        <b-col cols="6">

          <router-view/>

        </b-col>

        <!-- right side bar -->
        <b-col cols="3">
          <b-card title="Live Chat">
            <hr>
            <div class="messages">
                  <div class="message" v-for="(message, index) in liveChat.messages" :key="index">
                    <b-row>
                      <b-col cols="4">
                        <strong>{{message.username}}</strong>
                      </b-col>
                      <b-col cols="8" style="text-align: right;">
                        <p>{{message.text}}</p>
                      </b-col>
                    </b-row>
                    <div style="text-align: right;">

                    <small class="text-muted">{{ message.createdAt }}</small>
                    </div>
                    <hr>
                  </div>
              </div>
              <div v-if="!liveChat.username">
                  <p style="text-align: left;"><strong>Please enter your name</strong></p>
                  <input class="form-control" type="text" placeholder="Your name" v-on:keyup.enter="updateUsername">
                  <p class="text-muted mt-3" style="text-align: left;">Press enter to submit</p>
              </div>
              <div v-else>
                <p style="text-align: left;">
                  From: <strong>{{ liveChat.username }}</strong>
                </p>
                  <textarea class="form-control" cols="30" rows="3" placeholder="New Message" @keyup.enter="sendMessage"></textarea>
                  <p class="text-muted mt-3" style="text-align: left;">Press enter to send</p>
              </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex"
import fire from '@/assets/firebase.js'
import moment from 'moment'

export default {
  name: "home",
  
  data() {
    return {
      liveChat: {
        username: '',
        messages: []
      }
    }
  },

  methods: {
    updateUsername(e) {
      e.preventDefault();
      if(e.target.value){
          this.liveChat.username = e.target.value;
      }
    },
    sendMessage(e) {
      e.preventDefault();
      if(e.target.value){
          const message = {
              username: this.liveChat.username,
              text: e.target.value,
              createdAt: moment(new Date()).format('DD MMMM YYYY hh:mm')
          }
          fire.database().ref('messages').push(message)
          // To-Do: Push message to firebase
          e.target.value = ''
      }
    }
  },
  computed: {
    ...mapState(['userProfile', 'isLogin', 'allQuestions', 'recentPost']),
  },

  mounted () {
      let vm = this
      const itemsRef = fire.database().ref('messages')
      itemsRef.on('value', (snapshot) => {
          let data = snapshot.val()
          let messages = []
          Object.keys(data).forEach((key) => {
              messages.push({
                  id: key,
                  username: data[key].username,
                  text: data[key].text,
                  createdAt: data[key].createdAt
              })
          })
          vm.liveChat.messages = messages
      })
  },

  created() {
    this.$store.dispatch('actionUserProfile', localStorage.getItem('token'))
  }
}
</script>
