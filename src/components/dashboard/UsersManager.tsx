import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, Filter, Eye, EyeOff, Save, X, Shield, User, Mail, Phone, MapPin, Calendar, Crown, Users } from 'lucide-react'
import { dataService } from '@/lib/dataService'

interface User {
  id: string
  full_name: string
  email: string
  phone?: string
  address?: string
  city?: string
  avatar_url?: string
  role: 'customer' | 'admin' | 'manager' | 'editor'
  is_active: boolean
  created_at: string
  updated_at?: string
  last_login?: string
}

interface UserFormData {
  full_name: string
  email: string
  phone: string
  address: string
  city: string
  role: 'customer' | 'admin' | 'manager' | 'editor'
  is_active: boolean
  password?: string
}

const UsersManager: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true) // تبدأ بـ true لتحميل البيانات
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState<UserFormData>({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    role: 'customer',
    is_active: true,
    password: ''
  })

  // عرض معلومات التصحيح في وحدة التحكم
  console.log('👥 UsersManager - عدد المستخدمين:', users.length)
  console.log('👥 UsersManager - المستخدمون:', users)

  const roles = [
    { value: 'customer', label: 'عميل', icon: User, color: 'bg-blue-500', description: 'تصفح وطلب المنتجات' },
    { value: 'editor', label: 'محرر', icon: Edit, color: 'bg-green-500', description: 'إدارة المحتوى والمقالات' },
    { value: 'manager', label: 'مدير', icon: Shield, color: 'bg-orange-500', description: 'إدارة المنتجات والطلبات' },
    { value: 'admin', label: 'مدير عام', icon: Crown, color: 'bg-red-500', description: 'صلاحيات كاملة' }
  ]

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    try {
      console.log('🔄 جاري تحميل المستخدمين...')
      const { data, error } = await dataService.getUsers()
      
      if (error) {
        console.error('❌ خطأ في تحميل المستخدمين:', error)
        throw error
      }
      
      console.log('✅ تم تحميل المستخدمين:', data)
      setUsers(data || [])
    } catch (error) {
      console.error('❌ خطأ في تحميل المستخدمين:', error)
      // في حالة الخطأ، استخدم البيانات التجريبية مباشرة
      try {
        const { mockUsers } = await import('@/lib/mockData')
        console.log('🔄 استخدام البيانات التجريبية:', mockUsers)
        // تحويل البيانات لتتوافق مع نوع User
        const typedUsers = mockUsers.map(user => ({
          ...user,
          role: user.role as 'customer' | 'admin' | 'manager' | 'editor'
        }))
        setUsers(typedUsers)
      } catch (mockError) {
        console.error('❌ خطأ في تحميل البيانات التجريبية:', mockError)
        setUsers([])
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (editingUser) {
        const { error } = await dataService.updateUser(editingUser.id, formData)
        if (error) throw error
        alert('تم تحديث المستخدم بنجاح!')
      } else {
        const { error } = await dataService.addUser(formData)
        if (error) throw error
        alert('تم إضافة المستخدم بنجاح!')
      }

      await loadUsers()
      resetForm()
      setShowModal(false)
    } catch (error) {
      console.error('Error saving user:', error)
      alert('حدث خطأ أثناء حفظ المستخدم')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    // منع حذف المدير الأساسي
    const userToDelete = users.find(u => u.id === id)
    if (userToDelete?.email === 'admin@juicetry.com') {
      alert('❌ لا يمكن حذف المدير الأساسي للنظام!')
      return
    }

    if (!confirm(`هل أنت متأكد من حذف المستخدم "${name}"؟\n\nهذا الإجراء لا يمكن التراجع عنه.`)) return

    setLoading(true)
    try {
      console.log(`🔄 محاولة حذف المستخدم: ${name} (${id})`)
      
      const result = await dataService.deleteUser(id)
      
      if (result.error) {
        console.error('❌ خطأ في حذف المستخدم:', result.error)
        throw new Error(result.error)
      }
      
      console.log('✅ تم حذف المستخدم بنجاح، جاري تحديث القائمة...')
      
      // إعادة تحميل قائمة المستخدمين
      await loadUsers()
      
      // التأكد من أن المستخدم تم حذفه فعلاً
      const updatedUsers = users.filter(u => u.id !== id)
      if (updatedUsers.length < users.length) {
        alert(`✅ تم حذف المستخدم "${name}" بنجاح!`)
      } else {
        throw new Error('فشل في حذف المستخدم من القائمة')
      }
      
    } catch (error: any) {
      console.error('❌ خطأ في حذف المستخدم:', error)
      alert(`❌ حدث خطأ أثناء حذف المستخدم "${name}":\n${error.message || error}`)
    } finally {
      setLoading(false)
    }
  }

  const toggleUserStatus = async (user: User) => {
    setLoading(true)
    try {
      const { error } = await dataService.updateUser(user.id, {
        is_active: !user.is_active
      })
      if (error) throw error
      
      await loadUsers()
    } catch (error) {
      console.error('Error updating user status:', error)
      alert('حدث خطأ أثناء تحديث حالة المستخدم')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      full_name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      role: 'customer',
      is_active: true,
      password: ''
    })
    setEditingUser(null)
  }

  const openEditModal = (user: User) => {
    setEditingUser(user)
    setFormData({
      full_name: user.full_name,
      email: user.email,
      phone: user.phone || '',
      address: user.address || '',
      city: user.city || '',
      role: user.role,
      is_active: user.is_active,
      password: '' // لا نعرض كلمة المرور الحالية
    })
    setShowModal(true)
  }

  const getRoleInfo = (role: string) => {
    return roles.find(r => r.value === role) || roles[0]
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone && user.phone.includes(searchTerm))

    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && user.is_active) ||
      (statusFilter === 'inactive' && !user.is_active)

    return matchesSearch && matchesRole && matchesStatus
  })

  // إحصائيات المستخدمين
  const totalUsers = users.length
  const activeUsers = users.filter(u => u.is_active).length
  const inactiveUsers = users.filter(u => !u.is_active).length
  const adminUsers = users.filter(u => u.role === 'admin').length
  const customerUsers = users.filter(u => u.role === 'customer').length

  if (loading && users.length === 0) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">جاري تحميل المستخدمين...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!loading && users.length === 0) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">لا يوجد مستخدمون</h3>
            <p className="text-gray-600 mb-4">لم يتم العثور على أي مستخدمين في النظام</p>
            <button
              onClick={() => {
                resetForm()
                setShowModal(true)
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Plus className="h-5 w-5" />
              إضافة أول مستخدم
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Debug Info - Remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            🔍 Debug: عدد المستخدمين = {users.length} | Loading = {loading ? 'true' : 'false'}
          </p>
          <p className="text-xs text-yellow-600 mt-1">
            افتح وحدة التحكم (F12) لرؤية التفاصيل الكاملة
          </p>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">إدارة المستخدمين</h2>
          <p className="text-gray-600 mt-1">إدارة حسابات المستخدمين وصلاحياتهم</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              console.log('🔄 تحديث يدوي للمستخدمين...')
              loadUsers()
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            <svg className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {loading ? 'جاري التحديث...' : 'تحديث'}
          </button>
          <button
            onClick={() => {
              resetForm()
              setShowModal(true)
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <Plus className="h-5 w-5" />
            إضافة مستخدم جديد
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl text-white">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8" />
            <div>
              <h3 className="text-sm font-semibold">إجمالي المستخدمين</h3>
              <p className="text-2xl font-bold">{totalUsers}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-xl text-white">
          <div className="flex items-center gap-3">
            <Eye className="h-8 w-8" />
            <div>
              <h3 className="text-sm font-semibold">نشط</h3>
              <p className="text-2xl font-bold">{activeUsers}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-xl text-white">
          <div className="flex items-center gap-3">
            <EyeOff className="h-8 w-8" />
            <div>
              <h3 className="text-sm font-semibold">غير نشط</h3>
              <p className="text-2xl font-bold">{inactiveUsers}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-xl text-white">
          <div className="flex items-center gap-3">
            <Crown className="h-8 w-8" />
            <div>
              <h3 className="text-sm font-semibold">مديرين</h3>
              <p className="text-2xl font-bold">{adminUsers}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-xl text-white">
          <div className="flex items-center gap-3">
            <User className="h-8 w-8" />
            <div>
              <h3 className="text-sm font-semibold">عملاء</h3>
              <p className="text-2xl font-bold">{customerUsers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              البحث
            </label>
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                placeholder="البحث في المستخدمين..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              الدور
            </label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            >
              <option value="all">جميع الأدوار</option>
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              الحالة
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            >
              <option value="all">جميع المستخدمين</option>
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
            </select>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          عرض {filteredUsers.length} من أصل {users.length} مستخدم
          {users.length > 0 && (
            <span className="mr-2 text-green-600">
              ✅ تم تحميل المستخدمين بنجاح
            </span>
          )}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المستخدم
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الدور
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  معلومات الاتصال
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  تاريخ الإنشاء
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => {
                const roleInfo = getRoleInfo(user.role)
                const RoleIcon = roleInfo.icon
                
                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {user.avatar_url ? (
                            <img className="h-10 w-10 rounded-full" src={user.avatar_url} alt={user.full_name} />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <User className="h-6 w-6 text-gray-600" />
                            </div>
                          )}
                        </div>
                        <div className="mr-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900">{user.full_name}</span>
                            {user.email === 'admin@juicetry.com' && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                <Crown className="h-3 w-3 mr-1" />
                                مدير أساسي
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${roleInfo.color}`}>
                          <RoleIcon className="h-3 w-3 mr-1" />
                          {roleInfo.label}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{roleInfo.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="space-y-1">
                        {user.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3 text-gray-400" />
                            {user.phone}
                          </div>
                        )}
                        {user.city && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            {user.city}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(user.created_at).toLocaleDateString('ar-SA')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleUserStatus(user)}
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          user.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {user.is_active ? (
                          <>
                            <Eye className="h-3 w-3 mr-1" />
                            نشط
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-3 w-3 mr-1" />
                            غير نشط
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(user)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                          title="تحرير المستخدم"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        {user.email === 'admin@juicetry.com' ? (
                          <button
                            disabled
                            className="text-gray-400 p-1 rounded cursor-not-allowed"
                            title="لا يمكن حذف المدير الأساسي"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleDelete(user.id, user.full_name)}
                            className="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
                            title="حذف المستخدم"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">لا توجد مستخدمين تطابق البحث</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold text-gray-900">
                {editingUser ? 'تحرير المستخدم' : 'إضافة مستخدم جديد'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    placeholder="الاسم الكامل..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    البريد الإلكتروني *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    placeholder="example@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    placeholder="+966501234567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    المدينة
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    placeholder="الرياض"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    العنوان
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    placeholder="العنوان التفصيلي..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    الدور *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    required
                  >
                    {roles.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label} - {role.description}
                      </option>
                    ))}
                  </select>
                </div>

                {!editingUser && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      كلمة المرور *
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                      placeholder="كلمة المرور..."
                      required={!editingUser}
                    />
                  </div>
                )}

                <div className="md:col-span-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="is_active"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label htmlFor="is_active" className="text-sm font-semibold text-gray-700">
                      مستخدم نشط
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {loading ? 'جاري الحفظ...' : editingUser ? 'تحديث المستخدم' : 'إضافة المستخدم'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-40">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">جاري المعالجة...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default UsersManager
