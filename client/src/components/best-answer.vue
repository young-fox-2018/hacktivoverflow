<template>
     <div class="container bg-light">
        <div class="bg-success rounded p-3">
         <!-- Header penjawab-->
          <h4 class="font-weight-bold"> Best Answer :</h4>
          <profilepenjawab></profilepenjawab>
          <div class="container">
            <div class="bg-success p-3">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At doloremque ad distinctio porro ut. Hic, facilis nesciunt non magni deserunt atque a quas quia neque omnis inventore laboriosam explicabo amet?</p>
            </div>
          </div>
        </div>
       </div>
</template>
<script>
import profilepenjawab from '@/components/profile-penjawab.vue'
export default {
    components:{ profilepenjawab }
}
</script>
