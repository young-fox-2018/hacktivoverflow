<template>
  <div class="container">
    <div class="columns">
      <div class="column">Category / Topic</div>
      <div class="column">List of Questions</div>
      <div class="column">Hot Questions of the month</div>
    </div>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
  },
};
</script>

<style scoped>
.container {
  border: 1px solid black;
  height: 100vh;
}
.column {

  border: 1px solid black;
}
</style>
