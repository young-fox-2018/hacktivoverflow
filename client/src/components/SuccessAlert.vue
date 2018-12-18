<template>
  <div>
    <b-alert :show="dismissCountDown"
             dismissible
             variant="success"
             @dismissed="dismissCountDown=0"
             @dismiss-count-down="countDownChanged">
      {{successAlert}} {{dismissCountDown}}
    </b-alert>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dismissSecs: 5,
      dismissCountDown: 0,
      successAlert: ''
    }
  },
  methods: {
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    }
  },
  props: ['message'],
  watch: {
    message(val) {
      if (val) {
        this.successAlert = this.message
        this.showAlert()
      }
    },
    dismissCountDown(val) {
      if (val == 0) {
        this.successAlert = ''
      }
    }
  }
}
</script>