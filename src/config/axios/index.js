import axios from 'axios';
import { Message } from 'element-ui';
import router from "@/router";
let AUTH_TONKEN = (function(){
  return localStorage.getItem('tonken');
})

// location.href = '/login'
let options = {
  timeout: 100000,
  params: {
    t: new Date().getTime()
  },
  // headers: { 'content-type': 'application/x-www-form-urlencoded' }

  // `headers` 是即将被发送的自定义请求头
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'access-control-allow-origin': "*"
  },


}
var axiosInstance = axios.create(options);
axiosInstance.defaults.headers.common['Authorization'] = localStorage.getItem('tonken');
// 添加请求拦截器
axiosInstance.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  if(config.url.indexOf('login') > -1) {
    localStorage.setItem('tonken', '');
    config.headers.Authorization = '';
  } else {
    // Object.assign(config.headers, { 'Authorization': localStorage.getItem('tonken') });
    config.headers.Authorization = localStorage.getItem('tonken');
  }
  return config;
}, function (error) {

  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器

axiosInstance.interceptors.response.use((response) => {
  // 对响应数据做点什么

  // debugger
  if(response.headers.token) {
    localStorage.setItem('tonken', response.headers.tonken)
  }
  return Promise.resolve(response)
}, function (error) {
  let { code, msg } = error.response.data
  if( code == 600 ) {
    localStorage.setItem('tonken', '')
    Message.error({
      message: msg
    })
    router.push('/login')
    // Promise.reject()
  }
  // 对响应错误做点什么error
  return Promise.reject(error.response);
});

export default axiosInstance;