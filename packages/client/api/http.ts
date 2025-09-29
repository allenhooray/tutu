
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
    try {
      const token = await AsyncStorage.getItem('authToken')
      if (token && config.headers) {
        config.headers.Authorization = token
      }
    } catch (error) {
      console.error('Failed to get auth token:', error)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
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
      try {
        await AsyncStorage.removeItem('authToken')
        await AsyncStorage.removeItem('user')
        // 这里可以使用导航跳转，但需要注意循环依赖问题
        // 可以在实际应用中使用事件总线或其他方式处理
      } catch (e) {
        console.error('Failed to clear auth data:', e)
      }
    }
    return Promise.reject(error)
  }
)