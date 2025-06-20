import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  // Check localStorage for persisted login state
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const stored = localStorage.getItem('isLoggedIn')
    return stored ? JSON.parse(stored) : false
  })

  const login = () => {
    setIsLoggedIn(true)
    localStorage.setItem('isLoggedIn', 'true')
  }

  const logout = () => {
    setIsLoggedIn(false)
    localStorage.setItem('isLoggedIn', 'false')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 