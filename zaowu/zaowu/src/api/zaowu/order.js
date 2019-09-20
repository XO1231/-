// axios 的封装
import request from '@/api/request'

function getList(data) {
  return request({
    url: `api/zaowu/order/list`,
    method: 'get',
    data
  })
}

function payDone(data) {
  return request({
    url: `api/zaowu/order/payDone`,
    method: 'get',
    data
  })
}

function saveOrder(data) {
  return request({
    url: '/api/zaowu/order/save',
    method: 'post',
    data
  })
}

function cancelOrder(data) {
  return request({
    url: 'api/zaowu/order/cancelOrder',
    method: 'get',
    data
  })
}
export default {
  getList,
  payDone,
  cancelOrder,
  saveOrder,
}
