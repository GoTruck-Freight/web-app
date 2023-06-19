import { createRouter, createWebHistory } from 'vue-router'
import OrderView from '../views/OrderView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'Order',
    component: OrderView
  },
  {
    path: '/Login',
    name: 'Login',
    component: LoginView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
