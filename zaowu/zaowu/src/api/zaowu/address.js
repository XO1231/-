// axios 的封装
import request from '@/api/request'

function getList(data) {
  return request({
    url: `/api/zaowu/admin/address/list`,
    method: 'get',
    data
  })
}

function setOne(data) {
  return request({
    url: `/api/zaowu/admin/address/setOne`,
    method: 'get',
    data
  })
}

function addressUpdate(data) {
  return request({
    url: '/api/zaowu/admin/address/update',
    method: 'post',
    data
  })
}

function addressSave(data) {
  return request({
    url: '/api/zaowu/admin/address/save',
    method: 'post',
    data
  })
}

function addressDel(data) {
  return request({
    url: '/api/zaowu/admin/address/del',
    method: 'get',
    data
  })
}
export default {
  getList,
  addressUpdate,
  addressDel,
  addressSave,
  setOne
}