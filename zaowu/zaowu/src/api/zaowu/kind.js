// axios 的封装
import request from '@/api/request'

function getList(data) {
  return request({
    url: `/api/zaowu/admin/kind/list`,
    method: 'post',
    data
  })
}
function kindUpdate(data) {
  return request({
      url: '/api/zaowu/admin/kind/update',
      method: 'post',
      data
  })
}
function kindSave(data) {
  return request({
      url: '/api/zaowu/admin/kind/save',
      method: 'post',
      data
  })
}
function kindDel(data) {
  return request({
      url: '/api/zaowu/admin/kind/del',
      method: 'post',
      data
  })
}
function sort(data) {
  return request({
      url: '/api/zaowu/kind/goodsListByKind',
      method: 'post',
      data
  })
}
export default {
    getList,
    kindUpdate,
    kindDel,
    kindSave,
    sort
}