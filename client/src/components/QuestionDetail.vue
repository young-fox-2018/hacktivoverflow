<template>
  <div class="border-bottom" v-cloak>
    <FailAlert :message="errorMessage"  @alertdone="alertDone"/>
    <div class="row">
      <div class="col">
        <a href="#" @click="questionDetail(question._id)" class="title-detail">{{question.title}}</a>
      </div>
    </div>

    <div class="row  mx-2 border-top">
      <div class="col-1 ">
        <div class="row d-flex justify-content-center">
          <a href="#" v-if="voteStatus == 'up'" @click="upVote(question._id)" class="noGreen"><i class="fa fa-arrow-up fa-2x" aria-hidden="true"></i></a>
          
          <a href="#" v-else-if="voteStatus != 'up'" @click="upVote(question._id)" class="noHover"><i class="fa fa-arrow-up fa-2x" aria-hidden="true"></i></a>
        </div>
        <div class="row d-flex justify-content-center">
          <span class="voted-value">{{question.voted}}</span>
        </div>
        <div class="row d-flex justify-content-center">
          <a href="#" v-if="voteStatus == 'down'" @click="downVote(question._id)" class="noGreen"><i class="fa fa-arrow-down fa-2x" aria-hidden="true"></i></a>
          <a href="#" v-else-if="voteStatus != 'down'" @click="downVote(question._id)" class="noHover"><i class="fa fa-arrow-down fa-2x" aria-hidden="true"></i></a>

          <!-- <i class="fa fa-arrow-down fa-2x" aria-hidden="true"></i> -->
        </div>
      </div>

      <div class="col-10">
        <span v-html="question.description">
          <!-- {{question.description}} -->
        </span>
      </div>
    </div>


    <div v-if="question.userId">
      <div class="row" v-if="question.userId._id == isLogin">
        <div class="col text-right my-2">
          <b-button class="rounded btn-sm btn-success mx-2" @click="questionUpdate(question._id)">
            <i class="fa fa-pencil" aria-hidden="true"></i>
          </b-button>
          <b-button class="rounded btn-sm btn-danger" @click="questionDelete(question._id)">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </b-button>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import myApi from '@/api/myApi'
import { mapState } from 'vuex'
import FailAlert from '@/components/FailAlert.vue'

export default {  
  components: {
    FailAlert
  },
  data() {
    return {
      voteStatus: '',
      errorMessage: ''
    }
  },
  name: 'questiondetail',
  props: ['question'],
  methods: {
    questionDetail(id) {
      this.$router.push('/'+id)
    },
    questionDelete(id) {
      // console.log(id, 'delete nih')
      myApi({
        method: 'delete',
        url: '/question/'+id,
        headers: {
          auth: localStorage.token
        }
      })
        .then((result) => {
          this.$store.dispatch('readAllQuestion')
          this.$store.dispatch('readMyQuestion')
          this.$router.push('/')
        }).catch((err) => {
          console.log(err.response.data.message)
        });
    },
    questionUpdate(id) {
      console.log(id, 'ini update')
      this.$router.push('/' + id + '/update')
    },
    upVote(id) {
      // console.log(id, 'id')
      // let questionId = this.$router.params.questionId

      myApi({
        url: '/question/' + id + '/upvote',
        method: 'get',
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
      // console.log(id, 'ini id')
      // let questionId = this.$router.params.questionId

      myApi({
        url: '/question/' + id + '/downvote',
        method: 'get',
        headers: {
          auth: localStorage.token
        }
      })
        .then(({data}) => {
          console.log(data)
          this.$emit('modifieddata')
          // this.checkVote()
        }).catch((err) => {
          console.log(err.response.data.message)
          this.errorMessage = err.response.data.message
        });
    },
    checkVote() {
      // console.log(this.question.downVote[0] == this.isLogin)
      let down = this.question.downVote
      let up = this.question.upVote
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
    alertDone() {
      this.errorMessage = ''
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  watch: {
    question(val) {
      this.checkVote()
      // console.log(val)
      // this.questionDetail = val
    }
  }
}
</script>

<style>
.title-detail {
  font-size: 28px;
  font-weight: bold;
  color: brown;
}

.voted-value {
  font-size: 28px;
  font-weight: bold;
}

.title-detail:hover {
  /* font-weight: bold; */
  /* font-size: 20px; */
  color: #c46262;
  text-decoration: none;
}

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
</style>
