import React from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  console.log('Header: Rendering...')
  
  return (
    <header className="bg-white shadow-sm border-b border-accent-light/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/final-logo-01.png" alt="Logo" className="h-10 w-auto object-contain" />
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-juicetry-gray hover:text-secondary transition-colors font-medium">
              الرئيسية
            </Link>
            <Link to="/menu" className="text-juicetry-gray hover:text-secondary transition-colors font-medium">
              قائمة العصائر
            </Link>
            <Link to="/products" className="text-juicetry-gray hover:text-secondary transition-colors font-medium">
              المنتجات
            </Link>
            <Link to="/about" className="text-juicetry-gray hover:text-secondary transition-colors font-medium">
              من نحن
            </Link>
            <Link to="/contact" className="text-juicetry-gray hover:text-secondary transition-colors font-medium">
              تواصل معنا
            </Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <Link 
              to="/admin"
              className="bg-gradient-to-r from-accent to-accent-light text-white px-6 py-2 rounded-xl hover:shadow-lg hover:scale-105 transition-all text-sm font-semibold"
            >
              لوحة الإدارة
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
