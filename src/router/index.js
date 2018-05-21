import Vue from 'vue'
import Router from 'vue-router'
import Login from '../page/system/login'
import MainLayout from '../page/mainLayout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/mainIndex',
      name: '首页',
      component: MainLayout
    },
    {
      path: '/',
      component: MainLayout,
      redirect: '/mainIndex',
      children: [{
        name: '首页',
        path: '/home',
        component: resolve => {
          import('../page/home/home').then(module => {
            resolve(module)
          })
        },
        hidden: true
      }]
    }
  ]
})
