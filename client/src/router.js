import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/tags',
            name: 'tags',
            component: () => import(/* webpackChunkName: "tags" */ './views/Tags.vue'),
            children: [
                {
                    path: ':text',
                    name: 'tag-search',
                    component: () => import(/* webpackChunkName: "tag-search" */ './views/TagSearch.vue'),
                }
            ],
        },
        {
            path: '/profile/:userId',
            name: 'profile',
            component: () => import(/* webpackChunkName: "profile" */ './views/Profile.vue'),
        },
        {
            path: '/user-popularity',
            name: 'user-popularity',
            component: () => import(/* webpackChunkName: "user-popularity" */ './views/UserPopularity.vue'),
        },
        {
            path: '/my-questions',
            name: 'my-questions',
            component: () => import(/* webpackChunkName: "my-questions" */ './views/MyQuestions.vue'),
            children: [
                {
                    path: ':slug/:questionId',
                    name: 'modal-detail-my-question',
                    component: () => import(/* webpackChunkName: "modal-detail" */ './views/ModalDetail.vue'),
                }
            ],
        },
        {
            path: '/',
            name: 'home',
            component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
            children: [
                {
                    path: ':slug/:questionId',
                    name: 'modal-detail',
                    component: () => import(/* webpackChunkName: "modal-detail" */ './views/ModalDetail.vue'),
                }
            ],
        },
    ]
});