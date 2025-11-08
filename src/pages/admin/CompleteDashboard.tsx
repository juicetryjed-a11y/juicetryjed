import React, { useState } from 'react'
import { useAuth } from '@/contexts/NewAuthContext'
import { useNavigate } from 'react-router-dom'
import { 
  Home, Settings, Users, ShoppingCart, FileText, 
  BarChart3, LogOut, Coffee, Image, Palette, 
  Layout, Sliders, BookOpen, UserCircle, Mail, 
  Type, Globe, Star, MessageSquare, Plus, Edit, Trash2, Eye, EyeOff
} from 'lucide-react'

// Import dashboard components
import DashboardOverview from '@/components/dashboard/DashboardOverview'
import ProductsManagement from '@/components/dashboard/ProductsManagement'
import CategoriesManagement from '@/components/dashboard/CategoriesManagement'
import OrdersManagement from '@/components/dashboard/OrdersManagement'
import UsersManagement from '@/components/dashboard/UsersManagement'
import ReviewsManagement from '@/components/dashboard/ReviewsManagement'
import BlogManagement from '@/components/dashboard/BlogManagement'
import SiteSettings from '@/components/dashboard/SiteSettings'
import HeaderSettings from '@/components/dashboard/HeaderSettings'
import SliderSettings from '@/components/dashboard/SliderSettings'
import ContactSettings from '@/components/dashboard/ContactSettings'
import AboutSettings from '@/components/dashboard/AboutSettings'

type TabType = 'overview' | 'products' | 'categories' | 'orders' | 'users' | 'reviews' | 'blog' | 'site-settings' | 'header' | 'slider' | 'contact' | 'about'

const CompleteDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const { user, profile, signOut, isAdmin } = useAuth()
  const navigate = useNavigate()

  // Redirect if not admin
  React.useEffect(() => {
    if (!isAdmin && profile) {
      navigate('/')
    }
  }, [isAdmin, profile, navigate])

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  const tabs = [
    { id: 'overview' as TabType, label: 'نظرة عامة', icon: BarChart3, color: 'text-blue-600' },
    { id: 'products' as TabType, label: 'المنتجات', icon: ShoppingCart, color: 'text-green-600' },
    { id: 'categories' as TabType, label: 'التصنيفات', icon: FileText, color: 'text-purple-600' },
    { id: 'orders' as TabType, label: 'الطلبات', icon: ShoppingCart, color: 'text-orange-600' },
    { id: 'users' as TabType, label: 'المستخدمون', icon: Users, color: 'text-indigo-600' },
    { id: 'reviews' as TabType, label: 'آراء العملاء', icon: Star, color: 'text-yellow-600' },
    { id: 'blog' as TabType, label: 'المقالات', icon: BookOpen, color: 'text-pink-600' },
    { id: 'site-settings' as TabType, label: 'إعدادات الموقع', icon: Settings, color: 'text-gray-600' },
    { id: 'header' as TabType, label: 'إعدادات الهيدر', icon: Layout, color: 'text-teal-600' },
    { id: 'slider' as TabType, label: 'إعدادات السلايدر', icon: Sliders, color: 'text-red-600' },
    { id: 'contact' as TabType, label: 'صفحة التواصل', icon: Mail, color: 'text-cyan-600' },
    { id: 'about' as TabType, label: 'صفحة من نحن', icon: UserCircle, color: 'text-emerald-600' },
  ]

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />
      case 'products':
        return <ProductsManagement />
      case 'categories':
        return <CategoriesManagement />
      case 'orders':
        return <OrdersManagement />
      case 'users':
        return <UsersManagement />
      case 'reviews':
        return <ReviewsManagement />
      case 'blog':
        return <BlogManagement />
      case 'site-settings':
        return <SiteSettings />
      case 'header':
        return <HeaderSettings />
      case 'slider':
        return <SliderSettings />
      case 'contact':
        return <ContactSettings />
      case 'about':
        return <AboutSettings />
      default:
        return <DashboardOverview />
    }
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-red-800 mb-2">غير مصرح</h1>
          <p className="text-red-600 mb-4">ليس لديك صلاحية للوصول إلى لوحة الإدارة</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* الشريط الجانبي */}
      <div className="w-80 bg-white/95 backdrop-blur-sm shadow-2xl flex flex-col h-screen sticky top-0 border-r border-gray-200/50">
        {/* شعار لوحة الإدارة */}
        <div className="p-6 border-b border-gray-200/50 bg-gradient-to-r from-green-50 to-lime-50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-lime-500 rounded-xl shadow-lg">
              <Coffee className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-lime-600 bg-clip-text text-transparent">
                Juicetry - جوستري
              </h2>
              <p className="text-sm text-gray-600 font-medium">لوحة الإدارة المتقدمة</p>
            </div>
          </div>
        </div>

        {/* قائمة التبويبات */}
        <nav className="p-6 flex-1 overflow-y-auto">
          <div className="space-y-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl text-right transition-all duration-300 group relative overflow-hidden ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-green-500 to-lime-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:shadow-md hover:scale-102'
                }`}
              >
                <div className={`p-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-white/20 shadow-inner' 
                    : 'bg-gray-100 group-hover:bg-white group-hover:shadow-sm'
                }`}>
                  <tab.icon className={`h-5 w-5 transition-all duration-300 ${
                    activeTab === tab.id ? 'text-white' : `${tab.color} group-hover:text-green-600`
                  }`} />
                </div>
                <span className={`font-semibold transition-all duration-300 ${
                  activeTab === tab.id ? 'text-white' : 'group-hover:text-gray-900'
                }`}>
                  {tab.label}
                </span>
                {activeTab === tab.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"></div>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* معلومات المستخدم وتسجيل الخروج */}
        <div className="p-6 border-t border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-white/50">
          <div className="flex items-center gap-4 mb-4 p-3 bg-white/80 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-lime-500 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="text-sm">
              <p className="font-bold text-gray-900">{profile.full_name || user?.email}</p>
              <p className="text-green-600 font-medium">مدير النظام</p>
            </div>
          </div>
          
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 text-red-600 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 rounded-xl transition-all duration-300 font-semibold border-2 border-red-200 hover:border-red-500 hover:shadow-lg hover:scale-105"
          >
            <LogOut className="h-5 w-5" />
            تسجيل الخروج
          </button>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="flex-1 flex flex-col">
        {/* رأس الصفحة */}
        <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200/50 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-green-100 to-lime-100 rounded-xl">
                {tabs.find(tab => tab.id === activeTab)?.icon && 
                  React.createElement(tabs.find(tab => tab.id === activeTab)!.icon, {
                    className: `h-8 w-8 ${tabs.find(tab => tab.id === activeTab)?.color}`
                  })
                }
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </h1>
                <p className="text-gray-600 font-medium mt-1">إدارة وتحكم شامل</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-gradient-to-r from-green-100 to-lime-100 text-green-800 rounded-full text-sm font-semibold">
                متصل
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </header>

        {/* محتوى التبويب */}
        <main className="flex-1 overflow-auto bg-gradient-to-br from-gray-50/50 to-white/50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden min-h-[600px]">
              {renderActiveTab()}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default CompleteDashboard
