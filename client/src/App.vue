<template>
  <div id="app">
    <navigation />
    <!-- <banner /> -->
    <router-view/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import Banner from '@/components/Banner.vue';
import database from '@/assets/config.js';

export default {
  components: {
    Navigation,
    Banner,
  },
  data() {
    return {
      answers: {},
    };
  },
  created() {
    this.getAll();
  },
  methods: {
    getAll() {
      var allTask = [];
      database.ref('/answers').on('value', (snapshot) => {
        // const allAnswers = ;
        // console.log('all answers,=======', allAnswers);
        this.$store.dispatch('getAllAnswers', snapshot.val());
      });
      database.ref('/upvoteQuestions').on('value', (snapshot) => {
        this.$store.dispatch('getQuestionUpvotes', snapshot.val());
      });
      database.ref('/downvoteQuestions').on('value', (snapshot) => {
        this.$store.dispatch('getQuestionDownvotes', snapshot.val());
      });
      database.ref('/upvoteAnswers').on('value', (snapshot) => {
        this.$store.dispatch('getAnswerUpvotes', snapshot.val());
      });
      database.ref('/downvoteAnswers').on('value', (snapshot) => {
        this.$store.dispatch('getAnswerDownvotes', snapshot.val());
      });
      // database.ref('/').orderByChild('status').equalTo('back-log').on("value", (snapshot) => {
      //   allTask = snapshot.val();
      //   this.$store.dispatch('saveTaskBackLog', allTask);
      // });
      // database.ref('/').orderByChild('status').equalTo('todo').on("value", (snapshot) => {
      //   allTask = snapshot.val();
      //   this.$store.dispatch('saveTaskToDo', allTask);
      // });
      // database.ref('/').orderByChild('status').equalTo('doing').on("value", (snapshot) => {
      //   allTask = snapshot.val();
      //   this.$store.dispatch('saveTaskDoing', allTask);
      // });
      // database.ref('/').orderByChild('status').equalTo('done').on("value", (snapshot) => {
      //   allTask = snapshot.val();
      //   this.$store.dispatch('saveTaskDone', allTask);
      // });
    },
  },
  // created() {
  //   database.ref('/answers').on('value', (snapshot) => {
  //     // console.log(snapshot.val(), 'inside created app==========')
  //     const allAnswers = snapshot.val()
  //     this.$store.dispatch('getAllAnswers', allAnswers);
  //   });
  //   database.ref('/upvoteQuestions').on('value', (snapshot) => {
  //     this.$store.dispatch('getQuestionUpvotes', snapshot.val());
  //   });
  //   database.ref('/downvoteQuestions').on('value', (snapshot) => {
  //     this.$store.dispatch('getQuestionDownvotes', snapshot.val());
  //   });
  //   database.ref('/upvoteAnswers').on('value', (snapshot) => {
  //     this.$store.dispatch('getAnswerUpvotes', snapshot.val());
  //   });
  //   database.ref('/downvoteAnswers').on('value', (snapshot) => {
  //     this.$store.dispatch('getAnswerDownvotes', snapshot.val());
  //   });
  // },
};
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  justify-content: center;
}
/* nav { */
  /* padding: 30px; */
  /* font-size: 1rem;
  width: 100%;
  border: 1px solid black;
}

.field.has-addons {
  align-items: center;
  margin: 0;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
