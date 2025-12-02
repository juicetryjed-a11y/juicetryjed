import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Search, ShoppingCart, User } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import logoImage from '../../scripts/logo2.png'

interface NavigationItem {
  id: string
  label: string
  url: string
  is_active: boolean
  order_index: number
}

interface HeaderSettings {
  show_logo: boolean
  logo_url: string
  show_search: boolean
  show_cart: boolean
  show_user_menu: boolean
  navigation_items: NavigationItem[]
  header_background: string
  header_text_color: string
  sticky_header: boolean
  announcement_bar: boolean
  announcement_text: string
  announcement_color: string
}

const SimpleHeader: React.FC = () => {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [settings, setSettings] = useState<HeaderSettings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHeaderSettings()
  }, [])

  const fetchHeaderSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('header_settings')
        .select('*')
        .single()

      if (data) {
        setSettings(data)
      }
    } catch (error) {
      console.error('Error fetching header settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  // Default navigation if settings fail to load
  const defaultNavItems = [
    { id: '1', label: 'الرئيسية', url: '/', is_active: true, order_index: 1 },
    { id: '2', label: 'المنيو', url: '/menu', is_active: true, order_index: 2 },
    { id: '3', label: 'من نحن', url: '/about', is_active: true, order_index: 3 },
    { id: '4', label: 'المقالات', url: '/blog', is_active: true, order_index: 4 },
    { id: '5', label: 'تواصل معنا', url: '/contact', is_active: true, order_index: 5 }
  ]

  const navItems = settings?.navigation_items?.filter(item => item.is_active).sort((a, b) => a.order_index - b.order_index) || defaultNavItems
  const bgColor = settings?.header_background || '#ffffff'
  const textColor = settings?.header_text_color || '#1f2937'
  const isSticky = settings?.sticky_header ?? true

  return (
    <>
      {/* Announcement Bar */}
      {settings?.announcement_bar && (
        <div
          className="py-2 px-4 text-center text-white text-sm font-medium"
          style={{ backgroundColor: settings.announcement_color || '#22c55e' }}
        >
          {settings.announcement_text}
        </div>
      )}

      <header
        className={`${isSticky ? 'sticky top-0' : 'relative'} left-0 right-0 z-50 transition-colors duration-300 shadow-lg`}
        style={{ backgroundColor: '#ffffff' }}
      >
        <div className="container mx-auto px-6 py-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src={logoImage} alt="Logo" className="h-12 w-auto object-contain" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.url}
                  className={`font-medium transition-colors hover:opacity-80 ${isActive(item.url) ? 'font-bold' : ''
                    }`}
                  style={{ color: textColor }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

        {/* Actions - Same for mobile and desktop */}
        <div className="flex items-center gap-4">
          {settings?.show_search && (
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" style={{ color: textColor }}>
              <Search className="h-5 w-5" />
            </button>
          )}

          {settings?.show_cart && (
            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative" style={{ color: textColor }}>
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">0</span>
            </Link>
          )}

          <Link
            to="/contact"
            className="px-4 py-2 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            style={{ backgroundColor: '#91719b' }}
          >
            اطلب الآن
          </Link>
        </div>
          </div>


        </div>
      </header>
    </>
  )
}

export default SimpleHeader
