// axios 的封装
import request from '@/api/request'

function getList(data) {
  return request({
    url: `/api/zaowu/admin/goods/list`,
    method: 'get',
    data
  })
}

function getDetail(data) {
  return request({
    url: `/api/zaowu/admin/goods/goodsDetail`,
    method: 'get',
    data
  })
}

function goodsUpdate(data) {
  return request({
    url: '/api/zaowu/admin/goods/update',
    method: 'post',
    data
  })
}

function goodsSave(data) {
  return request({
    url: '/api/zaowu/admin/goods/save',
    method: 'post',
    data
  })
}

function goodsDel(data) {
  return request({
    url: '/api/zaowu/admin/goods/del',
    method: 'get',
    data
  })
}
export default {
  getList,
  goodsUpdate,
  goodsDel,
  goodsSave,
  getDetail
}
