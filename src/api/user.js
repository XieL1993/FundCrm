import fetch from './httpFetch'

export function login(username, password) {
  return fetch({
    method: 'post',
    url: '/login',
    data: { username, password }
  })
}

export function register(username, password) {
  return fetch({
    method: 'post',
    url: '/register',
    data: { username, password }
  })
}
