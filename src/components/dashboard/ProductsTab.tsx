import React, { useEffect, useState } from 'react'
import { Product, Category } from '@/types'
import { supabase } from '@/lib/supabase'
import { Plus, Edit, Trash2, Eye, EyeOff, Star } from 'lucide-react'

const ProductsTab: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const { data: productsData } = await supabase
        .from('products')
        .select('*')
        .order('name')

      const { data: categoriesData } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('name')

      if (productsData) setProducts(productsData)
      if (categoriesData) setCategories(categoriesData)
      setLoading(false)
    } catch (error) {
      console.error('خطأ في جلب المنتجات:', error)
      setLoading(false)
    }
  }

  const toggleProductActive = async (id: number, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_active: !currentStatus })
        .eq('id', id)

      if (error) throw error

      setProducts(prev => 
        prev.map(product => 
          product.id === id 
            ? { ...product, is_active: !currentStatus }
            : product
        )
      )
    } catch (error) {
      console.error('خطأ في تحديث حالة المنتج:', error)
      alert('حدث خطأ في تحديث حالة المنتج')
    }
  }

  const toggleProductFeatured = async (id: number, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_featured: !currentStatus })
        .eq('id', id)

      if (error) throw error

      setProducts(prev => 
        prev.map(product => 
          product.id === id 
            ? { ...product, is_featured: !currentStatus }
            : product
        )
      )
    } catch (error) {
      console.error('خطأ في تحديث حالة التميز:', error)
      alert('حدث خطأ في تحديث حالة التميز')
    }
  }

  const deleteProduct = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) throw error

      setProducts(prev => prev.filter(product => product.id !== id))
      alert('تم حذف المنتج بنجاح')
    } catch (error) {
      console.error('خطأ في حذف المنتج:', error)
      alert('حدث خطأ في حذف المنتج')
    }
  }

  const handleSaveProduct = async () => {
    if (!editingProduct) return

    try {
      setSaving(true)
      const { error } = await supabase
        .from('products')
        .upsert(editingProduct, { onConflict: 'id' })

      if (error) throw error

      await fetchData()
      setShowForm(false)
      setEditingProduct(null)
      alert('تم حفظ المنتج بنجاح')
    } catch (error) {
      console.error('خطأ في حفظ المنتج:', error)
      alert('حدث خطأ في حفظ المنتج')
    } finally {
      setSaving(false)
    }
  }

  const openCreateForm = () => {
    setEditingProduct({
      id: Date.now(),
      name: '',
      description: '',
      price: 0,
      image_url: '',
      category_id: categories[0]?.id || 1,
      is_active: true,
      is_featured: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    setShowForm(true)
  }

  const openEditForm = (product: Product) => {
    setEditingProduct(product)
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
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">إدارة المنتجات</h2>
          <p className="text-gray-600">إجمالي المنتجات: {products.length}</p>
        </div>
        
        <button 
          onClick={openCreateForm}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          إضافة منتج جديد
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-right px-6 py-3 text-sm font-medium text-gray-900">المنتج</th>
                <th className="text-right px-6 py-3 text-sm font-medium text-gray-900">التصنيف</th>
                <th className="text-right px-6 py-3 text-sm font-medium text-gray-900">السعر</th>
                <th className="text-center px-6 py-3 text-sm font-medium text-gray-900">الحالة</th>
                <th className="text-center px-6 py-3 text-sm font-medium text-gray-900">مميز</th>
                <th className="text-center px-6 py-3 text-sm font-medium text-gray-900">العمليات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image_url || '/images/juice-placeholder.jpg'}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        {product.description && (
                          <p className="text-sm text-gray-500 line-clamp-1 max-w-xs">
                            {product.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {categories.find(cat => cat.id === product.category_id)?.name || 'غير محدد'}
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-medium">
                    {product.price} ريال
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleProductActive(product.id, product.is_active)}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium mx-auto ${
                        product.is_active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {product.is_active ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      {product.is_active ? 'نشط' : 'غير نشط'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleProductFeatured(product.id, product.is_featured)}
                      className={`p-1 rounded ${
                        product.is_featured ? 'text-yellow-500' : 'text-gray-400'
                      }`}
                    >
                      <Star className={`h-5 w-5 ${product.is_featured ? 'fill-current' : ''}`} />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-center">
                      <button 
                        onClick={() => openEditForm(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
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

      {/* نموذج إضافة/تعديل المنتج */}
      {showForm && editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              {editingProduct.id > 1000 ? 'إضافة منتج جديد' : 'تعديل المنتج'}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">اسم المنتج</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="مثال: عصير برتقال طازج"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">التصنيف</label>
                <select
                  value={editingProduct.category_id}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category_id: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">السعر (ريال)</label>
                <input
                  type="number"
                  step="0.01"
                  value={editingProduct.price || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="15.00"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">رابط الصورة</label>
                <input
                  type="url"
                  value={editingProduct.image_url || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="https://..."
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-semibold mb-2">الوصف</label>
              <textarea
                value={editingProduct.description || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                rows={3}
                placeholder="وصف المنتج..."
              />
            </div>
            
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={editingProduct.is_active}
                  onChange={(e) => setEditingProduct({ ...editingProduct, is_active: e.target.checked })}
                />
                <label htmlFor="is_active" className="text-sm font-semibold">نشط</label>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={editingProduct.is_featured}
                  onChange={(e) => setEditingProduct({ ...editingProduct, is_featured: e.target.checked })}
                />
                <label htmlFor="is_featured" className="text-sm font-semibold">مميز</label>
              </div>
            </div>
            
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => {
                  setShowForm(false)
                  setEditingProduct(null)
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveProduct}
                disabled={saving || !editingProduct.name.trim()}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
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

export default ProductsTab