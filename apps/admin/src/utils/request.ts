import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

const request = axios.create({
  baseURL: '/api',
  timeout: 15000,
})

// 请求拦截：自动附加 JWT
request.interceptors.request.use((config) => {
  const token = localStorage.getItem('panda_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// 响应拦截：统一错误处理
request.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const status = err.response?.status
    const msg    = err.response?.data?.statusMessage || err.message

    if (status === 401) {
      const authStore = useAuthStore()
      authStore.logout()
      router.push('/login')
      ElMessage.error('登录已过期，请重新登录')
    } else if (status === 403) {
      ElMessage.error('权限不足')
    } else if (status === 404) {
      ElMessage.error('资源不存在')
    } else {
      ElMessage.error(msg || '请求失败')
    }

    return Promise.reject(err)
  }
)

export default request
