import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { 
  Home, Settings, Users, ShoppingCart, FileText, 
  BarChart3, LogOut, Coffee, Image, Palette, 
  Layout, Sliders, BookOpen, UserCircle, Mail, 
  Type, Globe
} from 'lucide-react'
import HomepageManagementTab from '@/components/dashboard/HomepageManagementTab'
import HeaderManagementTab from '@/components/dashboard/HeaderManagementTab'
import SliderManagementTab from '@/components/dashboard/SliderManagementTab'
import ProductsTab from '@/components/dashboard/ProductsTab'
import CategoriesTab from '@/components/dashboard/CategoriesTab'
import BlogManagementTab from '@/components/dashboard/BlogManagementTab'
import AboutManagementTab from '@/components/dashboard/AboutManagementTab'
import ContactManagementTab from '@/components/dashboard/ContactManagementTab'
import ReviewsTab from '@/components/dashboard/ReviewsTab'
import FontsManagementTab from '@/components/dashboard/FontsManagementTab'
import SEOManagementTab from '@/components/dashboard/SEOManagementTab'
import UsersManagementTab from '@/components/dashboard/UsersManagementTab'
import SettingsTab from '@/components/dashboard/SettingsTab'

type TabType = 'header' | 'slider' | 'homepage' | 'products' | 'categories' | 'blog' | 'about' | 'contact' | 'reviews' | 'settings' | 'seo' | 'fonts' | 'users'

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('header')
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin')
  }

  const tabs = [
    { id: 'header' as TabType, label: 'إدارة الهيدر', icon: Layout },
    { id: 'slider' as TabType, label: 'إدارة السلايدر', icon: Sliders },
    { id: 'homepage' as TabType, label: 'إدارة الصفحة الرئيسية', icon: Home },
    { id: 'products' as TabType, label: 'المنتجات', icon: ShoppingCart },
    { id: 'categories' as TabType, label: 'التصنيفات', icon: FileText },
    { id: 'blog' as TabType, label: 'المقالات', icon: BookOpen },
    { id: 'about' as TabType, label: 'صفحة من نحن', icon: UserCircle },
    { id: 'contact' as TabType, label: 'صفحة التواصل', icon: Mail },
    { id: 'reviews' as TabType, label: 'آراء العملاء', icon: Users },
    { id: 'fonts' as TabType, label: 'إدارة الخطوط', icon: Type },
    { id: 'seo' as TabType, label: 'إعدادات SEO', icon: Globe },
    { id: 'users' as TabType, label: 'المستخدمين', icon: Users },
    { id: 'settings' as TabType, label: 'الإعدادات العامة', icon: Settings },
  ]

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'header':
        return <HeaderManagementTab />
      case 'slider':
        return <SliderManagementTab />
      case 'homepage':
        return <HomepageManagementTab />
      case 'products':
        return <ProductsTab />
      case 'categories':
        return <CategoriesTab />
      case 'blog':
        return <BlogManagementTab />
      case 'about':
        return <AboutManagementTab />
      case 'contact':
        return <ContactManagementTab />
      case 'reviews':
        return <ReviewsTab />
      case 'fonts':
        return <FontsManagementTab />
      case 'seo':
        return <SEOManagementTab />
      case 'users':
        return <UsersManagementTab />
      case 'settings':
        return <SettingsTab />
      default:
        return <HeaderManagementTab />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* الشريط الجانبي */}
      <div className="w-72 bg-white/95 backdrop-blur-sm shadow-2xl flex flex-col h-screen sticky top-0 border-r border-gray-200/50">
        {/* شعار لوحة الإدارة */}
        <div className="p-6 border-b border-gray-200/50 bg-gradient-to-r from-juicetry-primary/10 to-juicetry-coral/10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-juicetry-primary to-juicetry-coral rounded-xl shadow-lg">
              <Coffee className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-juicetry-dark to-juicetry-purple bg-clip-text text-transparent">جوستري</h2>
              <p className="text-sm text-juicetry-gray font-medium">لوحة الإدارة المتقدمة</p>
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
                    ? 'bg-gradient-to-r from-juicetry-primary to-juicetry-coral text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:shadow-md hover:scale-102'
                }`}
              >
                <div className={`p-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-white/20 shadow-inner' 
                    : 'bg-gray-100 group-hover:bg-white group-hover:shadow-sm'
                }`}>
                  <tab.icon className={`h-5 w-5 transition-all duration-300 ${
                    activeTab === tab.id ? 'text-white' : 'text-juicetry-gray group-hover:text-juicetry-purple'
                  }`} />
                </div>
                <span className={`font-semibold transition-all duration-300 ${
                  activeTab === tab.id ? 'text-white' : 'group-hover:text-juicetry-dark'
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
            <div className="w-12 h-12 bg-gradient-to-br from-juicetry-purple to-juicetry-teal rounded-xl flex items-center justify-center shadow-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="text-sm">
              <p className="font-bold text-juicetry-dark">{user?.email}</p>
              <p className="text-juicetry-gray font-medium">مدير النظام</p>
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
              <div className="p-3 bg-gradient-to-br from-juicetry-primary/20 to-juicetry-coral/20 rounded-xl">
                {tabs.find(tab => tab.id === activeTab)?.icon && 
                  React.createElement(tabs.find(tab => tab.id === activeTab)!.icon, {
                    className: "h-8 w-8 text-juicetry-purple"
                  })
                }
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-juicetry-dark to-juicetry-purple bg-clip-text text-transparent">
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </h1>
                <p className="text-juicetry-gray font-medium mt-1">إدارة وتحكم شامل</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-gradient-to-r from-green-100 to-green-200 text-green-800 rounded-full text-sm font-semibold">
                متصل
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </header>

        {/* محتوى التبويب */}
        <main className="flex-1 overflow-auto bg-gradient-to-br from-gray-50/50 to-white/50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
              {renderActiveTab()}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard