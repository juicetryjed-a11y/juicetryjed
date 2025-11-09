import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/SimpleAuthContext'
import { useNavigate } from 'react-router-dom'
import { 
  BarChart3, Package, FileText, ShoppingCart, Users, Star, 
  Settings, Layout, Sliders, Mail, UserCircle, LogOut, Coffee,
  Plus, Edit, Trash2, Eye, Search, Filter, Calendar, TrendingUp
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import SimpleProductsManager from './SimpleProductsManager'
import SimpleCategoriesManager from './SimpleCategoriesManager'
import OrdersManager from './OrdersManager'
import CustomersManager from './CustomersManager'
import ReviewsManager from './ReviewsManager'
import SimpleBlogManager from './SimpleBlogManager'
import SiteSettingsManager from './SiteSettingsManager'
import AnalyticsManager from './AnalyticsManager'
import HeaderSettingsManager from './HeaderSettingsManager'
import UsersManager from './UsersManager'
import AboutPageManager from './AboutPageManager'
import DataResetManager from './DataResetManager'
import ContactPageManager from './ContactPageManager'
import HomePageManager from './HomePageManager'

type TabType = 'overview' | 'analytics' | 'products' | 'categories' | 'orders' | 'customers' | 'reviews' | 'blog' | 'settings' | 'header' | 'users' | 'slider' | 'contact' | 'about' | 'home' | 'reset'

interface Product {
  id: number
  name: string
  price: number
  category_id: number
  description: string
  image_url?: string
  is_active: boolean
  created_at: string
}

interface Category {
  id: number
  name: string
  description?: string
  color: string
  icon: string
  is_active: boolean
  order_index: number
}

interface Order {
  id: number
  customer_name: string
  customer_email: string
  customer_phone: string
  total_amount: number
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
  created_at: string
}

interface Customer {
  id: string
  full_name: string
  email: string
  phone?: string
  total_orders: number
  total_spent: number
  created_at: string
}

interface Review {
  id: number
  customer_name: string
  product_name: string
  rating: number
  comment: string
  is_approved: boolean
  created_at: string
}

interface BlogPost {
  id: number
  title: string
  content: string
  excerpt: string
  author: string
  category: string
  is_published: boolean
  views: number
  created_at: string
}

const FullDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [loading, setLoading] = useState(false)
  const { user, signOut, isAdmin } = useAuth()
  const navigate = useNavigate()

  // State for different data
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])

  // Modal states
  const [showProductModal, setShowProductModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin && user) {
      navigate('/')
    }
  }, [isAdmin, user, navigate])

  // Load data based on active tab
  useEffect(() => {
    loadData()
  }, [activeTab])

  const loadData = async () => {
    setLoading(true)
    try {
      switch (activeTab) {
        case 'overview':
          await loadOverviewData()
          break
        case 'products':
          await loadProducts()
          break
        case 'categories':
          await loadCategories()
          break
        case 'orders':
          await loadOrders()
          break
        case 'customers':
          await loadCustomers()
          break
        case 'reviews':
          await loadReviews()
          break
        case 'blog':
          await loadBlogPosts()
          break
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadOverviewData = async () => {
    // Load summary data for overview
    const [productsRes, ordersRes, customersRes, reviewsRes] = await Promise.all([
      supabase.from('products').select('*'),
      supabase.from('orders').select('*'),
      supabase.from('profiles').select('*').eq('role', 'customer'),
      supabase.from('customer_reviews').select('*')
    ])

    if (productsRes.data) setProducts(productsRes.data)
    if (ordersRes.data) setOrders(ordersRes.data)
    if (customersRes.data) setCustomers(customersRes.data)
    if (reviewsRes.data) setReviews(reviewsRes.data)
  }

  const loadProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (name)
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error loading products:', error)
    } else {
      setProducts(data || [])
    }
  }

  const loadCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Error loading categories:', error)
    } else {
      setCategories(data || [])
    }
  }

  const loadOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          quantity,
          price,
          products (name)
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error loading orders:', error)
    } else {
      setOrders(data || [])
    }
  }

  const loadCustomers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'customer')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error loading customers:', error)
    } else {
      setCustomers(data || [])
    }
  }

  const loadReviews = async () => {
    const { data, error } = await supabase
      .from('customer_reviews')
      .select(`
        *,
        products (name)
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error loading reviews:', error)
    } else {
      setReviews(data || [])
    }
  }

  const loadBlogPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error loading blog posts:', error)
    } else {
      setBlogPosts(data || [])
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  const tabs = [
    { id: 'overview' as TabType, label: 'نظرة عامة', icon: BarChart3 },
    { id: 'analytics' as TabType, label: 'التحليلات', icon: TrendingUp },
    { id: 'products' as TabType, label: 'المنتجات', icon: Package },
    { id: 'categories' as TabType, label: 'التصنيفات', icon: FileText },
    { id: 'orders' as TabType, label: 'الطلبات', icon: ShoppingCart },
    { id: 'customers' as TabType, label: 'العملاء', icon: Users },
    { id: 'users' as TabType, label: 'إدارة المستخدمين', icon: UserCircle },
    { id: 'reviews' as TabType, label: 'آراء العملاء', icon: Star },
    { id: 'blog' as TabType, label: 'المقالات', icon: FileText },
    { id: 'settings' as TabType, label: 'إعدادات الموقع', icon: Settings },
    { id: 'home' as TabType, label: 'الصفحة الرئيسية', icon: Coffee },
    { id: 'about' as TabType, label: 'صفحة من نحن', icon: UserCircle },
    { id: 'contact' as TabType, label: 'صفحة التواصل', icon: Mail },
    { id: 'header' as TabType, label: 'إعدادات الهيدر', icon: Layout },
    { id: 'slider' as TabType, label: 'إعدادات السلايدر', icon: Sliders },
    { id: 'reset' as TabType, label: 'مسح البيانات', icon: Trash2 },
  ]

  const renderOverview = () => (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">نظرة عامة</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 font-semibold">إجمالي المنتجات</p>
              <p className="text-3xl font-bold">{products.length}</p>
            </div>
            <Package className="h-12 w-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 font-semibold">إجمالي الطلبات</p>
              <p className="text-3xl font-bold">{orders.length}</p>
            </div>
            <ShoppingCart className="h-12 w-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 font-semibold">إجمالي العملاء</p>
              <p className="text-3xl font-bold">{customers.length}</p>
            </div>
            <Users className="h-12 w-12 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 font-semibold">إجمالي المراجعات</p>
              <p className="text-3xl font-bold">{reviews.length}</p>
            </div>
            <Star className="h-12 w-12 text-yellow-200" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">أحدث الطلبات</h3>
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">{order.customer_name}</p>
                  <p className="text-sm text-gray-600">{order.total_amount} ريال</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">أحدث المراجعات</h3>
          <div className="space-y-4">
            {reviews.slice(0, 5).map((review) => (
              <div key={review.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-900">{review.customer_name}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderProducts = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">إدارة المنتجات</h2>
        <button
          onClick={() => setShowProductModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg hover:shadow-lg transition-all"
        >
          <Plus className="h-5 w-5" />
          إضافة منتج جديد
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="البحث في المنتجات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
          >
            <option value="all">جميع المنتجات</option>
            <option value="active">المنتجات النشطة</option>
            <option value="inactive">المنتجات غير النشطة</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المنتج</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">السعر</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التصنيف</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products
                .filter(product => 
                  product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                  (filterStatus === 'all' || 
                   (filterStatus === 'active' && product.is_active) ||
                   (filterStatus === 'inactive' && !product.is_active))
                )
                .map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-lime-100 rounded-lg flex items-center justify-center mr-3">
                        <Package className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.price} ريال
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {categories.find(cat => cat.id === product.category_id)?.name || 'غير محدد'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      product.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.is_active ? 'نشط' : 'غير نشط'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingProduct(product)
                          setShowProductModal(true)
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      )
    }

    switch (activeTab) {
      case 'overview':
        return renderOverview()
      case 'analytics':
        return <AnalyticsManager />
      case 'products':
        return <SimpleProductsManager />
      case 'categories':
        return <SimpleCategoriesManager />
      case 'orders':
        return <OrdersManager />
      case 'customers':
        return <CustomersManager />
      case 'reviews':
        return <ReviewsManager />
      case 'blog':
        return <SimpleBlogManager />
      case 'settings':
        return <SiteSettingsManager />
      case 'home':
        return <HomePageManager />
      case 'about':
        return <AboutPageManager />
      case 'contact':
        return <ContactPageManager />
      case 'header':
        return <HeaderSettingsManager />
      case 'users':
        return <UsersManager />
      case 'reset':
        return <DataResetManager />
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{tabs.find(tab => tab.id === activeTab)?.label}</h2>
            <div className="bg-white rounded-lg border p-8 text-center">
              <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">هذا القسم متاح ومتصل بقاعدة البيانات</p>
            </div>
          </div>
        )
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
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
            <div className="p-2 bg-gradient-to-r from-green-500 to-lime-500 rounded-lg">
              <Coffee className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Juicetry</h2>
              <p className="text-sm text-gray-600">لوحة الإدارة المتقدمة</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 flex-1 overflow-y-auto">
          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right transition-colors ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-green-500 to-lime-500 text-white shadow-lg'
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
        <div className="p-4 border-t bg-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-white" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">{user.full_name || user.email}</p>
              <p className="text-green-600">مدير النظام</p>
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
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">متصل بقاعدة البيانات</span>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                نشط
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

export default FullDashboard
