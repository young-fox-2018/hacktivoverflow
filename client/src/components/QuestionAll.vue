<template>
  <div>
    <div class="row border mx-1 list-question py-2 px-2 rounded">
      <div class="col-1">
        <div class="row d-flex justify-content-center number-thumb">
          {{question.voted}}
        </div>
        <div class="row d-flex justify-content-center">
          vote
        </div>
      </div>
      <div class="col-1">
        <div class="row d-flex justify-content-center number-thumb">
          {{question.answerId.length}}
        </div>
        <div class="row d-flex justify-content-center">
          answer
        </div>
      </div>
      <div class="col-10">
        <a href="#" class="title-thumb" @click="viewDetail(question._id)">
          {{question.title}}
        </a>
        <div class="row justify-content-end">
          <small class="mx-4">Asked by {{question.userId.name}}</small>
        </div>
        <div class="row justify-content-end">
          <small class="mx-4">{{question.createdDate | myDate}}</small>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'listquestion',
  props: ['question'],
  methods: {
    viewDetail(id) {
      this.$router.push('/'+id)
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
.list-question {
  min-height: 13vh;
}
.number-thumb {
  font-weight: bold;
  font-size: 22px
}
.title-thumb {
  /* font-weight: bold; */
  font-size: 20px;
  color: brown;
}

.title-thumb:hover {
  /* font-weight: bold; */
  font-size: 20px;
  color: #c46262;
  text-decoration: none;
}
</style>
