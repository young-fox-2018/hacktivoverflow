<template>
  <div id="app">
      <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand">Sesat di jalan</a>
        <ul class="nav justify-content-center">
          <li class="nav-item">
            <router-link to="/"><a class="nav-link disabled">Home</a></router-link>
          </li>
          <li class="nav-item">
            <router-link to="/myquestion"> <a class="nav-link disabled">My Question</a></router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="modal" data-target="#addQuestionModal">Add Question</a>
          </li>
        </ul>
        <!-- Modal add question -->
        <div class="modal fade" id="addQuestionModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">What is your question??</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                  <div class="form-group">
                    <textarea v-model="question" class="form-control"
                    id="exampleFormControlTextarea1" rows="3"></textarea>
                  </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button @click="addQuestion" type="button"
                class="btn btn-primary">Add Question</button>
              </div>
            </div>
          </div>
        </div>
        <form class="form-inline">
          <button v-if = "!isLogin" data-toggle="modal" data-target="#register" class="btn btn-outline-success my-2 my-sm-0" type="submit">Register</button>
          <button v-if = "!isLogin" data-toggle="modal" data-target="#signin" class="btn btn-outline-success my-2 my-sm-0" type="submit">Sign In</button>
          <button v-if = "!isLogin" @click="signIn"
          class="btn btn-outline-success my-2 my-sm-0" type="submit">Sign In With Google</button>
          <button v-if = "isLogin" @click="signOut"
          class="btn btn-outline-success my-2 my-sm-0" type="submit">Logout</button>
        </form>
        <!-- modal register -->
        <div class="modal fade" id="register" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">Register</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                 <h5>Name</h5>
                   <input v-model="register.nama" type="text">
                 <h5>Email</h5>
                   <input v-model="register.email" type="text">
                 <h5>Password</h5>
                   <input v-model="register.password" type="text">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button"
                class="btn btn-primary">Register</button>
              </div>
            </div>
          </div>
        </div>
        <!-- modal login --> 
        <div class="modal fade" id="signin" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">Sign In</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                  <h6>Email</h6>
                  <input v-model="signin.email" type="text">
                  <h6>Password</h6>
                  <input v-model="signin.password" type="text">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Sign In</button>
              </div>
            </div>
          </div>
        </div>   
      </nav>
      <br><br>
    <router-view/>
  </div>
</template>

<script>
// import {auth, firestore, database} from './assets/config.js';
import firebase from 'firebase';
// import admin from 'firebase-admin';
import { initApp } from './assets/config.js';
// import { initAdmin } from './assets/admin_config.js';

export default {
  name: 'navigation',
  data() {
    return {
      isLogin: false,
      question: '',
      signin: {
        email: '',
        password: '',
      },
      register: {
        nama: '',
        email: '',
        password: '',
      }
    };
  },
  methods: {
    addQuestion() {
      firebase.database().ref('/question').push({
        name: this.getUserName(),
        email: this.getUserEmail(),
        question: this.question,
        like: '',
        dislike: '',
        answer: '',
      });
      this.question = '';
    },
    register() {
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    },
    signIn() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },
    signOut() {
      firebase.auth().signOut();
    },
    initFirebaseAuth() {
      console.log('initFirebaseAuth invoked');
      // Listen to auth state changes.
      firebase.auth().onAuthStateChanged(this.authStateObserver);
    },
    getUserName() {
      return firebase.auth().currentUser.displayName;
    },
    getUserEmail() {
      return firebase.auth().currentUser.email;
    },
    isUserSignedIn() {
      // Returns true if a user is signed-in.
      return !!firebase.auth().currentUser;
    },
    authStateObserver(user) {
      console.log('authStateObserver invoked');
      if (user) { // User is signed in!
        this.$store.dispatch('isLoginStatus', true);
      } else { // User is signed out!
        this.$store.dispatch('isLoginStatus', false);
      }
      this.isLogin = this.$store.state.isLogin;
    },
  },
  created() {
    initApp();
  },
  mounted() {
    this.initFirebaseAuth();
  },
};
</script>


<style>
.btn {
  margin: 5px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
