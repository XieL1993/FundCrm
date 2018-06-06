import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'
import refresh from './module/refresh'
import user from './module/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    refresh,
    user
  },
  getters
})
