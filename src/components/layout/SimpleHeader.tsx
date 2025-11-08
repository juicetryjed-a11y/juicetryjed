import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const SimpleHeader: React.FC = () => {
  const location = useLocation()
  
  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">J</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Juicetry</h1>
              <p className="text-sm text-gray-600">جوستري</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                isActive('/') 
                  ? 'text-green-600 font-bold' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              الرئيسية
            </Link>
            <Link 
              to="/menu" 
              className={`font-medium transition-colors ${
                isActive('/menu') 
                  ? 'text-green-600 font-bold' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              المنيو
            </Link>
            <Link 
              to="/about" 
              className={`font-medium transition-colors ${
                isActive('/about') 
                  ? 'text-green-600 font-bold' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              من نحن
            </Link>
            <Link 
              to="/blog" 
              className={`font-medium transition-colors ${
                isActive('/blog') 
                  ? 'text-green-600 font-bold' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              المقالات
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium transition-colors ${
                isActive('/contact') 
                  ? 'text-green-600 font-bold' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              تواصل معنا
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link 
              to="/contact"
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              اطلب الآن
            </Link>
            <Link 
              to="/admin/login"
              className="px-4 py-2 border-2 border-green-500 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-all"
            >
              الإدارة
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default SimpleHeader
