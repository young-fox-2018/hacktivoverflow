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
          path: 'questions',
          name: 'readAll',
          component: () => import('./components/ReadAll.vue'),
          children: [],
        },
        {
          path: 'question/:id',
          name: 'question',
          component: () => import('./components/QuestionDetail.vue'),
        },
      ]
    }
  ]
})
