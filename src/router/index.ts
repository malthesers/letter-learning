import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/writing/:id',
      name: 'writing',
      component: () => import('../views/WritingView.vue')
    },
    {
      path: '/sorting/:id',
      name: 'sorting',
      component: () => import('../views/SortingView.vue')
    }
  ]
})

export default router
