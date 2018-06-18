import fetch from './httpFetch'
import store from '../store'

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

export function getProductDetail(pid) {
  return fetch({
    method: 'get',
    url: '/product/detail',
    params: { pid }
  })
}

export function getProductList(cid, pageSize, currentPage) {
  return fetch({
    method: 'get',
    url: '/product',
    params: { cid, pageSize, currentPage }
  })
}

export function addCart(data) {
  return fetch({
    method: 'post',
    url: '/cart/add',
    data
  })
}

export function getCart() {
  return fetch({
    method: 'get',
    url: '/cart'
  })
}

export function deleteCart(pid) {
  return fetch({
    method: 'get',
    url: '/cart/delete',
    params: { pid }
  })
}

export function clearCart() {
  return fetch({
    method: 'delete',
    url: '/cart/clear'
  })
}

export function addOrder(uid) {
  return fetch({
    method: 'post',
    url: '/order/add',
    data: { uid }
  })
}

export function getOrderList(pageSize, currentPage) {
  return fetch({
    method: 'get',
    url: '/order',
    params: { uid: store.getters.uid, pageSize, currentPage }
  })
}

export function getOrderDetail(oid) {
  return fetch({
    method: 'get',
    url: '/order/detail',
    params: { oid }
  })
}

export function pay(oid, telephone, name, address) {
  return fetch({
    method: 'post',
    url: '/order/pay',
    data: { oid, telephone, name, address }
  })
}

export function deleteOrder(oid) {
  return fetch({
    method: 'post',
    url: '/order/delete',
    data: { oid }
  })
}

export function addProduct(data) {
  return fetch.post('/attach/add', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    transformRequest: [
      function(data) {
        return data
      }
    ]
  })
}
