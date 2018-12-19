<template>
  <div class="container">
    <div class="notification is-success" v-if="success">
      <button class="delete" @click="success = false; successMsg = ''"></button>
      {{ successMsg }}
    </div>
    <div class="notification is-danger" v-if="error">
      <button class="delete" @click="error = false; errorMsg = ''"></button>
      {{errorMsg}}
    </div>

    <button class="tablink active" @click="showTab = 'myquestions'">My Questions</button>
    <button class="tablink" @click="showTab = 'myanswers'; getMyAnswers()">My Answers</button>
    <button class="tablink" @click="showTab = 'messages'">Messages</button>
    <button class="tablink" @click="showTab = 'settings'">Settings</button>
    <div class="tabcontent show" v-if="showTab === 'myquestions'">
      <h1>My Questions</h1>
      <ul>
        <li v-for="question in myQuestions" :key="question._id">
          <div class="columns">
            <div class="column addition">
              <div class="columns"><strong> {{ question.title }} </strong></div>
              <div class="columns date">Posted at: {{ formatDate(question.posted_at) }}</div>
            </div>
            <div class="column is-3">
              <div class="columns grouped">
                <div class="column">
                  <a class="button is-info" @click="showModalQuestion = true; questionSelected = question">Edit</a>
                </div>
                <div class="column">
                  <a class="button is-danger" @click="deleteQuestion(question)">Delete</a>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <div class="modal is-active" v-if="showModalQuestion">
        <div class="modal-background" @click="showModalQuestion = false"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Edit Question</p>
            <button class="delete" aria-label="close" @click="showModalQuestion = false"></button>
          </header>
          <section class="modal-card-body">
              <div class="notification is-success" v-if="success">
                <button class="delete" @click="success = false; successMsg = ''"></button>
                {{ successMsg }}
              </div>

              <div class="notification is-danger" v-if="error">
                <button class="delete" @click="error = false; errorMsg = ''"></button>
                {{ errorMsg }}
              </div>
            <input v-model="questionSelected.title" class="input" type="text" placeholder="Question Summary...">
            <wysiwyg v-model="questionSelected.content" />
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" @click.prevent="editQuestion">Update Question</button>
            <button class="button" @click="showModalQuestion = false">Cancel</button>
          </footer>
        </div>
      </div>
    </div>

    <div class="tabcontent show" v-if="showTab === 'myanswers'">
      <h1>My Answers</h1>
      <ul>
        <li v-for="(answer, index) in myAnswers" :key="answer._id">
          <div class="columns">
            <div class="column addition">
              <div class="columns"><strong> {{ answer.title }} </strong></div>
              <div class="columns">Comment: {{ answer.answer }}</div>
            </div>
            <div class="column is-2">
              <div class="columns grouped">
                <a class="button is-info" @click="showModalAnswer = true; answerSelected = answer; questionId = index">Edit</a>
              </div>
            </div>
          </div>
        </li>
      </ul>

       <div class="modal is-active" v-if="showModalAnswer">
        <div class="modal-background" @click="showModalAnswer = false"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Edit Answer</p>
            <button class="delete" aria-label="close" @click="showModalAnswer = false"></button>
          </header>
          <section class="modal-card-body">
              <div class="notification is-success" v-if="success">
                <button class="delete" @click="success = false; successMsg = ''"></button>
                {{ successMsg }}
              </div>

              <div class="notification is-danger" v-if="error">
                <button class="delete" @click="error = false; errorMsg = ''"></button>
                {{ errorMsg }}
              </div>
            <input v-model="answerSelected.title" class="input" type="text" placeholder="Question Summary...">
            <wysiwyg v-model="answerSelected.answer" />
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" @click.prevent="editAnswer">Update Answer</button>
            <button class="button" @click="showModalAnswer = false">Cancel</button>
          </footer>
        </div>
      </div>
    </div>

    <div class="tabcontent show" v-if="showTab === 'messages'">
      <h1>Messages</h1>
      <p>You have 0 messages.</p>
    </div>

    <div class="tabcontent show" v-if="showTab === 'settings'">
      <h1>Settings</h1>
      <p>Still in beta.</p>
    </div>

  </div>
</template>

<script>
import Editor from '@/components/Editor.vue';
import axios from '@/assets/dotapi';
import database from '@/assets/config.js';

