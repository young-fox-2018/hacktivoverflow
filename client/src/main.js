import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import firebase from 'firebase'

library.add(faCoffee)
let config = {
  apiKey: "AIzaSyBymjXDSTzpQCIRSDZSwH_9sFNKcK9BjrQ",
  authDomain: "hacktivstackoverflow.firebaseapp.com",
  databaseURL: "https://hacktivstackoverflow.firebaseio.com",
  projectId: "hacktivstackoverflow",
  storageBucket: "hacktivstackoverflow.appspot.com",
  messagingSenderId: "466003685354"
}

firebase.initializeApp(config)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
