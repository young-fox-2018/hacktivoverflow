<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h1><strong>Ask, Answer, Solve Your Problem</strong></h1>
            <p>Have any question? Post here and get an answers from people around the world. </p>
            <p>Because one answer might not make you satisfied. ^^</p>
          </div>
          <div class="column">
            Sign Up
          </div>
        </div>
        <!-- <h1 class="title">
          Hero title
        </h1>
        <h2 class="subtitle">
          Hero subtitle
        </h2> -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Banner',
};
</script>

<style scoped>
.hero {
  background-color: #117bf3;
  color: white;
  font-weight: bold;
}
strong {
  color: white;
}
h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}
p {
  line-height: 1.5rem;
  margin-bottom: 1.5rem;
}
.column {
  text-align: left;
  margin: 1rem;
}
</style>
