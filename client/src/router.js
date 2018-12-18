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
      path: '/questions',
      name: '',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "questions" */ './views/Questions.vue'),
      children: [ 
        {
          path: '',
          component: () => import(/* webpackChunkName: "questions" */ './components/Questions/QuestionHome.vue'),
        },
        {
          path: ':slug',
          component: () => import(/* webpackChunkName: "questions" */ './components/Questions/QuestionDetail.vue'),
        },
        // {
        //   path: ':questionId',
        //   component: () => import(/* webpackChunkName: "questions" */ './components/Questions/QuestionDetail.vue'),
        // },
      ]
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "login" */ './views/LogIn.vue'),
    },
    {
      path: '/dashboard',
      name: '',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue'),
      children: [ 
          {
            path: 'questions',
            component: () => import(/* webpackChunkName: "dashboard" */ './components/Dashboard/UserQuestions.vue'),
          },
          {
            path: 'questions/view/:slug',
            component: () => import(/* webpackChunkName: "dashboard" */ './components/Dashboard/ViewQuestion.vue'),
          },
          {
            path: 'questions/edit/:slug',
            component: () => import(/* webpackChunkName: "dashboard" */ './components/Dashboard/EditQuestion.vue'),
            props: true,
          },
          {
            path: 'answers',
            component: () => import(/* webpackChunkName: "dashboard" */ './components/Dashboard/UserAnswers.vue'),
          },
        ]
    },
    {
      path: '/popularity',
      name: '',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Popularity.vue'),
      children: [ 
        {
          path: '',
          component: () => import(/* webpackChunkName: "popularity" */ './components/Questions/QuestionHome.vue'),
        },
      ]
    },
  ]
})
