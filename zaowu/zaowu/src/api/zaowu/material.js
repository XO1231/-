// axios 的封装
import request from '@/api/request'

function getList(data) {
  return request({
    url: `/api/zaowu/admin/upload/list`,
    method: 'get',
    data
  })
}
function uploadImg(data) {
  return request({
      url: '/api/zaowu/admin/upload',
      method: 'post',
      data
  })
}
function updateInfo(data){
    return request({
        url: '/api/zaowu/admin/upload/updateInfo',
        method: 'post',
        data
    })
}
function uploadDel(data) {
  return request({
      url: '/api/zaowu/admin/upload/del',
      method: 'get',
      data
  })
}
export default {
    getList,
    uploadImg,
    updateInfo,
    uploadDel,
}