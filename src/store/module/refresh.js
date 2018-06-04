const refresh = {
  state: {
    studentList: false
  },
  mutations: {
    REFRESH_STUDENT_LIST(state, flag) {
      state.studentList = flag
    }
  },
  actions: {
    refreshStudentList({ commit }, flag) {
      commit('REFRESH_STUDENT_LIST', flag)
    }
  }
}
export default refresh
