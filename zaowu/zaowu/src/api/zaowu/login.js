// axios 的封装
import request from '@/api/request'

function doRegister(data) {
    return request({
        url: `/api/zaowu/user/doRegister`,
        method: 'post',
        data
    })
}

function checkUserName(data) {
    return request({
        url: `/api/zaowu/user/checkUserName`,
        method: 'post',
        data
    })
}

function doLogin(data) {
    return request({
        url: '/api/zaowu/user/doLogin',
        method: 'post',
        data
    })
}

export default {
    doRegister,
    checkUserName,
    doLogin,
}