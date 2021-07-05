<template>
    <v-container>
    <v-layout row>
        <v-flex xs8 lg12>
      <v-card dark v-for="(question, index) in myquestion" :key="index" style="margin-top:10px;">
        <v-card-title primary-title>
          <div>
            <div class="headline"><h5>Question?</h5></div>
            <span class="white--text">{{question.title}}</span>
            <span class="white--text">{{question.content}}</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <router-link :to="'/editquestion/'+question._id">
                <v-btn class="secondary-content" style="margin-right:20px;"><i class="material-icons">edit</i>Edit</v-btn>
            </router-link>
            <v-btn class="secondary-content" @click="deleteQuestion(question._id)"><i class="material-icons">delete</i>delete</v-btn>
          <v-spacer></v-spacer>
          <v-btn>
            <v-icon></v-icon>
          </v-btn>
        </v-card-actions>
        <v-slide-y-transition dark>
          <v-card-text class="text-lg-left">
            
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
    </v-container>
</template>

<script>
import {mapState} from 'vuex'
const IP = `http://35.240.198.92`
const localhost = `http://localhost:3000`
export default {
    name: 'myQuestion',
    data() {
        return {
            
        }
    },
    created(){
      this.getMyQuestion()
    },
    computed: {
      ...mapState(['myquestion'])
    },
    methods: {
        getMyQuestion () {
            this.$store.dispatch('getMyAllQuestion', localStorage.getItem('token'))
        },
        deleteQuestion (id) {
          axios({
            method: `DELETE`,
            url: `https://hacktivoverflowapi.vinco.icu/questions/${id}`,
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(() => {
            this.getMyQuestion()
            this.$router.push('/')
          })
          .catch((err) => {
            console.log(err)
          })
        }
    },

}
</script>
<style>

</style>


