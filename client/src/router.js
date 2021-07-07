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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/ask',
      name: 'ask',
      component: () => import(/* webpackChunkName: "ask" */ './views/Ask.vue')
    },
    {
      path: '/questions/:id/:slug',
      name: 'single',
      component: () => import(/*webpackChunkName: "single" */ './views/Single.vue')
    },
    {
      path: '/ask/:id/edit', 
      name: 'edit',
      component: () => import(/* webpackChunkName: "ask" */ './views/Ask.vue')
    },
    {
      path: '/tags',
      name: 'tags',
      component: () => import(/* webpackChunkName: "ask" */ './views/Tag.vue')
    }
  ]
})
