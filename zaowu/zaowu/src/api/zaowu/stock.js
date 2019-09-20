// axios 的封装
import request from '@/api/request'

function getList(data) {
  return request({
    url: `/api/zaowu/admin/goods/stockList`,
    method: 'get',
    data
  })
}

function getDetail(data) {
  return request({
    url: `/api/zaowu/admin/goods/goodsStockDetail`,
    method: 'get',
    data
  })
}

function stockUpdate(data) {
  return request({
    url: '/api/zaowu/admin/goods/updateStock',
    method: 'post',
    data
  })
}

function stockSave(data) {
  return request({
    url: '/api/zaowu/admin/goods/saveStock',
    method: 'post',
    data
  })
}

function stockDel(data) {
  return request({
    url: '/api/zaowu/admin/goods/delStock',
    method: 'get',
    data
  })
}
export default {
  getList,
  getDetail,
  stockUpdate,
  stockDel,
  stockSave
}
