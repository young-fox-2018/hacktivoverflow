<template>
  <div class="vote">
    <p>{{ count }}</p>
    <p>
      <button class="btn btn-primary" @click="increment">Up Vote (+)</button>
      <button class="btn btn-primary" @click="decrement">Down Vote (-)</button>
    </p>
  </div>
</template>

<script>
import store from "@/store.js";
import database from "../assets/config.js";

export default {
  name: "count",

  computed: {
    count() {
      return store.state.count;
    },
    methods: {
      increment() {
        store.commit("increment");
      },
      decrement() {
        store.commit("decrement");
      }
    }
  }
};
</script>



