// @ts-nocheck
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@/sport/views/main.vue')
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('@/sport/views/detail.vue')
    },
  ],
})


export default router
