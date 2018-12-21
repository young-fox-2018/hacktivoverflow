<template>
  <div class="container">
 
      <hr>
      Browse by:
      <br>
      <button class="btn purple" @click="getOriginalList">Newest</button>
      <button class="btn purple" @click="viewTopQuestions">TopRated</button>
      <hr>
      <div class="header">
          <h1 style="font-size:26px">{{ questionFilter }}</h1>
      </div>
      <hr>

      <!--Pagination-->
      <button class="btn btn-sm purple" @click="prevPage" :disabled="pageNumber === 0" >
        Previous
      </button>
      <button class="btn btn-sm purple" v-for="(page, index) in pageCount" :key="'topPagination'+index" @click="changePage(page)" :disabled="pageNumber === page - 1">
        {{ page }}
      </button>
      <button class="btn btn-sm purple" @click="nextPage" :disabled="pageNumber >= pageCount -1">
        Next
      </button>

      <div v-for="question in paginatedData" :key="question._id" class="row" style="margin-right:0px">
        <div class="col-4 row">
          <div class="col-6" v-if="questionFilter == 'Top Rated Questions'">
            <div v-if="question.rating >= 0" style="color:green">{{question.rating}} </div>
            <div v-else style="color:red">{{question.rating}} </div>
          </div>
          <div class="col-6" v-else>
            {{question.votes.length}}
          </div>
          <div class="col-6" v-if="question.answers.length > 0" style="border: 1px solid green; color: green">
            {{question.answers.length}}
          </div>
          <div class="col-6" v-else>
            {{question.answers.length}}
          </div>
        </div>
        <div class="col-8">
          <router-link :to="`/questions/${question.slug}`">{{question.title}}</router-link>
        </div>
        <div class="col-4 row">
          <div class="col-6" v-if="questionFilter == 'Top Rated Questions'">
            Rating
          </div>
           <div class="col-6" v-else>
            Votes
          </div>
          <div class="col-6">
            Answers
          </div>
        </div>
        <div class="col-8">
          <div class="tags" v-for="(tag, index) in question.tags" :key="index">
            {{tag.text}}
          </div>
        </div>
        <div class="col-4 subtitle" style="text-align:left">
          <font-awesome-icon icon="calendar-alt"/> {{question.createdDate}}
        </div>
        <hr class="col-12">
      </div>

      <!--Pagination-->
      <button class="btn btn-sm purple" @click="prevPage" :disabled="pageNumber === 0" >
        Previous
      </button>
      <button class="btn btn-sm purple" v-for="(page, index) in pageCount" :key="'btmPagination'+index" @click="changePage(page)" :disabled="pageNumber === page - 1">
        {{ page }}
      </button>
      <button class="btn btn-sm purple" @click="nextPage" :disabled="pageNumber >= pageCount -1">
        Next
      </button>

  </div>
</template>

<script>
import axios from "axios";

export default {
  props: [],
  data() {
    return {
      questionList: [],
      pageNumber: 0,
      size: 5,
      questionFilter: 'Latest Questions'
    };
  },
  methods: {
    getQuestion: function() {
      axios({
        method: "get",
        url: "https://xavier-ho-server.thenile.online/ho/questions"
      })
        .then(response => {
          this.$store.dispatch("storeQuestions_Action", response.data.data);
          this.questionList = this.$store.state.questionList;
          this.questionFilter = 'Latest Questions'
        })
        .catch(err => {
          console.log(err);
        });
    },
    nextPage(){
      this.pageNumber++;
    },
    prevPage(){
      this.pageNumber--;
    },
    changePage(page) {
      this.pageNumber = page - 1
    },
    viewTopQuestions() {
      let topRatedSort = [] //to find how many votes each question have
      this.questionList.forEach((question, index) => {
        let voteCount = 0
        question.votes.forEach(vote => {
          voteCount += vote.vote
        })
        let obj = {
          vote: voteCount,
          index: index
        }
        topRatedSort.push(obj)
      });
      let sorted = topRatedSort.sort(this.compare) //to sort the question by largest to lowest votes

      let questionSorted = [] // to get the questions detail based on rated sorting
      sorted.forEach(sort => {
        this.questionList[sort.index].rating = sort.vote
        questionSorted.push(this.questionList[sort.index])
      })
      this.questionList = questionSorted
      this.questionFilter = 'Top Rated Questions'
    },
    compare(a, b) {
      const voteA = a.vote;
      const voteB = b.vote;

      let comparison = 0;
      if (voteA < voteB) {
        comparison = 1;
      } else if (voteA > voteB) {
        comparison = -1;
      }
      return comparison;
    },
    getOriginalList() {
      this.questionList = this.$store.state.questionList
      this.questionFilter = 'Latest Questions'
    }
  },
  computed: {
    pageCount(){
      let l = this.questionList.length
      let s = this.size;
      return Math.ceil(l/s);
    },
    paginatedData(){
      const start = this.pageNumber * this.size
      const end = start + this.size;
      return this.questionList.slice(start, end);
    }
  },
  created: function() {
      this.getQuestion()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item {
  margin-bottom: 20px;
  border-bottom: 1px solid grey;
}
.subtitle {
  font-size: 14px;
  color: lightslategray;
}
.tags {
  width: fit-content;
  background-color: #D8BFD8;
  padding: 1px 5px;
  margin-right: 5px;
  border-radius: 5px;
  font-size: 14px;
  display: inline-block
}
button.purple {
    color: indigo;
    background-color: #ffffff;
    border: indigo 1px solid;
    margin-right: 5px;
    padding: 1px 3px
}
 
button.purple:hover {
    color: black;
    background-color: #D8BFD8;
    border: #D8BFD8 1px solid;
    padding: 1px 3px

}
</style>
