<template>
  <div>
    <div class="panel panel-default" v-for="question in dataQuestions" :key="question.id">
      <div class="panel-heading" ><option-button :dataQuestion="question" class="pull-right" /><h4> {{question.user.name}}</h4></div>
      <div class="panel-body">
        <hr>
        <p> {{question.question}} </p>
        <hr>
        <FormComment :question="question" />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '../config.js'
import FormComment from '@/components/FormComment'
import OptionButton from '@/components/OptionButton.vue'

export default {
  components: {
    FormComment,
    OptionButton,
  },
  data() {
    return {
      dataQuestions: [],
    }
  },
  methods: {
    getQuestions() {
      firebase.ref('question').on('value', (snapshot) => {
        let db = snapshot.val()
        let dataTmp = []
        Object.keys(db).forEach(data => {
          dataTmp.push(db[data])
        })
        this.dataQuestions = dataTmp.reverse()
      })
    },
    detail(question) {
      this.$router.push({ path: `/detail/${question.id}` })
    },
    // isUserMethod() {
    //   let dataUser = this.$store.state.dataUser
      
    // }
  },
  mounted() {
    this.getQuestions()
  }
}
</script>


<style scoped>
  .panel .btn i,.btn span{
  color:#666666;
  }
  .panel .panel-heading {
  background-color:#ffffff;
  font-weight:700;
  font-size:16px;
  color:#262626;
  border-color:#ffffff;
  }
  .panel .panel-heading a {
  font-weight:400;
  font-size:11px;
  }
  .panel .panel-default {
  border-color:#cccccc;
  }
  .panel .panel-thumbnail {
  padding:0;
  }
  .panel .img-circle {
  width:50px;
  height:50px;
  }
</style>

