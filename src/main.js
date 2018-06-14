import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './common/icons'
import './common/styles/index.scss'
import filters from './common/filters'
import './common/js/import'

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
