import React, { useState } from 'react'
import { useAuth } from '@/contexts/SimpleAuthContext'
import { useNavigate } from 'react-router-dom'
import { 
  Home, Settings, Users, ShoppingCart, FileText, 
  BarChart3, LogOut, Coffee, Package, Star, Layout
} from 'lucide-react'
import LoadingSpinner from '@/components/LoadingSpinner'

type TabType = 'overview' | 'products' | 'categories' | 'settings'

const SimpleDashboard: React.FC = () => {
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
    { id: 'overview' as TabType, label: 'نظرة عامة', icon: BarChart3 },
    { id: 'products' as TabType, label: 'المنتجات', icon: Package },
    { id: 'categories' as TabType, label: 'التصنيفات', icon: FileText },
    { id: 'settings' as TabType, label: 'الإعدادات', icon: Settings },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">نظرة عامة</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 font-semibold">المنتجات</p>
                    <p className="text-2xl font-bold text-blue-900">25</p>
                  </div>
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 font-semibold">التصنيفات</p>
                    <p className="text-2xl font-bold text-green-900">8</p>
                  </div>
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 font-semibold">الطلبات</p>
                    <p className="text-2xl font-bold text-purple-900">12</p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'products':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">إدارة المنتجات</h2>
            <div className="bg-white rounded-lg border p-8 text-center">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">قسم إدارة المنتجات قيد التطوير</p>
            </div>
          </div>
        )
      
      case 'categories':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">إدارة التصنيفات</h2>
            <div className="bg-white rounded-lg border p-8 text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">قسم إدارة التصنيفات قيد التطوير</p>
            </div>
          </div>
        )
      
      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">الإعدادات</h2>
            <div className="bg-white rounded-lg border p-8 text-center">
              <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">قسم الإعدادات قيد التطوير</p>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner message="جاري التحميل..." />
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-red-800 mb-2">غير مصرح</h1>
          <p className="text-red-600 mb-4">ليس لديك صلاحية للوصول إلى لوحة الإدارة</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500 rounded-lg">
              <Coffee className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Juicetry</h2>
              <p className="text-sm text-gray-600">لوحة الإدارة</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right transition-colors ${
                  activeTab === tab.id
                    ? 'bg-green-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-white" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">{user.full_name || user.email}</p>
              <p className="text-green-600">مدير</p>
            </div>
          </div>
          
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            تسجيل الخروج
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h1>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                متصل
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default SimpleDashboard
