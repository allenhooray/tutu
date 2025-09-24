
import axios from 'axios'

// 创建axios实例
export const http = axios.create({
  baseURL: 'http://localhost:3000', // 可以根据实际环境设置基础URL
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器，自动添加认证令牌
http.interceptors.request.use(
  async (config) => {
    return config;
  }
)

// 响应拦截器，可以统一处理错误
http.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    // 处理401未授权错误，自动跳转到登录页面
    if (error.response?.status === 401) {
      // TODO
    }
    return Promise.reject(error)
  }
)