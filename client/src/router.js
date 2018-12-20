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
      children : [
        {
          path: '',
          name: 'list',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('./components/list-pertanyaan.vue')
        }
      ]
    },
    {
      path : '/tags',
      name : 'tag',
      component :() => import('./views/Tag.vue'),
      children : [
        {
          path : '',
          name : 'list-pertanyaan-tag',
          component : () => import('./components/tag-question-list.vue')
        },
        {
          path : ':slug/:id',
          name : 'detail-pertanyaan-tag',
          component : () => import('./components/detail-question.vue')
        }
      ]
    },
    {
      path : '/profile',
      name : 'profile',
      component : () => import('./views/profile.vue')
    }
  ]
})
