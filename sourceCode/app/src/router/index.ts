import { createRouter, createWebHistory } from 'vue-router'
import { createFetchResult } from '@/composables/useFetch'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import { z } from 'zod'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

router.beforeEach((to, from) => {
  if(to.name === 'login') return true
  const token = window.localStorage.getItem('token')
  if(!token) return { path: '/login' }
})

export default router
