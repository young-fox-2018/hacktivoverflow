<template>
  <div class="home pt-5 container">
    <div class="row">
      <div class="col-3">
        <Sidebar></Sidebar>
      </div>
      <div class="col-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'


export default {
  name: 'home',
  components: { Sidebar }
}
</script>
