<template>
  <div class="home">
    <div class="row" style="margin-right: 0;">      
      <!-- <div class="col-3" style="margin-top: 50px;">
        <sidebar></sidebar>
      </div>
      <div class="col-9" style="margin-top: 50px;"> -->
        <listquestion></listquestion>
      <!-- </div> -->
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import listquestion from '@/components/Home/ListQuestions.vue'
import sidebar from '@/components/Sidebar.vue'

export default {
  name: 'home',
  components: {
    listquestion, sidebar
  }
}
</script>
