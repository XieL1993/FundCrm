// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './common/icons'
import './common/styles/index.scss'
import { Button, Tab, Tabs, PullRefresh } from 'vant'

Vue.use(Button).use(Tab).use(Tabs).use(PullRefresh)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
