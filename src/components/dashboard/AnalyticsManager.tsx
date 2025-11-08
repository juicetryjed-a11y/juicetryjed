import React, { useState, useEffect } from 'react'
import { dataService } from '@/lib/dataService'
import { 
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingBag,
  ShoppingCart,
  DollarSign,
  Package,
  Star,
  Calendar,
  ArrowUp,
  ArrowDown,
  FileText,
  Eye,
  Heart,
  BarChart3
} from 'lucide-react'

interface AnalyticsData {
  totalRevenue: number
  totalOrders: number
  totalCustomers: number
  totalProducts: number
  averageOrderValue: number
  conversionRate: number
  customerRetentionRate: number
  topSellingProducts: Array<{
    id: number
    name: string
    sales: number
    revenue: number
  }>
  recentOrders: Array<{
    id: number
    customer_name: string
    total_amount: number
    status: string
    created_at: string
  }>
  monthlyRevenue: Array<{
    month: string
    revenue: number
    orders: number
  }>
  categoryPerformance: Array<{
    name: string
    sales: number
    revenue: number
    color: string
  }>
  customerGrowth: Array<{
    month: string
    new_customers: number
    total_customers: number
  }>
  reviewsStats: {
    total: number
    average_rating: number
    distribution: { [key: number]: number }
  }
  blogStats: {
    total_posts: number
    total_views: number
    total_likes: number
    popular_posts: Array<{
      title: string
      views: number
      likes: number
    }>
  }
}

