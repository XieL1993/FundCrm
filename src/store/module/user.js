import cache from '../../common/cache'

const user = {
  state: {
    uid: cache.get('uid', ''),
    username: cache.get('username', ''),
    password: cache.get('password', ''),
    token: cache.get('token', '')
  },
  mutations: {
    SET_UID(state, uid) {
      state.uid = uid
    },
    SET_USER_NAME(state, username) {
      state.username = username
    },
    SET_PASSWORD(state, password) {
      state.password = password
    },
    SET_TOKEN(state, token) {
      state.token = token
    }
  },
  actions: {
    saveUserInfo({ commit }, userInfo) {
      cache.set('uid', userInfo.uid)
      cache.set('username', userInfo.username)
      cache.set('password', userInfo.password)
      cache.set('token', userInfo.token)
      commit('SET_UID', userInfo.uid)
      commit('SET_USER_NAME', userInfo.username)
      commit('SET_PASSWORD', userInfo.password)
      commit('SET_TOKEN', userInfo.token)
    }
  }
}
export default user
