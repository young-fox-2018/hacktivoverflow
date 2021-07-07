<template>
  <div id="app">
    <navbar></navbar>
    
    <b-container id="mainContainer" style="max-width: 1350px; margin-top: 61px ">
      <div class="row">
        <div class="col-md-2 border-right" >
          <sidebar></sidebar>
        </div>
        <div class="col-md-8">
          <router-view :userLoggedIn="userLoggedIn"/>
        </div>
        <div class="col-md-2 border-left">
          
        </div>
      </div>
    </b-container>
    <footer>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <ul class="list-inline text-center">
              <li class="list-inline-item">
                <a href="#">
                  <span class="fa-stack fa-lg">
                    <i class="fas fa-circle fa-stack-2x"></i>
                    <i class="fab fa-twitter fa-stack-1x fa-inverse"></i>
                  </span>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="#">
                  <span class="fa-stack fa-lg">
                    <i class="fas fa-circle fa-stack-2x"></i>
                    <i class="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                  </span>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="#">
                  <span class="fa-stack fa-lg">
                    <i class="fas fa-circle fa-stack-2x"></i>
                    <i class="fab fa-github fa-stack-1x fa-inverse"></i>
                  </span>
                </a>
              </li>
            </ul>
            <p class="copyright text-muted">Copyright © hacktiv-overflow.abdev.icu 2018</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Navbar from '@/components/navbar.vue'
import {mapState, mapActions} from 'vuex'
import Sidebar from '@/components/Sidebar.vue'
import Related from '@/components/Related.vue'

export default {
  components: {
    Navbar,
    Sidebar,
    Related
  },
  computed: {
    ...mapState(['showAlert', 'varAlert', 'alertMessage', 'loginStatus', 'userLoggedIn'])
  },
  data(){
    return {
      showDismissibleAlert: true
    }
  },
  created(){
    let token = localStorage.getItem('token')
    if( token ){
      this.$store.dispatch('changeLogin', true)
    } else {
      this.$store.dispatch('changeLogin', false)
    }
    this.isLogin()

  }, 
  methods: {
    ...mapActions(['isLogin']),
  }
}
</script>

<style scoped>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  margin: 0;
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

footer {
  padding-top: 10px !important;
  padding-bottom: 0px !important;
}

.mainContainer {
    margin-top: 61px;
}


.container{
  max-width: 1264px !important;
}
footer {
  padding: 20px 0 30px;
}

</style>
