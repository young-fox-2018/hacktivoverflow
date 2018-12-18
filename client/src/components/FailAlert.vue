<template>
  <div>
    <b-alert :show="dismissCountDown"
             dismissible
             variant="danger"
             @dismissed="dismissCountDown=0"
             @dismiss-count-down="countDownChanged">
      {{errorMessage}} {{dismissCountDown}}
    </b-alert>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dismissSecs: 5,
      dismissCountDown: 0,
      errorMessage: ''
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
        this.errorMessage = this.message
        this.showAlert()
      }
    },
    dismissCountDown(val) {
      if (val == 0) {
        this.errorMessage = ''
        this.$emit('alertdone')
      }
    }
  }
}
</script>