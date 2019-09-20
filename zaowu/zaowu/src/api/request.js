// axios的封装 为了可以方便的统一的使用axios做数据请求
// axios是原生ajax的封装
import axios from 'axios'
import qs from 'qs'
// import { Message , MessageBox } from 'element-ui'
import router from '@/router'
import myAuth from '@/utils/myAuth'

// create an axios instance
// axios.defaults.withCredentials = false;
const service = axios.create({
  withCredentials: false,
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 8000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  // token 是登陆成功后 服务器返回给你的  需要存入客户端 在此处添加代码逻辑
  // token的问题  token是有过期时间的 如果过期 服务器会要求客户端重新请求token(刷新token)
  // 如何知道token过期呢? 一般服务器会在即将过期/已经过期的时候给客户端特殊标识
  if (myAuth.get()) {
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    // 可以通过代码 动态给http request请求头 添加内容
    config.headers['bf-token'] = myAuth.get().user.id;
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor   拦截器
service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    const res = response.data
    // return res 登陆超时  提示 并且强制跳转到login 需要清楚本地的storage
    if (res.tokenCode==5000) {
      //1.清除本地storage
      myAuth.reset();
      //2.友好提示
      // Message({
      //   message: '登陆超时,请重新登陆!',
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      //3.强制跳转
      router.push('/login');
      Promise.reject(new Error(res.message || 'Error'))      
    }else{
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  })
function http(config) {
  if (config.method.toLowerCase() === 'post') {
    config.data = qs.stringify(config.data, { arrayFormat: 'repeat', allowDots: true });
  } else {
    config.params = config.data
  }
  return service(config)
}

export default http;