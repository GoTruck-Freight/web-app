import { createRouter, createWebHistory } from 'vue-router'
import OrderView from '../views/HomeView.vue'
import store from "@/store"

const routes = [
  {
    path: '/',
    name: 'home',
    component: OrderView,
    beforeEnter: (from:any, to: any, next: any) => {
      if (store.getters.isAuthenticated) {
        next();
      } else {
        next({
          path: '/login',
          replace: true
        })
      }
    }
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrderView,
    beforeEnter: (from:any, to: any, next: any) => {
      if (store.getters.isAuthenticated) {
        next();
      } else {
        next({
          path: '/login',
          replace: true
        })
      }
    }
  },
  {
    path: '/roads',
    name: 'roads',
    component: () => import(/* webpackChunkName: "about" */ '../views/RoadsView.vue'),
    beforeEnter: (from:any, to: any, next: any) => {
      if (store.getters.isAuthenticated == true) {
        next();
      } else {
        next({
          path: '/login',
          replace: true
        })
      }
    }
  },
  {
    path: '/pricing',
    name: 'pricing',
    component: () => import(/* webpackChunkName: "about" */ '../views/PricingView.vue'),
    beforeEnter: (from:any, to: any, next: any) => {
      if (store.getters.isAuthenticated) {
        next();
      } else {
        next({
          path: '/login',
          replace: true
        })
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/AuthView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, _from, next) => {
//   const isAuthenticated = store.getters.isAuthenticated;

//   if (!isAuthenticated) {
    
//     next({
//       path: '/login',
//       // replace: true
//     });
//   } else {
//     next();
//   }
// })

export default router