const AnalyticsManager: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(false)
  const [dateRange, setDateRange] = useState('30') // days
  const [activeTab, setActiveTab] = useState<'overview' | 'sales' | 'customers' | 'products' | 'content'>('overview')

  const dateRangeOptions = [
    { value: '7', label: 'آخر 7 أيام' },
    { value: '30', label: 'آخر 30 يوم' },
    { value: '90', label: 'آخر 3 أشهر' },
    { value: '365', label: 'آخر سنة' }
  ]

  useEffect(() => {
    loadAnalytics()
  }, [dateRange])

  const loadAnalytics = async () => {
    setLoading(true)
    try {
      const endDate = new Date()
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - parseInt(dateRange))

      // Load basic stats
      const [
        ordersResult,
        customersResult,
        productsResult,
        reviewsResult,
        blogResult
      ] = await Promise.all([
        dataService.getOrders(),
        dataService.getUsers(),
        dataService.getProducts(),
        dataService.getReviews(),
        dataService.getBlogPosts()
      ])

      const orders = ordersResult.data || []
      const customers = customersResult.data || []
      const products = productsResult.data || []
      const reviews = reviewsResult.data || []
      const blogPosts = blogResult.data || []

      // Calculate analytics
      const deliveredOrders = orders.filter(o => o.status === 'delivered')
      const totalRevenue = deliveredOrders.reduce((sum, order) => sum + order.total_amount, 0)
      const averageOrderValue = deliveredOrders.length > 0 ? totalRevenue / deliveredOrders.length : 0

      // Reviews stats
      const averageRating = reviews.length > 0 
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
        : 0

      const ratingDistribution = reviews.reduce((acc, review) => {
        acc[review.rating] = (acc[review.rating] || 0) + 1
        return acc
      }, {} as { [key: number]: number })

      // Blog stats
      const totalViews = blogPosts.reduce((sum, post) => sum + (post.views || 0), 0)
      const totalLikes = blogPosts.reduce((sum, post) => sum + (post.likes || 0), 0)

      // Top selling products (mock data for now)
      const topSellingProducts = products.slice(0, 5).map((product, index) => ({
        id: product.id,
        name: product.name,
        sales: Math.floor(Math.random() * 100) + 10,
        revenue: Math.floor(Math.random() * 5000) + 500
      }))

      // Monthly revenue (mock data)
      const monthlyRevenue = Array.from({ length: 6 }, (_, i) => {
        const date = new Date()
        date.setMonth(date.getMonth() - i)
        return {
          month: date.toLocaleDateString('ar-SA', { month: 'short', year: 'numeric' }),
          revenue: Math.floor(Math.random() * 10000) + 2000,
          orders: Math.floor(Math.random() * 50) + 10
        }
      }).reverse()

      // Category performance (mock data)
      const categoryPerformance = [
        { name: 'عصائر الحمضيات', sales: 45, revenue: 3200, color: '#f97316' },
        { name: 'عصائر استوائية', sales: 38, revenue: 2800, color: '#eab308' },
        { name: 'عصائر التوت', sales: 32, revenue: 2400, color: '#ef4444' },
        { name: 'عصائر الخضروات', sales: 25, revenue: 1800, color: '#22c55e' },
        { name: 'سموثي طبيعي', sales: 28, revenue: 2100, color: '#8b5cf6' }
      ]

      // Customer growth (mock data)
      const customerGrowth = Array.from({ length: 6 }, (_, i) => {
        const date = new Date()
        date.setMonth(date.getMonth() - i)
        return {
          month: date.toLocaleDateString('ar-SA', { month: 'short' }),
          new_customers: Math.floor(Math.random() * 20) + 5,
          total_customers: customers.length - (i * 10)
        }
      }).reverse()

      const analyticsData: AnalyticsData = {
        totalRevenue,
        totalOrders: orders.length,
        totalCustomers: customers.length,
        totalProducts: products.length,
        averageOrderValue,
        conversionRate: customers.length > 0 ? (orders.length / customers.length) * 100 : 0,
        customerRetentionRate: 75, // Mock data
        topSellingProducts,
        recentOrders: orders.slice(0, 5),
        monthlyRevenue,
        categoryPerformance,
        customerGrowth,
        reviewsStats: {
          total: reviews.length,
          average_rating: averageRating,
          distribution: ratingDistribution
        },
        blogStats: {
          total_posts: blogPosts.length,
          total_views: totalViews,
          total_likes: totalLikes,
          popular_posts: blogPosts
            .sort((a, b) => (b.views || 0) - (a.views || 0))
            .slice(0, 3)
            .map(post => ({
              title: post.title,
              views: post.views || 0,
              likes: post.likes || 0
            }))
        }
      }

      setAnalytics(analyticsData)
    } catch (error) {
      console.error('Error loading analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ar-SA').format(num)
  }

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 font-semibold">إجمالي الإيرادات</p>
              <p className="text-3xl font-bold">{formatCurrency(analytics?.totalRevenue || 0)}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">+12.5%</span>
              </div>
            </div>
            <DollarSign className="h-12 w-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 font-semibold">إجمالي الطلبات</p>
              <p className="text-3xl font-bold">{formatNumber(analytics?.totalOrders || 0)}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">+8.3%</span>
              </div>
            </div>
            <ShoppingCart className="h-12 w-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 font-semibold">إجمالي العملاء</p>
              <p className="text-3xl font-bold">{formatNumber(analytics?.totalCustomers || 0)}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">+15.7%</span>
              </div>
            </div>
            <Users className="h-12 w-12 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 font-semibold">متوسط قيمة الطلب</p>
              <p className="text-3xl font-bold">{formatCurrency(analytics?.averageOrderValue || 0)}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown className="h-4 w-4" />
                <span className="text-sm">-2.1%</span>
              </div>
            </div>
            <BarChart3 className="h-12 w-12 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">الإيرادات الشهرية</h3>
          <div className="space-y-3">
            {analytics?.monthlyRevenue.map((month, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">{month.month}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-lime-500 h-2 rounded-full"
                      style={{ width: `${(month.revenue / 10000) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900 w-20 text-left">
                    {formatCurrency(month.revenue)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">أفضل المنتجات مبيعاً</h3>
          <div className="space-y-3">
            {analytics?.topSellingProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sales} مبيعة</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="font-bold text-green-600">{formatCurrency(product.revenue)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderSalesTab = () => (
    <div className="space-y-6">
      {/* Sales Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">معدل التحويل</h3>
            <TrendingUp className="h-6 w-6 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">
            {analytics?.conversionRate.toFixed(1)}%
          </div>
          <p className="text-sm text-gray-600">من الزوار إلى عملاء</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">معدل الاحتفاظ</h3>
            <Users className="h-6 w-6 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {analytics?.customerRetentionRate}%
          </div>
          <p className="text-sm text-gray-600">العملاء العائدون</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">متوسط التقييم</h3>
            <Star className="h-6 w-6 text-yellow-500" />
          </div>
          <div className="text-3xl font-bold text-yellow-600 mb-2">
            {analytics?.reviewsStats.average_rating.toFixed(1)}
          </div>
          <p className="text-sm text-gray-600">من {analytics?.reviewsStats.total} مراجعة</p>
        </div>
      </div>

      {/* Category Performance */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">أداء التصنيفات</h3>
        <div className="space-y-4">
          {analytics?.categoryPerformance.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: category.color }}
                ></div>
                <span className="font-medium text-gray-900">{category.name}</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{category.sales} مبيعة</p>
                  <p className="text-xs text-gray-600">{formatCurrency(category.revenue)}</p>
                </div>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full"
                    style={{ 
                      backgroundColor: category.color,
                      width: `${(category.sales / 50) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderCustomersTab = () => (
    <div className="space-y-6">
      {/* Customer Growth */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">نمو العملاء</h3>
        <div className="space-y-4">
          {analytics?.customerGrowth.map((month, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-900">{month.month}</span>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-600">+{month.new_customers} جديد</p>
                  <p className="text-xs text-gray-600">{month.total_customers} إجمالي</p>
                </div>
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-lime-500 h-2 rounded-full"
                    style={{ width: `${(month.new_customers / 25) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">أحدث الطلبات</h3>
        <div className="space-y-3">
          {analytics?.recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">{order.customer_name}</p>
                <p className="text-sm text-gray-600">
                  {new Date(order.created_at).toLocaleDateString('ar-SA')}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">{formatCurrency(order.total_amount)}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderContentTab = () => (
    <div className="space-y-6">
      {/* Blog Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">إجمالي المقالات</h3>
            <FileText className="h-6 w-6 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {analytics?.blogStats.total_posts}
          </div>
          <p className="text-sm text-gray-600">مقال منشور</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">إجمالي المشاهدات</h3>
            <Eye className="h-6 w-6 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">
            {formatNumber(analytics?.blogStats.total_views || 0)}
          </div>
          <p className="text-sm text-gray-600">مشاهدة</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">إجمالي الإعجابات</h3>
            <Heart className="h-6 w-6 text-red-500" />
          </div>
          <div className="text-3xl font-bold text-red-600 mb-2">
            {formatNumber(analytics?.blogStats.total_likes || 0)}
          </div>
          <p className="text-sm text-gray-600">إعجاب</p>
        </div>
      </div>

      {/* Popular Posts */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">المقالات الأكثر شعبية</h3>
        <div className="space-y-4">
          {analytics?.blogStats.popular_posts.map((post, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 line-clamp-1">{post.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {formatNumber(post.views)}
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  {formatNumber(post.likes)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Distribution */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">توزيع التقييمات</h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-4">
              <div className="flex items-center gap-1 w-16">
                <span className="text-sm font-medium">{rating}</span>
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ 
                    width: `${((analytics?.reviewsStats.distribution[rating] || 0) / (analytics?.reviewsStats.total || 1)) * 100}%`
                  }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">
                {analytics?.reviewsStats.distribution[rating] || 0}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const tabs = [
    { id: 'overview' as const, label: 'نظرة عامة', icon: BarChart3 },
    { id: 'sales' as const, label: 'المبيعات', icon: TrendingUp },
    { id: 'customers' as const, label: 'العملاء', icon: Users },
    { id: 'content' as const, label: 'المحتوى', icon: FileText }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab()
      case 'sales':
        return renderSalesTab()
      case 'customers':
        return renderCustomersTab()
      case 'content':
        return renderContentTab()
      default:
        return renderOverviewTab()
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">التحليلات والإحصائيات</h2>
          <p className="text-gray-600 mt-1">تحليل شامل لأداء المتجر</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
          >
            {dateRangeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            onClick={loadAnalytics}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <Calendar className="h-4 w-4" />
            تحديث
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-green-50 text-green-600 border-b-2 border-green-500'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  )
}

export default AnalyticsManager
