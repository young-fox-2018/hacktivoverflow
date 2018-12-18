import Vue from 'vue';
import vmodal from 'vue-js-modal';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(vmodal);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
