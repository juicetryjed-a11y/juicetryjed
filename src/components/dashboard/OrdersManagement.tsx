import React, { useState, useEffect } from 'react'
import {
  ShoppingCart, Plus, Edit2, Trash2, Search, Eye,
  Package, DollarSign, Calendar, Phone, Mail, MapPin,
  Check, X, Clock, AlertCircle, RefreshCw
} from 'lucide-react'
import { ordersAPI } from '@/lib/dashboardAPI'
import type { Order, CreateOrderData, UpdateOrderData } from '@/types/dashboard'

const OrdersManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'processing' | 'completed' | 'cancelled'>('all')
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await ordersAPI.getAll()
      setOrders(data)
    } catch (err: any) {
      setError(err.message || 'فشل في تحميل الطلبات')
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (id: string, status: Order['status']) => {
    try {
      setError(null)
      await ordersAPI.update(id, { status })
      setSuccess('تم تحديث حالة الطلب بنجاح')
      loadOrders()
    } catch (err: any) {
      setError(err.message || 'فشل في تحديث الطلب')
    }
  }

  const handleUpdatePayment = async (id: string, paymentStatus: Order['payment_status']) => {
    try {
      setError(null)
      await ordersAPI.update(id, { payment_status: paymentStatus })
      setSuccess('تم تحديث حالة الدفع بنجاح')
      loadOrders()
    } catch (err: any) {
      setError(err.message || 'فشل في تحديث الدفع')
    }
  }

  const handleDeleteOrder = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الطلب؟')) return
    
    try {
      setError(null)
      await ordersAPI.delete(id)
      setSuccess('تم حذف الطلب بنجاح')
      loadOrders()
    } catch (err: any) {
      setError(err.message || 'فشل في حذف الطلب')
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'قيد الانتظار'
      case 'processing': return 'قيد المعالجة'
      case 'completed': return 'مكتمل'
      case 'cancelled': return 'ملغي'
      default: return status
    }
  }

  const getPaymentStatusColor = (status: Order['payment_status']) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'unpaid': return 'bg-red-100 text-red-800'
      case 'refunded': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusText = (status: Order['payment_status']) => {
    switch (status) {
      case 'paid': return 'مدفوع'
      case 'unpaid': return 'غير مدفوع'
      case 'refunded': return 'مسترد'
      default: return status
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl">
            <ShoppingCart className="h-8 w-8 text-orange-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">إدارة الطلبات</h2>
            <p className="text-gray-600 font-medium">عرض وإدارة جميع الطلبات</p>
          </div>
        </div>
        <button
          onClick={loadOrders}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          <RefreshCw className="h-5 w-5" />
          تحديث
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <p className="text-red-800">{error}</p>
          <button onClick={() => setError(null)} className="mr-auto text-red-600 hover:text-red-800">
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <Check className="h-5 w-5 text-green-600" />
          <p className="text-green-800">{success}</p>
          <button onClick={() => setSuccess(null)} className="mr-auto text-green-600 hover:text-green-800">
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Search and Filter */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="بحث برقم الطلب، اسم العميل، أو البريد الإلكتروني..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="all">كل الحالات</option>
          <option value="pending">قيد الانتظار</option>
          <option value="processing">قيد المعالجة</option>
          <option value="completed">مكتمل</option>
          <option value="cancelled">ملغي</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">جاري التحميل...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-12 text-center">
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">لا توجد طلبات</h3>
            <p className="text-gray-600">لم يتم العثور على أي طلبات</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-orange-50 to-red-50">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-900">رقم الطلب</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-900">العميل</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-900">المبلغ</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-900">الحالة</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-900">الدفع</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-900">التاريخ</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-900">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{order.order_number}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{order.customer_name}</div>
                      <div className="text-sm text-gray-500">{order.customer_email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-orange-600">{order.total_amount.toFixed(2)} ر.س</div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value as Order['status'])}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                      >
                        <option value="pending">قيد الانتظار</option>
                        <option value="processing">قيد المعالجة</option>
                        <option value="completed">مكتمل</option>
                        <option value="cancelled">ملغي</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.payment_status}
                        onChange={(e) => handleUpdatePayment(order.id, e.target.value as Order['payment_status'])}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(order.payment_status)}`}
                      >
                        <option value="unpaid">غير مدفوع</option>
                        <option value="paid">مدفوع</option>
                        <option value="refunded">مسترد</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {new Date(order.created_at).toLocaleDateString('ar-SA')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedOrder(order)
                            setShowViewModal(true)
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="عرض التفاصيل"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Order Modal */}
      {showViewModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">تفاصيل الطلب</h3>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">رقم الطلب</label>
                  <p className="text-lg font-bold text-gray-900">{selectedOrder.order_number}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">التاريخ</label>
                  <p className="text-lg text-gray-900">
                    {new Date(selectedOrder.created_at).toLocaleDateString('ar-SA')}
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-900 mb-2">معلومات العميل</h4>
                <div className="space-y-2">
                  <p className="flex items-center gap-2 text-gray-700">
                    <Mail className="h-4 w-4" />
                    {selectedOrder.customer_name}
                  </p>
                  <p className="flex items-center gap-2 text-gray-700">
                    <Mail className="h-4 w-4" />
                    {selectedOrder.customer_email}
                  </p>
                  <p className="flex items-center gap-2 text-gray-700">
                    <Phone className="h-4 w-4" />
                    {selectedOrder.customer_phone}
                  </p>
                  {selectedOrder.customer_address && (
                    <p className="flex items-center gap-2 text-gray-700">
                      <MapPin className="h-4 w-4" />
                      {selectedOrder.customer_address}, {selectedOrder.customer_city}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">المنتجات</h4>
                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                  <div className="space-y-2">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{item.product_name}</p>
                          <p className="text-sm text-gray-600">الكمية: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-orange-600">{item.subtotal.toFixed(2)} ر.س</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">لا توجد منتجات</p>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">المجموع الكلي</span>
                  <span className="text-2xl font-bold text-orange-600">
                    {selectedOrder.total_amount.toFixed(2)} ر.س
                  </span>
                </div>
              </div>

              {selectedOrder.notes && (
                <div>
                  <label className="text-sm font-medium text-gray-600">ملاحظات</label>
                  <p className="text-gray-900 mt-1">{selectedOrder.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrdersManagement
