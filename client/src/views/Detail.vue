<template>
  <div class="container py-2 my-2 rounded">
    <div class="row">
      <div class="col-2 border-right">
        <!-- <ul class="list-group sticky-top sticky-offset">
            <li>Menu item..</li>
            <li>Menu item..</li>
        </ul> -->
        <div class="list-group sticky-offset" id="list-tab" role="tablist">
          <a class="list-group-item list-group-item-action" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">Home</a>
          <a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">Profile</a>
          <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#list-messages" role="tab" aria-controls="messages">Messages</a>
          <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#list-settings" role="tab" aria-controls="settings">Settings</a>
        </div>
      </div>
      <div class="col-10">
        <QuestionDetail :question="questionDetail" @modifieddata="modifiedData"/>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionDetail from '@/components/QuestionDetail.vue'
import myApi from '@/api/myApi'

export default {
  data() {
    return {
      questionDetail: {}
    }
  },
  components: {
    QuestionDetail
  },
  name: 'questiondetail',
  methods: {
    readData() {
      let id = this.$route.params.questionId
      myApi({
        method: 'get',
        url: '/question/' + id
      })
        .then(({ data }) => {
          this.questionDetail = data
        }).catch((err) => {
          console.log(err.response.data.message)
        });
    },
    modifiedData() {
      console.log('kesini lah')
      this.readData()
    }
  },
  mounted() {
    console.log('sioni')
    this.readData()
  }
}
</script>

<style>

</style>
