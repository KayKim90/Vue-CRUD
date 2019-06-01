import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import UserIndex from '@/views/UserIndex'
import UserView from '@/views/UserView'
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
      component: UserIndex
    },
    {
      path: '/user/:id',
      name: 'userView',
      component: UserView
    }
  ]
})
