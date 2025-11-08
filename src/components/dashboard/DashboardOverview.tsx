import React, { useEffect, useState } from 'react'
import { dataService } from '@/lib/dataService'
import { 
  ShoppingCart, Users, Star, TrendingUp, 
  Package, FileText, MessageSquare, Eye,
  DollarSign, Clock, CheckCircle, AlertCircle
} from 'lucide-react'

interface DashboardStats {
  totalProducts: number
  totalCategories: number
  totalOrders: number
  totalCustomers: number
  totalReviews: number
  totalRevenue: number
  pendingOrders: number
  completedOrders: number
}

const DashboardOverview: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalReviews: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0
  })
  const [loading, setLoading] = useState(true)
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [topProducts, setTopProducts] = useState<any[]>([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch basic counts using dataService
      const [
        productsResult,
        categoriesResult,
        ordersResult,
        usersResult,
        reviewsResult
      ] = await Promise.all([
        dataService.getProducts(),
        dataService.getCategories(),
        dataService.getOrders(),
        dataService.getUsers(),
        dataService.getReviews()
      ])

      // Calculate revenue and order stats
      const orders = ordersResult.data || []
      const totalRevenue = orders.reduce((sum: number, order: any) => sum + (order.total_amount || 0), 0)
      const pendingOrders = orders.filter((order: any) => order.status === 'pending').length
      const completedOrders = orders.filter((order: any) => order.status === 'delivered').length

      setStats({
        totalProducts: productsResult.data?.length || 0,
        totalCategories: categoriesResult.data?.length || 0,
        totalOrders: ordersResult.data?.length || 0,
        totalCustomers: usersResult.data?.length || 0,
        totalReviews: reviewsResult.data?.length || 0,
        totalRevenue,
        pendingOrders,
        completedOrders
      })

      // Set recent orders (last 5)
      const recentOrdersData = orders.slice(0, 5)
      setRecentOrders(recentOrdersData)

      // Set top products (featured products)
      const products = productsResult.data || []
      const topProductsData = products.filter((p: any) => p.is_active).slice(0, 5)
      setTopProducts(topProductsData)

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'إجمالي المنتجات',
      value: stats.totalProducts,
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      title: 'إجمالي التصنيفات',
      value: stats.totalCategories,
      icon: FileText,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    },
    {
      title: 'إجمالي الطلبات',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100'
    },
    {
      title: 'إجمالي العملاء',
      value: stats.totalCustomers,
      icon: Users,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100'
    },
    {
      title: 'إجمالي الآراء',
      value: stats.totalReviews,
      icon: Star,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'from-yellow-50 to-yellow-100'
    },
    {
      title: 'إجمالي الإيرادات',
      value: `${stats.totalRevenue.toFixed(2)} ريال`,
      icon: DollarSign,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'from-emerald-50 to-emerald-100'
    },
    {
      title: 'الطلبات المعلقة',
      value: stats.pendingOrders,
      icon: Clock,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'from-amber-50 to-amber-100'
    },
    {
      title: 'الطلبات المكتملة',
      value: stats.completedOrders,
      icon: CheckCircle,
      color: 'from-teal-500 to-teal-600',
      bgColor: 'from-teal-50 to-teal-100'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'preparing': return 'bg-purple-100 text-purple-800'
      case 'ready': return 'bg-green-100 text-green-800'
      case 'delivered': return 'bg-emerald-100 text-emerald-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'في الانتظار'
      case 'confirmed': return 'مؤكد'
      case 'preparing': return 'قيد التحضير'
      case 'ready': return 'جاهز'
      case 'delivered': return 'تم التسليم'
      case 'cancelled': return 'ملغي'
      default: return status
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="loading-spinner"></div>
          <p className="mr-4 text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8">
      {/* Welcome Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">مرحباً بك في لوحة إدارة Juicetry</h1>
        <p className="text-xl text-gray-600">نظرة شاملة على أداء متجرك</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${card.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              </div>
              <div className={`p-3 bg-gradient-to-br ${card.color} rounded-xl shadow-lg`}>
                <card.icon className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">أحدث الطلبات</h3>
            <ShoppingCart className="h-6 w-6 text-green-600" />
          </div>
          
          <div className="space-y-4">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-semibold text-gray-900">#{order.order_number}</p>
                    <p className="text-sm text-gray-600">{order.profiles?.full_name || 'عميل'}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.created_at).toLocaleDateString('ar-SA')}
                    </p>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900">{order.total_amount} ريال</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">لا توجد طلبات حالياً</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">المنتجات المميزة</h3>
            <TrendingUp className="h-6 w-6 text-blue-600" />
          </div>
          
          <div className="space-y-4">
            {topProducts.length > 0 ? (
              topProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-semibold text-gray-900">{product.name}</p>
                    <p className="text-sm text-green-600 font-medium">{product.price} ريال</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.is_featured && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">
                        مميز
                      </span>
                    )}
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">لا توجد منتجات مميزة</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-green-50 to-lime-50 rounded-2xl p-8 border border-green-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">إجراءات سريعة</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="p-2 bg-green-100 rounded-lg">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <span className="font-semibold text-gray-900">إضافة منتج جديد</span>
          </button>
          
          <button className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <span className="font-semibold text-gray-900">إضافة تصنيف جديد</span>
          </button>
          
          <button className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
            <span className="font-semibold text-gray-900">عرض الموقع</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DashboardOverview
