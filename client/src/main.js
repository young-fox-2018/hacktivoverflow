import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import wysiwyg from "vue-wysiwyg";

Vue.config.productionTip = false
Vue.use(wysiwyg, {// if the image option is not set, images are inserted as base64
  hideModules: {
    image: true  
  },

  // limit content height if you wish. If not set, editor size will grow with content.
  maxHeight: "350px"
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
