import fetch from './httpFetch'

export function getCategory() {
  return fetch({
    method: 'get',
    url: '/category'
  })
}

export function getIndex() {
  return fetch({
    method: 'get',
    url: '/index'
  })
}
