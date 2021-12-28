import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    beforeEnter (to, from, next) {
      const api = `${process.env.VUE_APP_API}admin/signin`
      this.$http.post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            next({ path: '/account' })
          }
        })
    }
  },
  // 登入才可使用的頁面
  {
    path: '/dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'account',
        name: 'account',
        component: () => import('../views/Account.vue')
      },
      {
        path: 'addAccount',
        component: () => import('../views/AddAccount.vue')
      },
      {
        path: 'products',
        component: () => import('../views/Products.vue')
      },
      {
        path: 'addProducts',
        component: () => import('../views/AddProducts.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
