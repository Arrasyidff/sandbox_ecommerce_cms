import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Transactions from '../views/Transactions.vue'
import Products from '../views/Products.vue'
import DetailTransaction from '../views/DetailTransaction.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/products',
    component: Home,
    children: [
      {
        path: 'products',
        name: 'Products',
        component: Products
      },
      {
        path: 'transactions',
        name: 'Transactions',
        component: Transactions
        // children: [
        //   {
        //     path: ':id',
        //     name: 'Detail Transaction',
        //     component: DetailTransaction
        //   }
        // ]
      },
      {
        path: 'transaction-:id',
        name: 'Detail Transaction',
        component: DetailTransaction
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token')
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else if (to.name === 'Login' && isAuthenticated) next({ name: 'Products' })
  else next()
})

export default router
