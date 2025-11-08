import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Home, Coffee, BookOpen, Users, Phone } from 'lucide-react'

const NewHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  // قائمة الروابط الثابتة
  const menuItems = [
    { id: 1, label: 'الرئيسية', url: '/', icon: Home },
    { id: 2, label: 'المنيو', url: '/menu', icon: Coffee },
    { id: 3, label: 'المقالات', url: '/blog', icon: BookOpen },
    { id: 4, label: 'من نحن', url: '/about', icon: Users },
    { id: 5, label: 'تواصل معنا', url: '/contact', icon: Phone },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-green-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* الشعار */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg md:text-xl">J</span>
              </div>
              <span className="text-xl md:text-2xl font-bold text-gray-800 hidden sm:block">
                Juicetry
              </span>
            </Link>
          </div>

          {/* قائمة التنقل - Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => {
              const IconComponent = item.icon
              return (
                <Link
                  key={item.id}
                  to={item.url}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 font-medium ${
                    location.pathname === item.url 
                      ? 'text-green-600 bg-green-50' 
                      : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* زر القائمة - Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* قائمة التنقل - Mobile */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-2">
              {menuItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <Link
                    key={item.id}
                    to={item.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                      location.pathname === item.url 
                        ? 'text-green-600 bg-green-50' 
                        : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default NewHeader


