const getters = {
  studentList: state => state.refresh.studentList,
  username: state => state.user.username,
  password: state => state.user.password,
  token: state => state.user.token
}
export default getters