export default {
  name: 'MyProfile',
  components: {
    Editor,
  },
  data() {
    return {
      showTab: 'myquestions',
      myAnswers: [],
      myQuestions: [],
      error: false,
      errorMsg: '',
      success: false,
      successMsg: '',
      questionSelected: {
        title: '',
        content: '',
      },
      answerSelected: {
        title: '',
        answer: '',
      },
      showModalQuestion: false,
      showModalAnswer: false,
    };
  },
  created() {
    this.getMyQuestions();
  },
  methods: {
    getMyQuestions() {
      axios
        .get('/questions/me',
          {
            headers: { token: localStorage.token }
          })
        .then(({ data }) => {
          this.myQuestions = data.questions;
        })
        .catch(err => {
          this.showErrorMessage('Error getting all of my questions');
        });
    },
    getMyAnswers() {
      this.myAnswers = [];
      for(let key in this.getAllAnswers) {
        for(let moreKey in this.getAllAnswers[key]) {
          if(this.getAllAnswers[key][moreKey].userId == localStorage.current_user) {
            let newObj = {...this.getAllAnswers[key][moreKey]};
            newObj.questionId = key;
            newObj.answerId = moreKey;
            this.myAnswers.push(newObj);
          }
        }
      }
    },
    formatDate(dateInput) {
      let date = new Date(dateInput).toISOString().substring(0, 10);
      return date;
    },
    editQuestion() {
      axios
      .put(`/questions/${this.questionSelected._id}`,
        {
          title: this.questionSelected.title,
          content: this.questionSelected.content,
        },
        {
          headers: { token: localStorage.token }
        },
        )
        .then(({ data }) => {
          this.showSuccessMessage(data.msg);
        })
        .catch((err) => {
          this.showErrorMessage(err.response.data.msg);
        });
    },
    editAnswer() {
      database.ref(`answers/${this.answerSelected.questionId}/${this.answerSelected.answerId}`).update({
        title: this.answerSelected.title,
        answer: this.answerSelected.answer,
      });
    },
    deleteQuestion(question) {
      this.questionSelected = question;
      if(confirm('Are you sure you want to delete this question?')) {
        axios
          .delete(`/questions/${this.questionSelected._id}`,
          {
            headers: { token: localStorage.token }
          }
          )
          .then(({ data }) => {
            this.showSuccessMessage(data.msg);
            this.getMyQuestions();
          })
          .catch((err) => {
            this.showErrorMessage(err.response.data.msg);
          });
      }
    },
    showSuccessMessage(msg) {
      this.success = true;
      this.successMsg = msg;
      setTimeout(() => {
        this.success = false;
        this.successMsg = '';
        this.showModalQuestion = false;
        this.showModalAnswer = false;
      }, 2000);
    },
    showErrorMessage(msg) {
      this.error = true;
      this.errorMsg = msg;
      setTimeout(() => {
        this.error = false;
        this.errorMsg = '';
        this.showModalQuestion = false;
        this.showModalAnswer = false;
        this.questionSelected = {};
      }, 2000);
    },
  },
  computed: {
    getAllAnswers() {
      return this.$store.state.answers;
    }
  }
};
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
.container {
  width: 100%;
}
.date {
  font-size: .9em;
}

input {
  margin-bottom: 2rem;
  font-size: 1.3rem;
}

ul {
  text-align: justify;
  margin-left: .5rem;
  margin-right: 0;
}
.notification {
  padding: .5rem;
  margin-bottom: 0;
}

li {
  /* border: 1px solid black; */
  /* margin: .5rem 0; */
  padding: 1rem .5rem;
  border-bottom: 1px solid rgba(175, 175, 175);
}
li:hover {
  cursor: pointer;
  background-color: rgb(204, 204, 204);
}

h1 {
  margin-bottom: 1rem;
  font-size: 2rem;
}

.tablink {
  background-color: rgb(175, 175, 175);
  font-weight: bold;
  color: white;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  font-size: 17px;
  width: 25%;
}

/* Change background color of buttons on hover */
.tablink:hover {
  background-color: #777;
}

.active {
  background-color: hsl(204, 86%, 53%);
}

/* Set default styles for tab content */
.tabcontent {
  /* display: none; */
  height: 80vh;
  /* padding: 50px; */
  /* text-align: center; */
}
.show {
  display: block;
}

/* Style each tab content individually */
/* #London {background-color:red;}
#Paris {background-color:green;}
#Tokyo {background-color:blue;}
#Oslo {background-color:orange;} */
</style>
