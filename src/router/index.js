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
      path: '/',
      component: MainLayout,
      redirect: '/home',
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
