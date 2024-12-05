import Vue from 'vue'
import GSignInButton from 'vue-google-signin-button'
import App from './App.vue'
import router from './router'
import store from './store'
import wysiwyg from "vue-wysiwyg";
Vue.config.productionTip = false

Vue.use(GSignInButton)
Vue.use(
  wysiwyg,
  {
    hideModules: {
      bold: false
    }
  }
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
