import { createContext, useState, useContext, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // TODO: Replace with actual API call
      const mockUser = {
        id: 1,
        email,
        name: 'John Doe',
        token: 'mock-jwt-token'
      }
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
      toast.success('Login successful!')
      return { success: true }
    } catch (error) {
      toast.error('Login failed. Please try again.')
      return { success: false, error }
    }
  }

  const signup = async (userData) => {
    try {
      // TODO: Replace with actual API call
      const mockUser = {
        id: Date.now(),
        email: userData.email,
        name: userData.name,
        token: 'mock-jwt-token'
      }
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
      toast.success('Signup successful!')
      return { success: true }
    } catch (error) {
      toast.error('Signup failed. Please try again.')
      return { success: false, error }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    toast.success('Logged out successfully!')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}