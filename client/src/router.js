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
          name: 'home',
          component: () => import(/* webpackChunkName: "home-question" */ './components/HomeQuestions.vue')
        },
        {
          path: '/question/detail/:id',
          name: 'question-detail',
          component: () => import(/* webpackChunkName: "question-detail" */ './components/QuestionDetail.vue')
        },
        {
          path: '/question/add',
          name: 'add-question',
          component: () => import(/* webpackChunkName: "add-question" */ './components/AddQuestions.vue')
        },
        {
          path: '/question/edit/:id',
          name: 'edit-question',
          component: () => import(/* webpackChunkName: "edit-question" */ './components/EditQuestions.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '*',
      name: 'notfound',
      component: () => import(/* webpackChuckName: "about" */ './views/NotFound.vue')
    }
  ]
})
