import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserIndex from '@/components/UserIndex'
import UserView from '@/components/UserView'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/user', // frontend 웹 주소
      name: 'user', // vue page 고치기
      component: UserIndex
    },
    {
      path: '/user/:id',
      name: 'UserView',
      component: UserView
    }
  ]
})
