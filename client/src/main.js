import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import wysiwyg from 'vue-wysiwyg';
import FBSignInButton from 'vue-facebook-signin-button';

import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(wysiwyg);
Vue.use(FBSignInButton)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');