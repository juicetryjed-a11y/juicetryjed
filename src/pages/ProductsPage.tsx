import React, { useState, useEffect } from 'react'
import { Search, Filter, ShoppingCart, Star, Edit, Trash2, Eye, Plus } from 'lucide-react'
import { dataService } from '@/lib/dataService'
import { useAuth } from '@/contexts/SimpleAuthContext'
import { Link } from 'react-router-dom'

interface Category {
  id: number
  name: string
  color: string
  icon: string
  is_active: boolean
}

interface Product {
  id: number
  name: string
  price: number
  category_id: number
  description: string
  image_url?: string
  ingredients?: string
  nutritional_info?: string
  calories?: number
  size_options?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

interface ProductFormData {
  name: string
  price: number
  category_id: number
  description: string
  image_url: string
  ingredients: string
  nutritional_info: string
  calories: number
  size_options: string
  is_active: boolean
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: 0,
    category_id: 0,
    description: '',
    image_url: '',
    ingredients: '',
    nutritional_info: '',
    calories: 0,
    size_options: '',
    is_active: true
  })

  const { user, isAdmin } = useAuth()

  useEffect(() => {
    loadProducts()
    loadCategories()
  }, [])

  const loadProducts = async () => {
    setLoading(true)
    try {
      const { data, error } = await dataService.getProducts()
      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const { data, error } = await dataService.getCategories()
      if (error) throw error
      setCategories(data?.filter(cat => cat.is_active) || [])
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: product.price,
      category_id: product.category_id,
      description: product.description,
      image_url: product.image_url || '',
      ingredients: product.ingredients || '',
      nutritional_info: product.nutritional_info || '',
      calories: product.calories || 0,
      size_options: product.size_options || '',
      is_active: product.is_active
    })
    setShowEditModal(true)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProduct) return

    setLoading(true)
    try {
      const { error } = await dataService.updateProduct(editingProduct.id, formData)
      if (error) throw error
      
      await loadProducts()
      setShowEditModal(false)
      setEditingProduct(null)
      alert('تم تحديث المنتج بنجاح!')
    } catch (error) {
      console.error('Error updating product:', error)
      alert('حدث خطأ أثناء تحديث المنتج')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`هل أنت متأكد من حذف منتج "${name}"؟`)) return

    setLoading(true)
    try {
      const { error } = await dataService.deleteProduct(id)
      if (error) throw error
      
      await loadProducts()
      alert('تم حذف المنتج بنجاح!')
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('حدث خطأ أثناء حذف المنتج')
    } finally {
      setLoading(false)
    }
  }

  const toggleProductStatus = async (product: Product) => {
    setLoading(true)
    try {
      const { error } = await dataService.updateProduct(product.id, {
        is_active: !product.is_active
      })
      if (error) throw error
      
      await loadProducts()
    } catch (error) {
      console.error('Error updating product status:', error)
      alert('حدث خطأ أثناء تحديث حالة المنتج')
    } finally {
      setLoading(false)
    }
  }

  const getCategoryName = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.name : 'غير محدد'
  }

  const getCategoryColor = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.color : '#gray'
  }

  const getCategoryIcon = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.icon : '🍹'
  }

  const filteredProducts = products.filter(product => {
    // فلترة البحث
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.ingredients && product.ingredients.toLowerCase().includes(searchTerm.toLowerCase()))

    // فلترة التصنيف
    const matchesCategory = categoryFilter === 'all' || product.category_id.toString() === categoryFilter

    // فلترة السعر
    let matchesPrice = true
    if (priceFilter === 'low') matchesPrice = product.price < 20
    else if (priceFilter === 'medium') matchesPrice = product.price >= 20 && product.price < 40
    else if (priceFilter === 'high') matchesPrice = product.price >= 40

    // إظهار المنتجات النشطة فقط للعملاء، وجميع المنتجات للمديرين
    const matchesStatus = isAdmin || product.is_active

    return matchesSearch && matchesCategory && matchesPrice && matchesStatus
  })

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-yellow-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-lime-600 bg-clip-text text-transparent">
                منتجاتنا الطبيعية
              </h1>
              <p className="text-gray-600 mt-1">
                اكتشف أفضل العصائر الطبيعية الطازجة
                {dataService.isUsingMockData() && ' (وضع البيانات التجريبية)'}
              </p>
            </div>
            {isAdmin && (
              <div className="flex gap-3">
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  لوحة الإدارة
                </Link>
                <Link
                  to="/admin/dashboard?tab=products"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <Plus className="h-4 w-4" />
                  إضافة منتج
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-green-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* البحث */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                البحث في المنتجات
              </label>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white/80"
                  placeholder="ابحث عن منتج..."
                />
              </div>
            </div>

            {/* فلترة التصنيف */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                التصنيف
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white/80"
              >
                <option value="all">جميع التصنيفات</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id.toString()}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* فلترة السعر */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                نطاق السعر
              </label>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white/80"
              >
                <option value="all">جميع الأسعار</option>
                <option value="low">أقل من 20 ر.س</option>
                <option value="medium">20 - 40 ر.س</option>
                <option value="high">أكثر من 40 ر.س</option>
              </select>
            </div>
          </div>

          {/* عدد النتائج */}
          <div className="mt-4 text-sm text-gray-600">
            عرض {filteredProducts.length} من أصل {products.length} منتج
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-green-100 hover:shadow-xl transition-all duration-300 group">
              {/* صورة المنتج */}
              <div className="relative h-48 overflow-hidden">
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-100 to-lime-100 flex items-center justify-center">
                    <span className="text-4xl">{getCategoryIcon(product.category_id)}</span>
                  </div>
                )}
                
                {/* شارة التصنيف */}
                <div className="absolute top-3 right-3">
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-semibold text-white shadow-lg"
                    style={{ backgroundColor: getCategoryColor(product.category_id) }}
                  >
                    {getCategoryName(product.category_id)}
                  </span>
                </div>

                {/* حالة المنتج للمديرين */}
                {isAdmin && (
                  <div className="absolute top-3 left-3">
                    <button
                      onClick={() => toggleProductStatus(product)}
                      className={`p-2 rounded-full shadow-lg ${
                        product.is_active 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {/* أزرار التحكم للمديرين */}
                {isAdmin && (
                  <div className="absolute bottom-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* تفاصيل المنتج */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* المعلومات الإضافية */}
                <div className="space-y-2 mb-4">
                  {product.calories && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                      {product.calories} سعرة حرارية
                    </div>
                  )}
                  {product.size_options && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      {product.size_options}
                    </div>
                  )}
                </div>

                {/* السعر والأزرار */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">
                    {product.price} ر.س
                  </span>
                  
                  {!isAdmin && product.is_active && (
                    <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg hover:shadow-lg transition-all">
                      <ShoppingCart className="h-4 w-4" />
                      أضف للسلة
                    </button>
                  )}
                </div>

                {/* حالة المنتج */}
                {!product.is_active && (
                  <div className="mt-3 text-center">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                      غير متاح حالياً
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* رسالة عدم وجود منتجات */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              لا توجد منتجات تطابق البحث
            </h3>
            <p className="text-gray-500">
              جرب تغيير معايير البحث أو الفلترة
            </p>
          </div>
        )}
      </div>

      {/* Modal التحرير للمديرين */}
      {showEditModal && editingProduct && isAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold text-gray-900">
                تحرير المنتج: {editingProduct.name}
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    اسم المنتج
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    السعر (ر.س)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    التصنيف
                  </label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    required
                  >
                    <option value={0}>اختر التصنيف</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    الوصف
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    السعرات الحرارية
                  </label>
                  <input
                    type="number"
                    value={formData.calories}
                    onChange={(e) => setFormData({ ...formData, calories: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    خيارات الحجم
                  </label>
                  <input
                    type="text"
                    value={formData.size_options}
                    onChange={(e) => setFormData({ ...formData, size_options: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    placeholder="مثال: كبير (500مل)"
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="is_active_edit"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label htmlFor="is_active_edit" className="text-sm font-semibold text-gray-700">
                      منتج نشط
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {loading ? 'جاري التحديث...' : 'تحديث المنتج'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
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

export default ProductsPage
