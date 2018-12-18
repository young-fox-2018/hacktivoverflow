import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Detail from './views/Detail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/register',
      name: 'regiter',
      component: () => import(/* webpackChunkName: "register" */ './views/FormPage.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/FormPage.vue')
    },
    {
      path: '/my',
      name: 'my',
      component: Home
    },
    {
      path: '/addquestion',
      name: 'addquestion',
      component: () => import(/* webpackChunkName: "addquestion" */ './views/FormPage.vue')
    },
    {
      path: '/:questionId',
      name: 'questionDetail',
      component: Detail
    },
    {
      path: '/:questionId/update',
      name: 'questionUpdate',
      component: () => import(/* webpackChunkName: "updatequesion" */ './views/FormPage.vue')
    }
  ]
})
