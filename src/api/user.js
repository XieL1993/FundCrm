import fetch from './httpFetch'

export function login(username, password) {
  return fetch({
    method: 'get',
    url: '/login',
    params: { username, password }
  })
}
