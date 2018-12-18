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
        <div class="row d-flex justify-content-end">
        <small class="mx-4">answered by rangga</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'listquestion',
  props: ['question'],
  methods: {
    viewDetail(id) {
      this.$router.push('/'+id)
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
