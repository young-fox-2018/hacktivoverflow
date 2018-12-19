<template>
  <div class="row">
    <h1>Tessss</h1>
    <div class="col-sm-12">
      <div class="card">
        <div class="card-header">
          <h1> {{question.question}} </h1>
        </div>
        <div class="card">
          <ul class="list-group list-group-flush">
            <div v-for="e in question.answer" :key="e.id">
              <li class="list-group-item" > {{ e.user.name }} :  {{ e.answer }} <OptionButtonAnswer :dataAnswer="e" :dataQuestion="question" class="pull-right"/> </li>
              <hr>
            </div>
          </ul>
        </div>
        <div class="card-footer">
          This is a footer
          <router-link to="/">Home</router-link>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import firebase from '../config.js'
import OptionButtonAnswer from '@/components/OptionButtonAnswer'

export default {
  name: 'Detail',
  components: {
    OptionButtonAnswer,
  },
  data() {
    return {
      question: null,
    }
  },
  methods: {
    getQuetion() {
      firebase.ref(`question/${this.$route.params.id}`).on('value', (snapshot) => {
        this.question = snapshot.val()   
      })
    }
  },
  created() {
    this.getQuetion()
  }
}
</script>

