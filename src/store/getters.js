const getters = {
  studentList: state => state.refresh.studentList,
  orderList: state => state.refresh.orderList,
  uid: state => state.user.uid,
  username: state => state.user.username,
  password: state => state.user.password,
  token: state => state.user.token
}
export default getters
