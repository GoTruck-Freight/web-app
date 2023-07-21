import { createRouter, createWebHistory } from 'vue-router'
import OrderView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: OrderView
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrderView
  },
  {
    path: '/roads',
    name: 'roads',
    component: () => import(/* webpackChunkName: "about" */ '../views/RoadsView.vue')
  },
  {
    path: '/pricing',
    name: 'pricing',
    component: () => import(/* webpackChunkName: "about" */ '../views/PricingView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
