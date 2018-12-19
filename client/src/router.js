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
      children: [{
        path: '',
        component: () => import(/* webpackChunkName: "about" */ './components/QuestionList')
      }, {
        path: 'mypost',
        component: () => import(/* webpackChunkName: "about" */ './components/MyPost')
      }, {
        path: ':id',
        component: () => import(/* webpackChunkName: "about" */ './components/QuestionSingle')
      }]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
