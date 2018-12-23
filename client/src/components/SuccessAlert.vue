<template>
   <v-alert
      v-if="successMessage"
      :value="alert = true"
      type="success"
      transition="scale-transition"
    >
      {{ successMessage }}
  </v-alert>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SuccessAlert',
  computed: {
    ...mapState(['successMessage']),
  },
};
</script>
