import { createContext, useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import authApi from '../api/authApi'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(Cookies.get('token') || null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      fetchProfile()
    } else {
      setLoading(false)
    }
  }, [token])

  const fetchProfile = async () => {
    try {
      const res = await authApi.getProfile()
      setUser(res.data.user || res.data)
    } catch {
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    const res = await authApi.login(credentials)
    const { token: newToken, user: userData } = res.data
    Cookies.set('token', newToken, { expires: 7 })
    setToken(newToken)
    setUser(userData)
    return res.data
  }

  const register = async (data) => {
    return await authApi.register(data)
  }

  const logout = () => {
    Cookies.remove('token')
    setToken(null)
    setUser(null)
  }

  const updateUser = (userData) => {
    setUser((prev) => ({ ...prev, ...userData }))
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
