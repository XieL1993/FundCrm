// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './common/icons'
import './common/styles/index.scss'
import filters from './common/filters'
import {
  Button,
  Tab,
  Tabs,
  PullRefresh,
  NoticeBar,
  List,
  CellSwipe,
  Field,
  Cell,
  CellGroup,
  Actionsheet,
  DatetimePicker,
  Search
} from 'vant'

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
Vue.use(Button).use(Tab).use(Tabs).use(PullRefresh).use(NoticeBar).use(List).use(CellSwipe).use(Field)
Vue.use(Cell).use(CellGroup).use(Actionsheet).use(DatetimePicker).use(Search)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
