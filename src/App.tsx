import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/contexts/SimpleAuthContext'
import FastHomePage from '@/pages/FastHomePage'
import FastMenuPage from '@/pages/FastMenuPage'
import ImprovedAboutPage from './pages/ImprovedAboutPage'
import FastContactPage from '@/pages/FastContactPage'
import FastBlogPage from '@/pages/FastBlogPage'
import BlogPostPage from '@/pages/BlogPostPage'
import ProductsPage from '@/pages/ProductsPage'
import AdminLogin from '@/pages/admin/AdminLogin'
import FullDashboard from '@/components/dashboard/FullDashboard'
import LoadingSpinner from '@/components/LoadingSpinner'

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, isAdmin } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-lime-50">
        <LoadingSpinner message="جاري التحقق من الهوية..." size="lg" />
      </div>
    )
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />
  }

  return <>{children}</>
}

function App() {
  console.log('App component rendering...')
  
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* الصفحات العامة */}
          <Route path="/" element={<FastHomePage />} />
          <Route path="/menu" element={<FastMenuPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<ImprovedAboutPage />} />
          <Route path="/blog" element={<FastBlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/contact" element={<FastContactPage />} />
          
          {/* صفحات الإدارة */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <FullDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* إعادة توجيه المسارات غير الموجودة */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App