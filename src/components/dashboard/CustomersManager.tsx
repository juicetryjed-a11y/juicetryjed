import React, { useState, useEffect } from 'react'
import { Search, Filter, Eye, Edit, Trash2, User, Mail, Phone, MapPin, Calendar, ShoppingCart, DollarSign, Star, Plus } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Customer {
  id: string
  full_name: string
  email: string
  phone?: string
  address?: string
  city?: string
  avatar_url?: string
  role: 'customer' | 'admin'
  created_at: string
  updated_at: string
  total_orders?: number
  total_spent?: number
  last_order_date?: string
  average_rating?: number
}

const CustomersManager: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('created_at')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  const sortOptions = [
    { value: 'created_at', label: 'تاريخ التسجيل' },
    { value: 'full_name', label: 'الاسم' },
    { value: 'total_orders', label: 'عدد الطلبات' },
    { value: 'total_spent', label: 'إجمالي الإنفاق' },
    { value: 'last_order_date', label: 'آخر طلب' }
  ]

  useEffect(() => {
    loadCustomers()
  }, [])

  const loadCustomers = async () => {
    setLoading(true)
    try {
      // Get customers (profiles with role = customer)
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'customer')
        .order('created_at', { ascending: false })

      if (profilesError) throw profilesError

      // Get order statistics for each customer
      const customersWithStats = await Promise.all(
        (profiles || []).map(async (customer) => {
          // Get total orders count
          const { count: totalOrders } = await supabase
            .from('orders')
            .select('*', { count: 'exact', head: true })
            .eq('customer_email', customer.email)

          // Get total spent and last order date
          const { data: orders } = await supabase
            .from('orders')
            .select('total_amount, created_at')
            .eq('customer_email', customer.email)
            .eq('status', 'delivered')
            .order('created_at', { ascending: false })

          const totalSpent = orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0
          const lastOrderDate = orders?.[0]?.created_at || null

          // Get average rating from reviews
          const { data: reviews } = await supabase
            .from('customer_reviews')
            .select('rating')
            .eq('customer_email', customer.email)

          const averageRating = reviews?.length 
            ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
            : 0

          return {
            ...customer,
            total_orders: totalOrders || 0,
            total_spent: totalSpent,
            last_order_date: lastOrderDate,
            average_rating: Math.round(averageRating * 10) / 10
          }
        })
      )

      setCustomers(customersWithStats)
    } catch (error) {
      console.error('Error loading customers:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteCustomer = async (customerId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا العميل؟ سيتم حذف جميع طلباته ومراجعاته أيضاً.')) return

    setLoading(true)
    try {
      // Delete customer reviews
      await supabase
        .from('customer_reviews')
        .delete()
        .eq('customer_id', customerId)

      // Delete order items for customer orders
      const { data: customerOrders } = await supabase
        .from('orders')
        .select('id')
        .eq('customer_id', customerId)

      if (customerOrders?.length) {
        const orderIds = customerOrders.map(order => order.id)
        await supabase
          .from('order_items')
          .delete()
          .in('order_id', orderIds)
      }

      // Delete customer orders
      await supabase
        .from('orders')
        .delete()
        .eq('customer_id', customerId)

      // Delete customer profile
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', customerId)

      if (error) throw error
      await loadCustomers()
    } catch (error) {
      console.error('Error deleting customer:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredAndSortedCustomers = customers
    .filter(customer => 
      customer.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.phone && customer.phone.includes(searchTerm))
    )
    .sort((a, b) => {
      let aValue = a[sortBy as keyof Customer]
      let bValue = b[sortBy as keyof Customer]

      // Handle null/undefined values
      if (aValue === null || aValue === undefined) aValue = 0
      if (bValue === null || bValue === undefined) bValue = 0

      // Convert to comparable values
      if (typeof aValue === 'string') aValue = aValue.toLowerCase()
      if (typeof bValue === 'string') bValue = bValue.toLowerCase()

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const getCustomerStats = () => {
    const stats = {
      total: customers.length,
      newThisMonth: customers.filter(c => {
        const createdDate = new Date(c.created_at)
        const now = new Date()
        return createdDate.getMonth() === now.getMonth() && createdDate.getFullYear() === now.getFullYear()
      }).length,
      activeCustomers: customers.filter(c => (c.total_orders || 0) > 0).length,
      totalRevenue: customers.reduce((sum, c) => sum + (c.total_spent || 0), 0),
      averageOrderValue: customers.length > 0 
        ? customers.reduce((sum, c) => sum + (c.total_spent || 0), 0) / customers.reduce((sum, c) => sum + (c.total_orders || 0), 0) || 0
        : 0
    }
    return stats
  }

  const stats = getCustomerStats()

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">إدارة العملاء</h2>
          <p className="text-gray-600 mt-1">متابعة وإدارة جميع عملاء المتجر</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">إجمالي العملاء</div>
            </div>
            <User className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">{stats.newThisMonth}</div>
              <div className="text-sm text-gray-600">عملاء جدد هذا الشهر</div>
            </div>
            <Plus className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-600">{stats.activeCustomers}</div>
              <div className="text-sm text-gray-600">عملاء نشطين</div>
            </div>
            <ShoppingCart className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">{stats.totalRevenue.toFixed(0)}</div>
              <div className="text-sm text-gray-600">إجمالي الإيرادات</div>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-600">{stats.averageOrderValue.toFixed(0)}</div>
              <div className="text-sm text-gray-600">متوسط قيمة الطلب</div>
            </div>
            <Star className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Search and Sort */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="البحث بالاسم، البريد الإلكتروني أو رقم الهاتف..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  ترتيب حسب {option.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العميل</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">معلومات الاتصال</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الطلبات</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإنفاق</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التقييم</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ التسجيل</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-lime-100 rounded-full flex items-center justify-center mr-3">
                        {customer.avatar_url ? (
                          <img src={customer.avatar_url} alt={customer.full_name} className="w-10 h-10 rounded-full" />
                        ) : (
                          <User className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{customer.full_name}</div>
                        <div className="text-sm text-gray-500">ID: {customer.id.slice(0, 8)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center gap-1 mb-1">
                        <Mail className="h-4 w-4 text-gray-400" />
                        {customer.email}
                      </div>
                      {customer.phone && (
                        <div className="flex items-center gap-1 mb-1">
                          <Phone className="h-4 w-4 text-gray-400" />
                          {customer.phone}
                        </div>
                      )}
                      {customer.city && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          {customer.city}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">{customer.total_orders || 0}</div>
                    {customer.last_order_date && (
                      <div className="text-sm text-gray-500">
                        آخر طلب: {new Date(customer.last_order_date).toLocaleDateString('ar-SA')}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-green-600">{customer.total_spent?.toFixed(0) || 0} ريال</div>
                    {customer.total_orders && customer.total_orders > 0 && (
                      <div className="text-sm text-gray-500">
                        متوسط: {((customer.total_spent || 0) / customer.total_orders).toFixed(0)} ريال
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer.average_rating && customer.average_rating > 0 ? (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold text-gray-900">{customer.average_rating}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">لا يوجد تقييم</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(customer.created_at).toLocaleDateString('ar-SA')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedCustomer(customer)
                          setShowDetailsModal(true)
                        }}
                        className="text-blue-600 hover:text-blue-900"
                        title="عرض التفاصيل"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteCustomer(customer.id)}
                        className="text-red-600 hover:text-red-900"
                        title="حذف العميل"
                      >
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

      {/* Empty State */}
      {filteredAndSortedCustomers.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">لا يوجد عملاء</h3>
          <p className="text-gray-600">لم يتم العثور على عملاء يطابقون معايير البحث</p>
        </div>
      )}

      {/* Customer Details Modal */}
      {showDetailsModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold text-gray-900">
                تفاصيل العميل: {selectedCustomer.full_name}
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  المعلومات الشخصية
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">الاسم الكامل</label>
                    <p className="text-gray-900">{selectedCustomer.full_name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">البريد الإلكتروني</label>
                    <p className="text-gray-900">{selectedCustomer.email}</p>
                  </div>
                  {selectedCustomer.phone && (
                    <div>
                      <label className="text-sm font-semibold text-gray-600">رقم الهاتف</label>
                      <p className="text-gray-900">{selectedCustomer.phone}</p>
                    </div>
                  )}
                  {selectedCustomer.city && (
                    <div>
                      <label className="text-sm font-semibold text-gray-600">المدينة</label>
                      <p className="text-gray-900">{selectedCustomer.city}</p>
                    </div>
                  )}
                  {selectedCustomer.address && (
                    <div className="md:col-span-2">
                      <label className="text-sm font-semibold text-gray-600">العنوان</label>
                      <p className="text-gray-900">{selectedCustomer.address}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Statistics */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  إحصائيات العميل
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{selectedCustomer.total_orders || 0}</div>
                    <div className="text-sm text-gray-600">إجمالي الطلبات</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{selectedCustomer.total_spent?.toFixed(0) || 0}</div>
                    <div className="text-sm text-gray-600">إجمالي الإنفاق</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {selectedCustomer.total_orders && selectedCustomer.total_orders > 0 
                        ? ((selectedCustomer.total_spent || 0) / selectedCustomer.total_orders).toFixed(0)
                        : 0
                      }
                    </div>
                    <div className="text-sm text-gray-600">متوسط الطلب</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {selectedCustomer.average_rating?.toFixed(1) || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-600">متوسط التقييم</div>
                  </div>
                </div>
              </div>

              {/* Account Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  معلومات الحساب
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">تاريخ التسجيل</label>
                    <p className="text-gray-900">
                      {new Date(selectedCustomer.created_at).toLocaleDateString('ar-SA')} - 
                      {new Date(selectedCustomer.created_at).toLocaleTimeString('ar-SA')}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">آخر تحديث</label>
                    <p className="text-gray-900">
                      {new Date(selectedCustomer.updated_at).toLocaleDateString('ar-SA')} - 
                      {new Date(selectedCustomer.updated_at).toLocaleTimeString('ar-SA')}
                    </p>
                  </div>
                  {selectedCustomer.last_order_date && (
                    <div>
                      <label className="text-sm font-semibold text-gray-600">آخر طلب</label>
                      <p className="text-gray-900">
                        {new Date(selectedCustomer.last_order_date).toLocaleDateString('ar-SA')}
                      </p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-semibold text-gray-600">نوع الحساب</label>
                    <p className="text-gray-900">
                      {selectedCustomer.role === 'admin' ? 'مدير' : 'عميل'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-40">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">جاري التحميل...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomersManager
