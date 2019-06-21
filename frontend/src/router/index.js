import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import User from '@/views/User'
import UserView from '@/views/UserView'
import Product from '@/views/Product'
import Category from '@/views/Category'
import Login from '@/views/Login'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/user', // frontend 웹 주소
      name: 'user', // vue page 고치기
      component: User
    },
    {
      path: '/user/:id',
      name: 'userView',
      component: UserView
    },
    {
      path: '/product',
      name: 'product',
      component: Product
    },
    {
      path: '/category',
      name: 'category',
      component: Category
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
