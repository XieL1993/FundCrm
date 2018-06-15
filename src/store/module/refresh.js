const refresh = {
  state: {
    studentList: false,
    orderList: false
  },
  mutations: {
    REFRESH_STUDENT_LIST(state, flag) {
      state.studentList = flag
    },
    REFRESH_ORDER_LIST(state, flag) {
      state.orderList = flag
    }
  },
  actions: {
    refreshStudentList({ commit }, flag) {
      commit('REFRESH_STUDENT_LIST', flag)
    },
    refreshOrderList({ commit }, flag) {
      commit('REFRESH_ORDER_LIST', flag)
    }
  }
}
export default refresh
