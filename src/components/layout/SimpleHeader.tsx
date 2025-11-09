import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const SimpleHeader: React.FC = () => {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
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

          {/* Desktop Navigation */}
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

          {/* Desktop Buttons - إخفاء في الموبايل */}
          <div className="hidden md:flex items-center gap-4">
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu - المنيو والمقالات ومن نحن واتصل بنا */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 mt-4">
            <nav className="flex flex-col gap-2">
              <Link 
                to="/menu" 
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive('/menu') 
                    ? 'text-green-600 bg-green-50 font-bold' 
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                المنيو
              </Link>
              <Link 
                to="/blog" 
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive('/blog') 
                    ? 'text-green-600 bg-green-50 font-bold' 
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                المقالات
              </Link>
              <Link 
                to="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive('/about') 
                    ? 'text-green-600 bg-green-50 font-bold' 
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                من نحن
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive('/contact') 
                    ? 'text-green-600 bg-green-50 font-bold' 
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                اتصل بنا
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default SimpleHeader
