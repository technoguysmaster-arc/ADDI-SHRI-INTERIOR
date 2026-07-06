import { createContext, useState, useEffect, useContext } from 'react'
import axiosInstance from '../api/axiosInstance'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Initialize auth state from localStorage on load
  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user')
    const accessToken = localStorage.getItem('access_token')

    if (storedUser && accessToken) {
      setUser(JSON.parse(storedUser))
      // Set default header
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    }
    setLoading(false)
  }, [])

  // Login with Google credential token
  const loginWithGoogle = async (googleCredential) => {
    try {
      const response = await axiosInstance.post('/auth/google/', {
        token: googleCredential,
      })

      const { user, access, refresh } = response.data

      // Save tokens and user info
      localStorage.setItem('auth_user', JSON.stringify(user))
      localStorage.setItem('access_token', access)
      localStorage.setItem('refresh_token', refresh)

      setUser(user)

      // Set auth header for future requests
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access}`
      return { success: true }
    } catch (error) {
      console.error('Google Login backend verification failed:', error)
      return {
        success: false,
        error: error.response?.data?.error || 'Authentication failed on server.',
      }
    }
  }

  // Logout
  const logout = () => {
    localStorage.removeItem('auth_user')
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setUser(null)
    delete axiosInstance.defaults.headers.common['Authorization']
  }

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
