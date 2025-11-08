import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Edit, Trash2, Shield, User } from 'lucide-react'

interface UserRole {
  id: number
  email: string
  role: 'admin' | 'editor' | 'viewer'
  is_active: boolean
  created_at: string
}

const UsersManagementTab: React.FC = () => {
  const [users, setUsers] = useState<UserRole[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newUser, setNewUser] = useState({ email: '', password: '', role: 'viewer' as const })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      // جلب المستخدمين من Supabase Auth
      const { data: { users: authUsers } } = await supabase.auth.admin.listUsers()
      
      // جلب الأدوار من جدول منفصل
      const { data: rolesData } = await supabase
        .from('user_roles')
        .select('*')

      if (authUsers && rolesData) {
        const usersWithRoles = authUsers.map(authUser => {
          const role = rolesData.find(r => r.user_id === authUser.id)
          return {
            id: authUser.id,
            email: authUser.email || '',
            role: role?.role || 'viewer',
            is_active: true,
            created_at: authUser.created_at || '',
          }
        })
        setUsers(usersWithRoles)
      }
      setLoading(false)
    } catch (error) {
      console.error('خطأ في جلب المستخدمين:', error)
      setLoading(false)
    }
  }

  const handleAddUser = async () => {
    try {
      // إنشاء مستخدم جديد في Supabase Auth
      const { data, error } = await supabase.auth.admin.createUser({
        email: newUser.email,
        password: newUser.password,
        email_confirm: true,
      })

      if (error) throw error

      // إضافة الدور
      if (data.user) {
        await supabase
          .from('user_roles')
          .insert([{
            user_id: data.user.id,
            role: newUser.role,
          }])
      }

      await fetchUsers()
      setShowAddForm(false)
      setNewUser({ email: '', password: '', role: 'viewer' })
      alert('تم إضافة المستخدم بنجاح')
    } catch (error: any) {
      console.error('خطأ في إضافة المستخدم:', error)
      alert(error.message || 'حدث خطأ في إضافة المستخدم')
    }
  }

  const updateUserRole = async (userId: string, newRole: 'admin' | 'editor' | 'viewer') => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .upsert({ user_id: userId, role: newRole }, { onConflict: 'user_id' })

      if (error) throw error
      await fetchUsers()
      alert('تم تحديث صلاحيات المستخدم بنجاح')
    } catch (error) {
      console.error('خطأ في تحديث الصلاحيات:', error)
      alert('حدث خطأ في تحديث الصلاحيات')
    }
  }

  const deleteUser = async (userId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return

    try {
      await supabase.auth.admin.deleteUser(userId)
      await supabase.from('user_roles').delete().eq('user_id', userId)
      await fetchUsers()
      alert('تم حذف المستخدم بنجاح')
    } catch (error) {
      console.error('خطأ في حذف المستخدم:', error)
      alert('حدث خطأ في حذف المستخدم')
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'مدير'
      case 'editor': return 'محرر'
      case 'viewer': return 'مشاهد'
      default: return role
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-700'
      case 'editor': return 'bg-blue-100 text-blue-700'
      case 'viewer': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  if (loading) {
    return <div className="p-6">جاري التحميل...</div>
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">إدارة المستخدمين</h2>
          <p className="text-gray-600 mt-1">إضافة وإدارة المستخدمين وصلاحياتهم</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-juicetry-primary text-juicetry-dark px-4 py-2 rounded-lg hover:bg-juicetry-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          إضافة مستخدم جديد
        </button>
      </div>

      {/* نموذج إضافة مستخدم */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">إضافة مستخدم جديد</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="user@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">كلمة المرور</label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">الدور</label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="viewer">مشاهد (قراءة فقط)</option>
                <option value="editor">محرر (تعديل المحتوى)</option>
                <option value="admin">مدير (صلاحيات كاملة)</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddUser}
                className="bg-juicetry-primary text-juicetry-dark px-4 py-2 rounded-lg hover:bg-juicetry-primary/90 transition-colors"
              >
                إضافة
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false)
                  setNewUser({ email: '', password: '', role: 'viewer' })
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* قائمة المستخدمين */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {users.length === 0 ? (
          <div className="p-12 text-center">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">لا توجد مستخدمين حالياً</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {users.map((user) => (
              <div key={user.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-juicetry-primary rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-juicetry-dark" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{user.email}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 rounded text-sm ${getRoleColor(user.role)}`}>
                          {getRoleLabel(user.role)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user.id.toString(), e.target.value as any)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="viewer">مشاهد</option>
                      <option value="editor">محرر</option>
                      <option value="admin">مدير</option>
                    </select>
                    <button
                      onClick={() => deleteUser(user.id.toString())}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default UsersManagementTab


