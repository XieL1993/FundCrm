import fetch from './httpFetch'

export function getStudentList(searchText, pageSize, currentPage) {
  return fetch({
    method: 'get',
    url: '/student',
    params: { searchText, pageSize, currentPage }
  })
}

export function addStudent(data, method) {
  return fetch({
    method: 'post',
    url: `/student/${method}`,
    data
  })
}

export function getStudentDetail(sid) {
  return fetch({
    method: 'get',
    url: '/student/detail',
    params: {
      sid
    }
  })
}

export function deleteStudent(sid) {
  return fetch({
    method: 'get',
    url: '/student/delete',
    params: {
      sid
    }
  })
}

