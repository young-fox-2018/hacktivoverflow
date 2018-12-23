<template>
   <v-alert
      v-if="errorMessage"
      :value="alert = true"
      type="error"
      transition="scale-transition"
    >
      {{ errorMessage }}
  </v-alert>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ErrorAlert',
  computed: {
    ...mapState(['errorMessage']),
  },
};
</script>
