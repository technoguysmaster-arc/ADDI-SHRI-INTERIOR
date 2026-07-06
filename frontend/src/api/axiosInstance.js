import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor: Attach current token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response Interceptor: Handle token expiration (401)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Check if error is unauthorized and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = localStorage.getItem('refresh_token')

      if (refreshToken) {
        try {
          // Attempt token refresh via API view (un-intercepted to avoid loop)
          const response = await axios.post(
            `${axiosInstance.defaults.baseURL || '/api'}/auth/refresh/`,
            { refresh: refreshToken }
          )

          const newAccessToken = response.data.access
          localStorage.setItem('access_token', newAccessToken)

          // Update header and retry original request
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          return axiosInstance(originalRequest)
        } catch (refreshError) {
          console.error('Session expired, logging out...', refreshError)
          // Clear credentials
          localStorage.removeItem('auth_user')
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          delete axiosInstance.defaults.headers.common['Authorization']
          window.location.href = '/login'
        }
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
