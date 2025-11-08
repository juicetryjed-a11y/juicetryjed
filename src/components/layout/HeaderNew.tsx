import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Menu, X } from 'lucide-react'

interface HeaderSettings {
  logo_url?: string
  logo_position?: 'right' | 'center' | 'left'
  menu_items?: Array<{
    id: number
    label: string
    label_en?: string
    url: string
    position?: 'right' | 'center' | 'left'
    is_visible: boolean
    order: number
  }>
  text_color?: string
  background_color?: string
  font_family?: string
  font_size?: string
}

const HeaderNew: React.FC = () => {
  const [settings, setSettings] = useState<HeaderSettings | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const { data } = await supabase
        .from('header_settings')
        .select('*')
        .single()

      if (data) {
        const normalizedMenu = (data.menu_items ?? []).map((item: any) => ({
          ...item,
          label: item.label ?? item.label_ar ?? item.label_en ?? '',
        }))
        setSettings({
          logo_url: data.logo_url,
          logo_position: data.logo_position || 'right',
          menu_items: normalizedMenu,
          text_color: data.text_color || '#291719',
          background_color: data.background_color || '#ffffff',
          font_family: data.font_family || 'Noto Sans Arabic',
          font_size: data.font_size || '16px',
        })
      } else {
        // إعدادات افتراضية
        setSettings({
          logo_url: undefined,
          logo_position: 'right',
          menu_items: [
            { id: 1, label: 'المنيو', url: '/menu', is_visible: true, order: 1 },
            { id: 2, label: 'المقالات', url: '/blog', is_visible: true, order: 2 },
            { id: 3, label: 'من نحن', url: '/about', is_visible: true, order: 3 },
          ],
          text_color: '#291719',
          background_color: '#edd674',
          font_family: 'Noto Sans Arabic',
          font_size: '16px',
        })
      }
    } catch (error) {
      console.error('خطأ في جلب إعدادات الهيدر:', error)
      // إعدادات افتراضية في حالة الخطأ
      setSettings({
        logo_url: undefined,
        logo_position: 'right',
        menu_items: [
          { id: 1, label: 'المنيو', url: '/menu', is_visible: true, order: 1 },
          { id: 2, label: 'المقالات', url: '/blog', is_visible: true, order: 2 },
          { id: 3, label: 'من نحن', url: '/about', is_visible: true, order: 3 },
        ],
        text_color: '#291719',
        background_color: '#edd674',
        font_family: 'Noto Sans Arabic',
        font_size: '16px',
      })
    }
  }

  if (!settings) {
    return null
  }

  const headerStyle = {
    background: `linear-gradient(135deg, ${settings.background_color || '#edd674'} 0%, #f05a36 100%)`,
    color: settings.text_color || '#291719',
    fontFamily: settings.font_family,
    fontSize: settings.font_size,
  }

  const sortedMenuItems = (settings.menu_items || []).sort((a, b) => a.order - b.order)

  return (
    <header 
      className="sticky top-0 z-50 shadow-2xl transition-all duration-300 backdrop-blur-md bg-white/95 border-b border-green-100"
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(34, 197, 94, 0.1)'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* الشعار */}
          <div 
            className={`flex items-center ${
              settings.logo_position === 'center' ? 'absolute left-1/2 -translate-x-1/2' :
              settings.logo_position === 'left' ? 'order-3' : 'order-1'
            }`}
          >
            {settings.logo_url ? (
              <Link to="/">
                <img 
                  src={settings.logo_url} 
                  alt="Juicetry - جوستري" 
                  className="h-12 w-auto"
                />
              </Link>
            ) : (
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">J</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-gray-900">جوستري</span>
                  <span className="text-xs font-bold text-green-600">Juicetry</span>
                </div>
              </Link>
            )}
          </div>

          {/* القائمة - سطح المكتب */}
          <nav 
            className={`hidden md:flex items-center gap-8 ${
              settings.logo_position === 'left' ? 'order-1' : 'order-2'
            }`}
          >
            {sortedMenuItems
              .filter(item => item.is_visible)
              .map((item) => (
                <Link
                  key={item.id}
                  to={item.url}
                  className={`font-bold text-gray-700 hover:text-green-600 transition-colors relative ${
                    location.pathname === item.url ? 'text-green-600' : ''
                  }`}
                >
                  {item.label}
                  {location.pathname === item.url && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-lime-500 rounded-full"></div>
                  )}
                </Link>
              ))}
            <Link
              to="/contact"
              className={`font-semibold hover:opacity-80 transition-opacity ${
                location.pathname === '/contact' ? 'opacity-100 underline' : 'opacity-90'
              }`}
            >
              تواصل معنا
            </Link>
          </nav>

          {/* زر القائمة - الموبايل */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden ${settings.logo_position === 'left' ? 'order-2' : 'order-3'}`}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* القائمة - الموبايل */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-current/20">
            <nav className="flex flex-col gap-4">
              {sortedMenuItems
                .filter(item => item.is_visible)
                .map((item) => (
                  <Link
                    key={item.id}
                    to={item.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-semibold hover:opacity-80 transition-opacity ${
                      location.pathname === item.url ? 'opacity-100 underline' : 'opacity-90'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-semibold hover:opacity-80 transition-opacity ${
                  location.pathname === '/contact' ? 'opacity-100 underline' : 'opacity-90'
                }`}
              >
                تواصل معنا
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default HeaderNew

