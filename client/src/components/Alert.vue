<template>
  <b-alert  :show="countDownTime"
            dismissible
            :variant="type"
            class="alert-props"
            @dismissed="countDownToZero">
    {{message}}   
  </b-alert>
</template>
<script>
export default {
  props:['countDownTime', 'type', 'message'],
  methods: {
    countDownToZero() {
      this.$emit('count-down-finish', 0)
    }
  }
}
</script>
<style>
  .alert-props {
    position: fixed;
  }
</style>
