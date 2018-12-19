import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import wysiwyg from 'vue-wysiwyg'
import moment from 'moment'
import GSignInButton from 'vue-google-signin-button'

Vue.use(GSignInButton)

Vue.use(wysiwyg, {
  hideModules: { 'table': true }
})
Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('MM-DD-YYYY hh:mm')
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
