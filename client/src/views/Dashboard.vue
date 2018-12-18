<template>
  <div v-if="isLoggedin">
     <!-- Breadcrumbs-->
    <ol class="breadcrumb">
      <li class="breadcrumb-item active" style="font-weight:500">    
        <router-link to="/dashboard/questions">
        <font-awesome-icon icon="wrench" />
        Maintain Questions
        </router-link>
      </li>
      <li class="breadcrumb-item active" style="font-weight:500">
        <router-link to="/dashboard/answers">
        <font-awesome-icon icon="wrench" />
        Maintain Answers
        </router-link>
      </li>
    </ol>
    <router-view> </router-view>
  </div>  
  <div v-else>
    Please Log in First
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'dashboard',
  computed: {
    isLoggedin() {
      return this.$store.state.isLoggedin
    }
  },
  mounted: function() {
    this.$store.dispatch("resetError")
  },
}
</script>
