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
    <button class="tablink" @click="showTab = 'myanswers'">My Answers</button>
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
                  <a class="button is-info" @click="showModal = true; questionSelected = question">Edit</a>
                </div>
                <div class="column">
                  <a class="button is-danger" @click="deleteQuestion(question)">Delete</a>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <div class="modal is-active" v-if="showModal">
        <div class="modal-background" @click="showModal = false"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Edit Question</p>
            <button class="delete" aria-label="close" @click="showModal = false"></button>
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
            <button class="button" @click="showModal = false">Cancel</button>
          </footer>
        </div>
      </div>
    </div>

    <div class="tabcontent show" v-if="showTab === 'myanswers'">
      <h1>My Answers</h1>
      <p>List of my posted answers.</p>
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

export default {
  name: 'MyProfile',
  components: {
    Editor,
  },
  data() {
    return {
      showTab: 'myquestions',
      myQuestions: [],
      error: false,
      errorMsg: '',
      success: false,
      successMsg: '',
      questionSelected: {
        title: '',
        content: '',
      },
      showModal: false,
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
        this.showModal = false;
      }, 2000);
    },
    showErrorMessage(msg) {
      this.error = true;
      this.errorMsg = msg;
      setTimeout(() => {
        this.error = false;
        this.errorMsg = '';
        this.showModal = false;
        this.questionSelected = {};
      }, 2000);
    },
  },
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
