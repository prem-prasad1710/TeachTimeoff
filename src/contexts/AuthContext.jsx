import React, { createContext, useState, useContext, useEffect } from 'react'
import { fetchCurrentUser } from '../utils/api-auth'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token'))
  
  // Clean up old localStorage keys on mount (one-time cleanup)
  useEffect(() => {
    if (localStorage.getItem('currentUser')) {
      localStorage.removeItem('currentUser')
      console.log('🧹 AuthContext: Removed old currentUser from localStorage')
    }
    if (localStorage.getItem('profileUser')) {
      localStorage.removeItem('profileUser')
      console.log('🧹 AuthContext: Removed old profileUser from localStorage')
    }
  }, [])

  // Load user from API when token exists
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const userData = await fetchCurrentUser()
          if (userData) {
            setUser(userData)
            console.log('✅ User loaded from MongoDB:', userData.name || userData.fullName)
          } else {
            // Token is invalid, clear it
            setToken(null)
            localStorage.removeItem('token')
          }
        } catch (error) {
          console.error('Failed to load user:', error)
          setToken(null)
          localStorage.removeItem('token')
        }
      }
      setLoading(false)
    }

    loadUser()
  }, [token])

  const login = async (userData, authToken) => {
    // Save token to localStorage and state
    localStorage.setItem('token', authToken)
    setToken(authToken)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  const updateUser = (updatedUserData) => {
    setUser(updatedUserData)
  }

  const refreshUser = async () => {
    if (token) {
      try {
        const userData = await fetchCurrentUser()
        if (userData) {
          setUser(userData)
        }
      } catch (error) {
        console.error('Failed to refresh user:', error)
      }
    }
  }

  const value = {
    user,
    loading,
    isAuthenticated: !!user && !!token,
    login,
    logout,
    updateUser,
    refreshUser
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
