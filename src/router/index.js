import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
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
    component: () => import('@/views/Dashboard.vue')
  },
  {
    path: '/board',
    name: 'board',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Board.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
