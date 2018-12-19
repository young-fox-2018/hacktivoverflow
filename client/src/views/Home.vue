<template>
<div>
  <div class="home">
     <div class="row pt-2">
       <div class="col-lg-8"> 
          <router-view :jtoken="jtoken" :user_id="user_id"></router-view>
       </div>
       <div class="col-lg-4">
          <formtanya :jtoken ="jtoken"></formtanya>
       </div>
     </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import formtanya from '@/components/form-tanya.vue'


export default {
  name: 'home',
  components : { formtanya },
  props : ['jtoken','user_id'],
}
</script>
