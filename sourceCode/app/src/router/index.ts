import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RucheView from '@/views/RucheView.vue'
import RucherView from '@/views/RucherView.vue'

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
    },
    {
      path: '/ruche/:id',
      name: 'ruche',
      component: RucheView
    },
    {
      path: '/rucher/:id',
      name: 'rucher',
      component: RucherView
    }
  ]
})

router.beforeEach((to, from) => {
  if(to.name === 'login') return true
  const token = window.localStorage.getItem('token')
  if(!token) return { path: '/login' }
})

export default router
