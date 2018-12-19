<template>
  <div class="home">
    <div class="row">
      <AddQuestion></AddQuestion><br>
    </div>
    <div class="row">
      <ReadAll v-if="this.$route.fullPath == '/' "></ReadAll>
      <router-view @read-all="readAll"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AddQuestion from '@/components/AddQuestion.vue';
import ReadAll from '@/components/ReadAll.vue';
import axios from '@/apis/axios'

export default {
  name: 'home',
  data() {
    return {
    };
  },
  components: {
    AddQuestion,
    ReadAll,
  },
  methods: {
    readAll() {
      axios({
        method: 'GET',
        url: `/questions`,
        headers: {
          token: localStorage.getItem("token")
        },
      })
      .then(({ data }) => {
        this.$store.state.questions = data;
      })
      .catch((err) => {
        console.log(err);
      });
    },
  },
  mounted() {
    this.readAll();
  },
};
</script>
