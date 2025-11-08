import React, { useEffect } from 'react'
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
import { dataService } from '@/lib/dataService'
import { applyThemeColors } from '@/hooks/useTheme'

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
  
  // تحميل وتطبيق الألوان من localStorage أو قاعدة البيانات
  useEffect(() => {
    const loadThemeColors = async () => {
      try {
        // أولاً: جرب قراءة الألوان من localStorage
        const savedColors = localStorage.getItem('theme_colors')
        if (savedColors) {
          const colors = JSON.parse(savedColors)
          applyThemeColors(colors)
          console.log('🎨 Theme colors applied from localStorage:', colors)
          return
        }
        
        // ثانياً: إذا لم تكن موجودة، اقرأها من قاعدة البيانات
        const { data } = await dataService.getSiteSettings()
        if (data && data.length > 0 && data[0].primary_color) {
          const settings = data[0]
          const colors = {
            primary: settings.primary_color || '#22c55e',
            secondary: settings.secondary_color || '#84cc16',
            accent: settings.accent_color || '#eab308'
          }
          applyThemeColors(colors)
          
          // احفظها في localStorage للمرات القادمة
          localStorage.setItem('theme_colors', JSON.stringify(colors))
          
          console.log('🎨 Theme colors applied from database:', colors)
        }
      } catch (error) {
        console.error('Error loading theme colors:', error)
      }
    }
    
    loadThemeColors()
  }, [])
  
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