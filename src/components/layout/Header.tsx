import React from 'react'
import { Link } from 'react-router-dom'
import { Coffee } from 'lucide-react'

const Header: React.FC = () => {
  console.log('Header: Rendering...')
  
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Coffee className="h-8 w-8 text-orange-500" />
            <span className="text-2xl font-bold text-gray-900">جوستري</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-orange-500 transition-colors">
              الرئيسية
            </Link>
            <Link to="/menu" className="text-gray-700 hover:text-orange-500 transition-colors">
              قائمة العصائر
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-orange-500 transition-colors">
              المنتجات
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-orange-500 transition-colors">
              من نحن
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-orange-500 transition-colors">
              تواصل معنا
            </Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <Link 
              to="/admin"
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm"
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