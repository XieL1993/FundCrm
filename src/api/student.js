import fetch from './httpFetch'

export function getStudentList() {
  return fetch({
    method: 'get',
    url: '/student',
    params: {}
  })
}

export function addStudent(data) {
  return fetch({
    method: 'post',
    url: '/student/add',
    data
  })
}

