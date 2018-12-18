<template>
  <div class="container ">
    <nav class="navbar is-widescreen" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
        </a>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="field has-addons">
          <div class="control is-expanded">
            <input class="input" type="text" placeholder="Search...">
          </div>
          <div class="control">
            <a class="button is-info"> Search </a>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable" v-if="isLoggedIn">
            <a class="navbar-link is-arrowless">
              <img src="https://via.placeholder.com/150" alt="" srcset="">
            </a>
            <div class="navbar-dropdown">
              <a class="navbar-item">
                Profile
              </a>
              <!-- <hr class="navbar-divider"> -->
              <a class="navbar-item">
                Log Out
              </a>
            </div>
          </div>
          <div class="navbar-item" v-if="isLoggedIn">
            <div class="buttons">
              <router-link to="/new-question" class="button is-info">Add New Question</router-link>
            </div>
          </div>
          <div class="navbar-item" v-if="!isLoggedIn">
            <div class="buttons">
              <a class="button" @click="showLoginModal = true">Log In</a>
              <a class="button is-info" @click="showRegisterModal = true">Sign Up</a>
              <!-- <router-link to="/signup" class="button is-info">Sign Up</router-link> -->
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div v-if="showLoginModal" id="modal-id" class="modal modal-fx-slideRight is-active">
      <div class="modal-background" @click="closeModalLogin"></div>
      <div class="modal-content modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Login Form</p>
          <button class="modal-button-close delete" aria-label="close" @click="closeModalLogin"></button>
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
          <form class="box" v-on:submit.prevent="loginUser()">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input v-model="loginForm.email" class="input" type="email" placeholder="Email" required>
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                  <i class="fas fa-check"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input v-model="loginForm.password" class="input" type="password" placeholder="Password" required>
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>
          </form>
        </section>
        <footer class="modal-card-foot">
          <button class="modal-button-close button is-info" @click="loginUser">Login</button>
          <button class="modal-button-close button" @click="closeModalLogin">Cancel</button>
        </footer>
      </div>
    </div>

    <div v-if="showRegisterModal" id="modal-id" class="modal modal-fx-slideRight is-active">
      <div class="modal-background" @click="closeModalRegister"></div>
      <div class="modal-content modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Register Form</p>
          <button class="modal-button-close delete" aria-label="close" @click="closeModalRegister"></button>
        </header>
        <section class="modal-card-body">
          <form class="box" v-on:submit.prevent="registerUser()">
            <div class="field">
              <div class="control has-icons-left has-icons-right">
                <input v-model="registerForm.name" class="input" type="text" placeholder="Display Name" required>
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
                <span class="icon is-small is-right">
                  <i class="fas fa-check"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input v-model="registerForm.email" class="input" type="email" placeholder="Email" required>
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                  <i class="fas fa-check"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input v-model="registerForm.password" class="input" type="password" placeholder="Password" required>
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>
          </form>
        </section>
        <footer class="modal-card-foot">
          <button class="modal-button-close button is-info" @click="registerUser">Register</button>
          <button class="modal-button-close button" @click="closeModalRegister">Cancel</button>
        </footer>
      </div>
    </div>

  </div>

</template>

<script>
import axios from '@/assets/dotapi';

export default {
  name: 'Navigation',
  data() {
    return {
      isLoggedIn: false,
      showLoginModal: false,
      showRegisterModal: false,
      error: false,
      errorMsg: '',
      success: false,
      successMsg: '',
      loginForm: {
        email: '',
        password: '',
      },
      registerForm: {
        name: '',
        email: '',
        password: '',
      },
    };
  },
  created() {
    this.checkUserLogin();
  },
  methods: {
    checkUserLogin() {
      if(localStorage.token) {
        this.isLoggedIn = true;
      }
    },
    closeModalLogin() {
      this.showLoginModal = false;
      this.loginForm.email = '',
      this.loginForm.password = '';
    },
    closeModalRegister() {
      this.showRegisterModal = false;
      this.registerForm.name = '';
      this.registerForm.email = '';
      this.registerForm.password = '';
    },
    registerUser() {
      console.log('inside methods register user');
      console.log(this.registerForm);
    },
    loginUser() {
      axios
        .post('/login',
          {
            name: this.loginForm.name,
            email: this.loginForm.email,
            password: this.loginForm.password
          }
        )
        .then((response) => {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('current_user', response.data.userId);
          this.isLoggedIn = true;
          this.showSuccessMessage(response.data.msg);
        })
        .catch((err) => {
          this.showErrorMessage(err.response.data.msg);
        });
    },
    showSuccessMessage(msg) {
      this.success = true;
      this.successMsg = msg;
      setTimeout(() => {
        this.success = false;
        this.successMsg = '';
        this.closeModalLogin();
      }, 2000);
    },
    showErrorMessage(msg) {
      this.error = true;
      this.errorMsg = msg;
      setTimeout(() => {
        this.error = false;
        this.errorMsg = '';
      }, 3000);
    },
  },
};
</script>

<style scoped>
.field.has-addons {
  align-items: center;
  margin: 0;
  width: 50vw;
}
.field.has-addons .control.is-expanded {
  flex-grow: .5;
}
.container {
  margin-bottom: 2rem;
}
.notification {
  padding: .5rem;
}
.navbar-link.is-arrowless img {
  border-radius: 50%;
}

</style>
