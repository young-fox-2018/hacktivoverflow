import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

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
      path: '/signin',
      name: 'signin',
      component: () => import(/* webpackChunkName: "signIn" */ './views/Signin.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import(/* webpackChunkName: "signUp" */ './views/Signup.vue')
    },
    {
      path: '/question',
      name: 'question',
      component: () => import(/* webpackChunkName: "question" */ './views/Question.vue')
    },
  ]
})
