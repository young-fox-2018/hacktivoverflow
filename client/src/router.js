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
      component: Home,
      children: [
        {
          path: 'signup',
          name: 'signup',
          component: () => import(/* webpackChunkName: "signup" */ './components/signUp.vue')
        },
        {
          path: 'signin',
          name: 'signin',
          component: () => import(/* webpackChunkName: "signin" */ './components/signIn.vue')
        },
        {
          path: '',
          name: 'listQA',
          component: () => import(/* webpackChunkName: "listQA" */ './components/listQ&A.vue')
        },
        {
          path: 'newquestion',
          name: 'newquestion',
          component: () => import(/* webpackChunkName: "newquestion" */ './components/postQuestion.vue')
        },
        {
          path: 'myquestion',
          name: 'myquestion',
          component: () => import(/* webpackChunkName: "myquestion" */ './components/myQuestion.vue')
        },
        {
          path: 'editquestion/:id',
          name: 'editquestion',
          component: () => import(/* webpackChunkName: "editquestion" */ './components/editQuestion.vue')
        },
        {
          path: 'editanswer/:id',
          name: 'editAnswer',
          component: () => import(/* webpackChunkName: "editanswer" */ './components/editAnswer.vue')
        }
      ]
    },
  ]
})
