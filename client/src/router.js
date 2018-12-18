import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

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
          path: '/',
          name: 'question',
          component: () => import(/* webpackChunkName: "question" */ './components/Question.vue'),
        },
        {
          path: '/:id',
          name: 'question-detail',
          component: () => import(/* webpackChunkName: "questionDetail" */ './components/QuestionDetail.vue'),
        },
      ],
    },
    {
      path: '/new-question',
      name: 'newQuestion',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "newQuestion" */ './views/NewQuestion.vue'),
    },

  ],
});
