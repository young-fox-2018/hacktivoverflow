<template>
<div class="row">
  <div id="voteButton">
      <div class="arrow-up" @click="upvote"></div>
      <h5>{{ voteCount }}</h5>
      <div class="arrow-down" @click="downvote"></div>
  </div>
  <div id="titleDescription" class="">
    <div>
      <h5>Title</h5>
    </div>
    <div>
      <p>descriptionsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p >
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Question',
  data() {
    return {
      voteCount: 5
    }
  },
  methods: {
    upvote: function(req, res, next) {
      return this.voteCount +=1
    },
    downvote: function(req, res, next) {
      return this.voteCount -= 1
    }
  }
}
</script>

<style>
.arrow-down {
  width: 0; 
  height: 0; 
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 18px solid coral;
  cursor: pointer;
}
.arrow-up {
  width: 0; 
  height: 0; 
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 18px solid coral;
  margin-bottom: 5px;
  cursor: pointer;
}
#questionDescription {
  overflow-wrap: break-word;
}
#titleDescription {
  width: 400px; 
  word-wrap: break-word;
}
</style>
