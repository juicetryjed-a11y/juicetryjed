import React, { useEffect, useState } from 'react'
import { Category } from '@/types'
import { supabase } from '@/lib/supabase'
import { Plus, Edit, Trash2, Eye, EyeOff, Package, FileText } from 'lucide-react'

const CategoriesTab: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const { data } = await supabase
        .from('categories')
        .select('*')
        .order('name')

      if (data) setCategories(data)
      setLoading(false)
    } catch (error) {
      console.error('خطأ في جلب التصنيفات:', error)
      setLoading(false)
    }
  }

  const toggleCategoryActive = async (id: number, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('categories')
        .update({ is_active: !currentStatus })
        .eq('id', id)

      if (error) throw error

      setCategories(prev => 
        prev.map(category => 
          category.id === id 
            ? { ...category, is_active: !currentStatus }
            : category
        )
      )
    } catch (error) {
      console.error('خطأ في تحديث حالة التصنيف:', error)
      alert('حدث خطأ في تحديث حالة التصنيف')
    }
  }

  const deleteCategory = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا التصنيف؟ قد يؤثر هذا على المنتجات المرتبطة به.')) return

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)

      if (error) throw error

      setCategories(prev => prev.filter(category => category.id !== id))
      alert('تم حذف التصنيف بنجاح')
    } catch (error) {
      console.error('خطأ في حذف التصنيف:', error)
      alert('حدث خطأ في حذف التصنيف')
    }
  }

  const handleSaveCategory = async () => {
    if (!editingCategory) return

    try {
      setSaving(true)
      const { error } = await supabase
        .from('categories')
        .upsert(editingCategory, { onConflict: 'id' })

      if (error) throw error

      await fetchCategories()
      setShowForm(false)
      setEditingCategory(null)
      alert('تم حفظ التصنيف بنجاح')
    } catch (error) {
      console.error('خطأ في حفظ التصنيف:', error)
      alert('حدث خطأ في حفظ التصنيف')
    } finally {
      setSaving(false)
    }
  }

  const openCreateForm = () => {
    setEditingCategory({
      id: Date.now(),
      name: '',
      description: '',
      image_url: '',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    setShowForm(true)
  }

  const openEditForm = (category: Category) => {
    setEditingCategory(category)
    setShowForm(true)
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mb-4"></div>
            <p className="text-gray-600">جاري التحميل...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-gradient-to-br from-juicetry-primary/20 to-juicetry-coral/20 rounded-2xl">
            <FileText className="h-8 w-8 text-juicetry-purple" />
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-juicetry-dark to-juicetry-purple bg-clip-text text-transparent">إدارة التصنيفات</h2>
            <p className="text-juicetry-gray font-medium mt-1">إجمالي التصنيفات: <span className="font-bold text-juicetry-coral">{categories.length}</span></p>
          </div>
        </div>
        
        <button 
          onClick={openCreateForm}
          className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-juicetry-purple to-juicetry-teal text-white rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold"
        >
          <Plus className="h-5 w-5" />
          إضافة تصنيف جديد
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div key={category.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
            {/* صورة التصنيف */}
            <div className="h-52 bg-gradient-to-br from-juicetry-primary to-juicetry-coral relative overflow-hidden">
              {category.image_url ? (
                <img 
                  src={category.image_url} 
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="h-16 w-16 text-white/50" />
                </div>
              )}
              
              {/* حالة التصنيف */}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  category.is_active
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {category.is_active ? 'نشط' : 'غير نشط'}
                </span>
              </div>
            </div>

            {/* معلومات التصنيف */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
              
              {category.description && (
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {category.description}
                </p>
              )}

              {/* تاريخ الإنشاء */}
              <p className="text-sm text-gray-500 mb-4">
                تم الإنشاء: {new Date(category.created_at).toLocaleDateString('ar-SA')}
              </p>

              {/* العمليات */}
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() => toggleCategoryActive(category.id, category.is_active)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                    category.is_active
                      ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 hover:from-green-200 hover:to-green-300 shadow-md'
                      : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 shadow-md'
                  }`}
                >
                  {category.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  {category.is_active ? 'إخفاء' : 'إظهار'}
                </button>

                <button 
                  onClick={() => openEditForm(category)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-juicetry-purple/20 to-juicetry-teal/20 text-juicetry-purple rounded-xl text-sm font-semibold hover:from-juicetry-purple/30 hover:to-juicetry-teal/30 transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  <Edit className="h-4 w-4" />
                  تعديل
                </button>

                <button 
                  onClick={() => deleteCategory(category.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-100 to-red-200 text-red-700 rounded-xl text-sm font-semibold hover:from-red-200 hover:to-red-300 transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  <Trash2 className="h-4 w-4" />
                  حذف
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* إضافة تصنيف جديد */}
      <div 
        onClick={openCreateForm}
        className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 p-8 text-center hover:border-orange-300 transition-colors cursor-pointer mt-6"
      >
        <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">إضافة تصنيف جديد</h3>
        <p className="text-gray-600">انقر هنا لإضافة تصنيف جديد للعصائر</p>
      </div>

      {/* نموذج إضافة/تعديل التصنيف */}
      {showForm && editingCategory && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 w-full max-w-lg mx-4 shadow-2xl border border-gray-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-juicetry-primary/20 to-juicetry-coral/20 rounded-xl">
                <Plus className="h-6 w-6 text-juicetry-purple" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-juicetry-dark to-juicetry-purple bg-clip-text text-transparent">
                {editingCategory.id > 1000 ? 'إضافة تصنيف جديد' : 'تعديل التصنيف'}
              </h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">اسم التصنيف</label>
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="مثال: عصائر طازجة"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">الوصف</label>
                <textarea
                  value={editingCategory.description || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                  placeholder="وصف التصنيف..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">رابط الصورة</label>
                <input
                  type="url"
                  value={editingCategory.image_url || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, image_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="https://..."
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={editingCategory.is_active}
                  onChange={(e) => setEditingCategory({ ...editingCategory, is_active: e.target.checked })}
                />
                <label htmlFor="is_active" className="text-sm font-semibold">نشط</label>
              </div>
            </div>
            
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => {
                  setShowForm(false)
                  setEditingCategory(null)
                }}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveCategory}
                disabled={saving || !editingCategory.name.trim()}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-juicetry-purple to-juicetry-teal text-white rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                {saving ? 'جاري الحفظ...' : 'حفظ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoriesTab