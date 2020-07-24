import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        requiresAuth: true
      },
      // route level code-splitting
      // this generates a separate chunk (dashboard.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue')
    },
    {
      path: '/board',
      name: 'board',
      meta: {
        requiresAuth: true
      },
      // props: true,
      // route level code-splitting
      // this generates a separate chunk (board.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "bpard" */ '@/views/Board.vue')
    }
  ]
})
