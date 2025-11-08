import React, { createContext, useContext, useEffect, useState } from 'react'

interface UserProfile {
  id: string
  full_name?: string
  email: string
  role: 'admin' | 'customer'
}

interface AuthContextType {
  user: UserProfile | null
  profile: UserProfile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Demo users for testing
const DEMO_USERS = [
  {
    id: '1',
    email: 'admin@juicetry.com',
    password: 'admin123',
    full_name: 'مدير النظام',
    role: 'admin' as const
  },
  {
    id: '2',
    email: 'user@juicetry.com',
    password: 'user123',
    full_name: 'عميل تجريبي',
    role: 'customer' as const
  }
]

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = () => {
      try {
        const savedUser = localStorage.getItem('juicetry_user')
        if (savedUser) {
          const userData = JSON.parse(savedUser)
          setUser(userData)
        }
      } catch (error) {
        console.error('Error checking session:', error)
        localStorage.removeItem('juicetry_user')
      } finally {
        setLoading(false)
      }
    }

    // Simulate loading time
    setTimeout(checkSession, 500)
  }, [])

  const signIn = async (email: string, password: string): Promise<{ error: any }> => {
    try {
      // Find user in demo users
      const demoUser = DEMO_USERS.find(u => u.email === email && u.password === password)
      
      if (!demoUser) {
        return { error: 'Invalid credentials' }
      }

      const userData: UserProfile = {
        id: demoUser.id,
        email: demoUser.email,
        full_name: demoUser.full_name,
        role: demoUser.role
      }

      setUser(userData)
      localStorage.setItem('juicetry_user', JSON.stringify(userData))
      
      return { error: null }
    } catch (error) {
      console.error('Sign in error:', error)
      return { error: 'Sign in failed' }
    }
  }

  const signOut = async (): Promise<void> => {
    try {
      setUser(null)
      localStorage.removeItem('juicetry_user')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const isAdmin = user?.role === 'admin'

  const value: AuthContextType = {
    user,
    profile: user, // Same as user for simplicity
    loading,
    signIn,
    signOut,
    isAdmin
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
