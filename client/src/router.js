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
      component: Home,
      children: [
        {
          path: '',
          name: 'questionList',
          component: () => import(/* webpackChunkName: "questionList" */ './components/questionList.vue')
        },
        {
          path: 'question/:questionId',
          name: 'questionDetail',
          component: () => import(/* webpackChunkName: "questionDetail" */ './components/questionDetail.vue')
        },
        {
          path: 'myQuestion',
          name: 'myQuestion',
          component: () => import(/* webpackChunkName: "myQuestion" */ './components/myQuestion.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
    }
  ]
})
