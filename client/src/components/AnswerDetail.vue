<template>
  <div class="row rounded my-2">
    <div class="col" v-if="showPage">
      <FailAlert :message="errorMessage"  @alertdone="alertDone" class="mx-2"/>
      <div class="row  mx-2 border-bottom">
        <div class="col-1 ">

          <div class="row d-flex justify-content-center">
            <a href="#" v-if="voteStatus == 'up'" class="noGreen" @click.prevent="upVote(answer._id)"><i class="fa fa-angle-up fa-3x" aria-hidden="true"></i></a>
            <a href="#" v-else-if="voteStatus != 'up'" class="noHover" @click.prevent="upVote(answer._id)"><i class="fa fa-angle-up fa-3x" aria-hidden="true"></i></a>
          </div>

          <div class="row d-flex justify-content-center">
            <span class="voted-value">{{answer.voted}}</span>
          </div>

          <div class="row d-flex justify-content-center">
          <a href="#" v-if="voteStatus == 'down'" class="noGreen" @click.prevent="downVote(answer._id)"><i class="fa fa-angle-down fa-3x" aria-hidden="true"></i></a>            
          <a href="#" v-else-if="voteStatus != 'down'" class="noHover" @click.prevent="downVote(answer._id)"><i class="fa fa-angle-down fa-3x" aria-hidden="true"></i></a>            
          </div>
        </div>
        <div class="col-10">
          <div class="row">
            <span v-html="answer.text"></span>
          </div>
          <div class="row d-flex justify-content-end">
            
              <small>anwered: {{answer.userId.name}}</small>
              <b-button @click.prevent="answerUpdate(answer._id)" v-if="isLogin == answer.userId._id" variant="primary" class="mx-2 my-2 btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i></b-button>
          </div>
          <div class="row d-flex justify-content-end">
            <small>{{answer.createdDate | myDate}}</small>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="col">
      <b-form @submit.prevent="updateAnswerProc">
        <wysiwyg v-model="text" />
        <b-button type="submit" class="text-right my-2" variant="primary">submit</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import FailAlert from '@/components/FailAlert.vue'
import { mapState } from 'vuex';
import myApi from '@/api/myApi'
import moment from 'moment'

export default {
  name: 'answerdetail',
  components: {
    FailAlert
  },
  props: ['answer'],
  data() {
    return {
      voteStatus: '',
      errorMessage: '',
      showPage: true
    }
  },
  methods: {
    alertDone() {
      this.errorMessage = ''
    },
    upVote(id) {
      
      // console.log(id, 'upvote answer')
      myApi({
        method: 'get',
        url: '/answer/' + id + '/upvote',
        headers: {
          auth: localStorage.token
        }
      })
        .then(({data}) => {
          console.log(data)
          // this.readData()
          this.$emit('modifieddata')
        }).catch((err) => {
          this.errorMessage = err.response.data.message
          console.log(err.response.data.message)
        });
    },
    downVote(id) {
      myApi({
        method: 'get',
        url: '/answer/' + id + '/downvote',
        headers: {
          auth: localStorage.token
        }
      })
        .then(({data}) => {
          console.log(data)
          // this.readData()
          this.$emit('modifieddata')
        }).catch((err) => {
          this.errorMessage = err.response.data.message
          console.log(err.response.data.message)
        });
    },
    checkVote() {
      // console.log(this.question.downVote[0] == this.isLogin)
      let down = this.answer.downVote
      let up = this.answer.upVote
      if (down.indexOf(this.isLogin) != -1) {
        // console.log('gua isi down')
        this.voteStatus = 'down'
        this.$store.dispatch('readAllQuestion')
      } else if (up.indexOf(this.isLogin) != -1) {
        // console.log('gua isi up')
        this.voteStatus = 'up'
        this.$store.dispatch('readAllQuestion')
      } else {
        this.voteStatus = ''
      }
    },
    answerUpdate(id) {
      myApi({
        method: 'get',
        url: '/answer/' + id,
      })
        .then(({data}) => {
          // console.log(data)
          this.showPage = false
          this.text = data.text
        }).catch((err) => {
          // console.log(err)
          this.errorMessage = err.response.data.message
          console.log(err.response.data.message)
        });
      // this.showPage = false
      // console.log(id, 'sinii laaah')
    },
    updateAnswerProc() {
      let id = this.answer._id
      let input = {
        text: this.text
      }

      myApi({
        method: 'put',
        url: 'answer/' + id,
        data: input,
        headers: {
          auth: localStorage.token
        }
      })
        .then(({data}) => {
          this.text = ''
          this.showPage = true
          this.$emit('modifieddata')
        }).catch((err) => {
          this.errorMessage = err.response.data.message
          console.log(err.response.data.message)
        });
      console.log(id, 'id nya ini nih cuy')
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  watch: {
    answer(val) {
      this.checkVote()
    }
  },
  filters: {
    myDate(val) {
      console.log(val)
      return moment(val).startOf('hour').fromNow(); 
    }
  }
}
</script>

<style>
.noHover{
  color: #000; 
  /* pointer-events: none; */
}

.noHover:hover {
  color: #000;
}

.noGreen{
  color: green; 
  /* pointer-events: none; */
}

.noGreen:hover {
  color: green;
}
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
