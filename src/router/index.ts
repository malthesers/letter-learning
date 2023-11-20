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
      path: '/:id',
      name: 'letter',
      component: () => import('../views/LetterView.vue')
    },
    {
      path: '/:id/writing',
      name: 'writing',
      component: () => import('../views/WritingView.vue')
    },
    {
      path: '/:id/sorting',
      name: 'sorting',
      component: () => import('../views/SortingView.vue')
    }
  ]
})

export default router
