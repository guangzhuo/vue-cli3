import axios from 'axios';

let options = {
    timeout: 100000,
    params: {
        t: new Date().getTime()
    },
    // headers: { 'content-type': 'application/x-www-form-urlencoded' }

    // `headers` 是即将被发送的自定义请求头
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    

}
var axiosInstance = axios.create(options);

// 添加请求拦截器
axiosInstance.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axiosInstance.interceptors.response.use((response) => {
    // 对响应数据做点什么
    const config = response.config
    const headers = response.headers
    let data = response.data || {}
    return Promise.resolve(data || {})
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  export default axiosInstance;