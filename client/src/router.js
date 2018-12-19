import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "QuestionsListPage" */ './views/QuestionsList.vue'),
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: () => import(/* webpackChunkName: "SignUpPage" */ './views/SignUp.vue')
    },
    {
      path: '/newQuestion',
      name: 'NewQuestion',
      component: () => import(/* webpackChunkName: "NewQuestionPage" */ './views/NewQuestion.vue')
    },
    {
      path: '/questions/:id',
      name: 'QuestionDetail',
      component: () => import(/* webpackChunkName: "QuestionDetailPage" */ './views/QuestionDetail.vue'),
    }
  ]
})
