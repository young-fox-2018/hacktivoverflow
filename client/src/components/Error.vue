<template>
    <div id="notification" style="display:block" class="alert alert-danger alert-dismissible fade show" role="alert">  
        {{error}}
    </div>
</template>

<script>
export default {
  name: "error",
  props: ["error"],
};

</script>

<style>

</style>
