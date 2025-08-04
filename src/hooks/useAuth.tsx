import { useState, useEffect } from 'react'
import { STORAGE_KEYS } from '../utils/constants'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  loginType: 'email' | 'google'
  bio?: string | null
  phone?: string | undefined
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER)
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN)

    if (savedUser && token) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }

    setLoading(false)
  }, [])

  const login = (userData: User, token: string) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData))
    localStorage.setItem(STORAGE_KEYS.TOKEN, token)
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem(STORAGE_KEYS.USER)
    localStorage.removeItem(STORAGE_KEYS.TOKEN)
  }

  return {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  }
}
