import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import 

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
      path: '/question',
      name: 'question',
      component: () => import(/* webpackChunkName: "question" */ './views/Question.vue'),
      children: [
        {
          path: '',
          name: 'allquestion',
          component: () => import(/* webpackChunkName: "allquestion" */ './components/Home/ListQuestions.vue'),
        },{
          path: '/question/ask',
          name: 'askquestion',
          component: () => import(/* webpackChunkName: "askquestion" */ './components/Question/AskQuestion.vue'),
        },{
          path: '/question/:questionId',
          name: 'detailquestion',
          component: () => import(/* webpackChunkName: "detailquestion" */ './views/DetailQuestion.vue'),
        },
        {
          path: '/question/edit/:questionId',
          name: 'editquestion',
          component: () => import(/* webpackChunkName: "editquestion" */ './components/Question/EditQuestion.vue'),
        }
      ]
    },
    {
      path: '/answer/edit/:questionId/:answerId',
      name: 'answer',
      component: () => import(/* webpackChunkName: "question" */ './components/Question/EditAnswer.vue'),
    }
  ]
})
