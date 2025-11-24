import React, { useState } from 'react'
import { useAuth } from '@/contexts/SimpleAuthContext'
import { useNavigate } from 'react-router-dom'
import {
  Home, Settings, Users, ShoppingCart, FileText,
  BarChart3, LogOut, Coffee, Layout, Sliders,
  BookOpen, UserCircle, Mail, Type, Globe, MessageSquare
} from 'lucide-react'

// استيراد المكونات الحديثة فقط
import AdvancedHomePageManager from '@/components/dashboard/AdvancedHomePageManager'
import HeaderSettingsManager from '@/components/dashboard/HeaderSettingsManager'
import FooterManager from '@/components/dashboard/FooterManager'
import ProductsManager from '@/components/dashboard/ProductsManager'
import CategoriesManager from '@/components/dashboard/CategoriesManager'
import BlogManager from '@/components/dashboard/BlogManager'
import AboutPageManager from '@/components/dashboard/AboutPageManager'
import ContactPageManager from '@/components/dashboard/ContactPageManager'
import ReviewsManager from '@/components/dashboard/ReviewsManager'
import UsersManager from '@/components/dashboard/UsersManager'
import SiteSettingsManager from '@/components/dashboard/SiteSettingsManager'
import AnalyticsManager from '@/components/dashboard/AnalyticsManager'
import OrdersManager from '@/components/dashboard/OrdersManager'

type TabType = 'analytics' | 'header' | 'footer' | 'homepage' | 'products' | 'categories' | 'orders' | 'blog' | 'about' | 'contact' | 'reviews' | 'users' | 'settings'

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('analytics')
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin')
  }

  const tabs = [
    { id: 'analytics' as TabType, label: 'لوحة المعلومات', icon: BarChart3 },
    { id: 'orders' as TabType, label: 'الطلبات', icon: ShoppingCart },
    { id: 'products' as TabType, label: 'المنتجات', icon: Coffee },
    { id: 'categories' as TabType, label: 'التصنيفات', icon: FileText },
    { id: 'users' as TabType, label: 'المستخدمين', icon: Users },
    { id: 'reviews' as TabType, label: 'التقييمات', icon: MessageSquare },
    { id: 'blog' as TabType, label: 'المقالات', icon: BookOpen },
    { id: 'homepage' as TabType, label: 'الصفحة الرئيسية', icon: Home },
    { id: 'header' as TabType, label: 'الهيدر (Header)', icon: Layout },
    { id: 'footer' as TabType, label: 'الفوتر (Footer)', icon: Layout },
    { id: 'about' as TabType, label: 'من نحن', icon: UserCircle },
    { id: 'contact' as TabType, label: 'تواصل معنا', icon: Mail },
    { id: 'settings' as TabType, label: 'الإعدادات العامة', icon: Settings },
  ]

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'analytics':
        return <AnalyticsManager />
      case 'orders':
        return <OrdersManager />
      case 'products':
        return <ProductsManager />
      case 'categories':
        return <CategoriesManager />
      case 'users':
        return <UsersManager />
      case 'reviews':
        return <ReviewsManager />
      case 'blog':
        return <BlogManager />
      case 'homepage':
        return <AdvancedHomePageManager />
      case 'header':
        return <HeaderSettingsManager />
      case 'footer':
        return <FooterManager />
      case 'about':
        return <AboutPageManager />
      case 'contact':
        return <ContactPageManager />
      case 'settings':
        return <SiteSettingsManager />
      default:
        return <AnalyticsManager />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* الشريط الجانبي */}
      <div className="w-72 bg-white shadow-xl flex flex-col h-screen sticky top-0 z-50">
        {/* شعار لوحة الإدارة */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Coffee className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Juicetry</h2>
              <p className="text-xs text-gray-500">لوحة التحكم</p>
            </div>
          </div>
        </div>

        {/* قائمة التبويبات */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right transition-all duration-200 ${activeTab === tab.id
                  ? 'bg-green-50 text-green-700 font-bold shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? 'text-green-600' : 'text-gray-400'
                }`} />
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <div className="mr-auto w-1.5 h-1.5 rounded-full bg-green-500"></div>
              )}
            </button>
          ))}
        </nav>

        {/* معلومات المستخدم وتسجيل الخروج */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{user?.email}</p>
              <p className="text-xs text-gray-500">مدير النظام</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-semibold"
          >
            <LogOut className="h-4 w-4" />
            تسجيل الخروج
          </button>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* رأس الصفحة */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">
                {tabs.find(tab => tab.id === activeTab)?.label}
              </h1>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              النظام متصل
            </div>
          </div>
        </header>

        {/* محتوى التبويب */}
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            {renderActiveTab()}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard