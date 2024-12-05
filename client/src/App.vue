<template>
  <div id='app' class="container-fluid">
    <div class='row'>
      <div v-if='errMessage' class="alert alert-danger alert-dismissible" style="width: 100%;">
        <a class="close" v-on:click="clearErr" aria-label="close">&times;</a>
          <h1 class='text-center'> {{ errMessage }} </h1>
      </div>
      <div v-if='okMsg' class="alert alert-info alert-dismissible" style="width: 100%;">
        <a class="close" v-on:click="clearOk" aria-label="close">&times;</a>
          <h1 class='text-center'> {{ okMsg }} </h1>
      </div>
    </div>
    <div class="row">
      <div class='sidebar col-lg-2' >
        <div id='nav' >
          <router-link to='/'>Home</router-link> <br>
          <router-link v-if='logIn' to='/chatbox'> Let's Talk!</router-link> <br>
          <router-link v-if='logIn' to='/newQuestion'> Create Question</router-link> <hr>
          <router-link class="btn btn btn-outline-secondary" v-if='!logIn' to='/signup'>Join Us!</router-link> <br>
          <button type="button" class="btn btn-sm btn-outline-secondary" v-if='logIn' id='signout' v-on:click.prevent='signOut'>Sign Out</button> <br>
        </div>
      </div>
      <div class="col-lg-10" >
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'app',
    created: function() {
      if (localStorage.token) {
        this.$store.dispatch('logIn', {status: true, details: {token: localStorage.token, userId: localStorage.userId, username: localStorage.username}})
      }
    },
  data: function(){  
    return {
      
    }
  },
  methods:{
    signOut(){
      localStorage.clear()
      this.$store.dispatch('logOut', {status: false})
      this.$store.dispatch('okmsg', {msg: "You Have Successfully Logged Out"})
      this.$router.push('/')
    },
    clearErr(){
      this.$store.dispatch('errmsg', {msg: ""})
    },
    clearOk(){
      this.$store.dispatch('okmsg', {msg: ""})
    }
  },
  computed: {
    errMessage(){
      return this.$store.state.errormsg
    },
    logIn(){
      return this.$store.state.logIn
    },
    okMsg(){
      return this.$store.state.okmsg
    }
  }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 1.2em;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #ffffff;
}

#nav a.router-link-exact-active {
  color: #9c4dd1;
}

.container{
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100vw;
}

.sidebar {
  min-height:100vh;
  top:0;
  left:0;
  width:250px;
  transition: all 300ms cubic-bezier(0.65, 0.05, 0.36, 1);
  will-change: left, width;
  box-shadow: inset -1px 0 10px rgba(0, 0, 0, 0.4);
  background: #293749;
}

.sidebar ul {
    list-style:none;
    padding-left:58px;
}
.sidebar ul li {
    padding:10px;
}
.sidebar ul li a {
    color:#fff;
    display:block;
}
.sidebar ul li i {
    float:left;
    color:grey;
    margin-left:-58px;
    font-size:30px;
    padding-left:7px;
}
.sidebar ul li:hover {
    background:#167696;
}
.sidebar ul li a:hover {
    color:#fff;
    text-decoration:none;
}
.sidebar ul li:hover i {
    color:#fff;
}
.sidebar ul li.active {
    background:#0f4698;
}
.sidebar ul li.active i {
    color:#fff;
}
.sidebar ul li.active:hover {
    background:#167696;
}
.sidebar ul li.active:hover i {
    color:#fff;
}

</style>