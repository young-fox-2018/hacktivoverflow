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
      // name: 'home',
      component: Home,
      children: [
        {
          path: '',
          // name: 'questions', 
          component: () => import('./components/FrontPage.vue')
        },
        {
          path: 'questions',
          // name: 'questions', 
          component: () => import('./components/AllQuestions.vue')
        },
        {
          path: 'newQuestion',
          // name: 'newQuestion', 
          component: () => import('./components/QuestionForm.vue')
        },
        {
          path: 'tags/:tagID/:tagName',
          name: 'tagID', 
          component: () => import('./components/TagQuestion.vue')
        },
        {
          path: ':questionID/:slug',
          name: 'questionDetail', 
          component: () => import('./components/QuestionDetail.vue')
        }
      ]
    }
  ]
})
