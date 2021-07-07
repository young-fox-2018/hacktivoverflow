import Vue from 'vue';
import wysiwyg from 'vue-wysiwyg';
import GSignInButton from 'vue-google-signin-button';
import Vuetify from 'vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);
Vue.use(GSignInButton);
Vue.use(wysiwyg, {});


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
