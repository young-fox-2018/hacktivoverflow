<template>
  <div class="container">
    <div class="columns">
      <div class="column is-2">
        <ul>
          <li>Category / Topic</li>
          <li>Technology</li>
          <li>Politics</li>
          <li>Culture</li>
          <li>Travel</li>
        </ul>
      </div>
      <div class="column is-7">
        <router-view />
      </div>
      <div class="column is-3">Hot Questions of the month</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from '@/assets/dotapi';
// import Question from '@/components/Question.vue';

export default {
  name: 'home',
};
</script>

<style scoped>
.container {
  /* border: 1px solid black; */
  /* height: 100vh; */
}
.is-7 {
  padding: 0;
}
.column {
  border-right: 1px solid rgb(175, 175, 175);
  border-left: 1px solid rgb(175, 175, 175);
  height: 80vh;
  /* padding: 2rem; */
}
</style>
