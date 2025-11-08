import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, Filter, Eye, EyeOff, Save, X, Upload, Image } from 'lucide-react'
import { dataService } from '@/lib/dataService'
import ImageUploader from '@/components/ui/ImageUploader'

interface Category {
  id: number
  name: string
  color: string
  icon: string
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
  categories?: Category
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

const ProductsManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
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

  const sizeOptions = [
    'صغير (250مل)',
    'متوسط (350مل)',
    'كبير (500مل)',
    'عائلي (750مل)'
  ]

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const productData = {
        ...formData,
        updated_at: new Date().toISOString()
      }

      if (editingProduct) {
        // Update existing product
        const { error } = await dataService.updateProduct(editingProduct.id, productData)
        if (error) throw error
      } else {
        // Create new product
        const { error } = await dataService.addProduct(productData)
        if (error) throw error
      }

      await loadProducts()
      resetForm()
      setShowModal(false)
    } catch (error) {
      console.error('Error saving product:', error)
      alert('حدث خطأ أثناء حفظ المنتج')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return

    setLoading(true)
    try {
      // Delete the product using dataService
      const { error } = await dataService.deleteProduct(id)
      if (error) throw error
      
      await loadProducts()
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('حدث خطأ أثناء حذف المنتج')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleActive = async (id: number, currentStatus: boolean) => {
    setLoading(true)
    try {
      const { error } = await dataService.updateProduct(id, { 
        is_active: !currentStatus,
        updated_at: new Date().toISOString()
      })

      if (error) throw error
      await loadProducts()
    } catch (error) {
      console.error('Error toggling product status:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      price: 0,
      category_id: categories.length > 0 ? categories[0].id : 0,
      description: '',
      image_url: '',
      ingredients: '',
      nutritional_info: '',
      calories: 0,
      size_options: '',
      is_active: true
    })
    setEditingProduct(null)
  }

  const openEditModal = (product: Product) => {
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
    setShowModal(true)
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === 'all' || product.category_id.toString() === categoryFilter

    const matchesStatus = 
      statusFilter === 'all' ||
      (statusFilter === 'active' && product.is_active) ||
      (statusFilter === 'inactive' && !product.is_active)

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getProductStats = () => {
    const stats = {
      total: products.length,
      active: products.filter(p => p.is_active).length,
      inactive: products.filter(p => !p.is_active).length,
      averagePrice: products.length > 0 
        ? products.reduce((sum, p) => sum + p.price, 0) / products.length
        : 0,
      byCategory: categories.map(cat => ({
        name: cat.name,
        count: products.filter(p => p.category_id === cat.id).length,
        color: cat.color
      }))
    }
    return stats
  }

  const stats = getProductStats()

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">إدارة المنتجات</h2>
          <p className="text-gray-600 mt-1">إضافة وإدارة منتجات المتجر</p>
        </div>
        <button
          onClick={() => {
            resetForm()
            setShowModal(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg hover:shadow-lg transition-all"
        >
          <Plus className="h-5 w-5" />
          إضافة منتج جديد
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">إجمالي المنتجات</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          <div className="text-sm text-gray-600">منتجات نشطة</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="text-2xl font-bold text-red-600">{stats.inactive}</div>
          <div className="text-sm text-gray-600">منتجات غير نشطة</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="text-2xl font-bold text-blue-600">{stats.averagePrice.toFixed(0)}</div>
          <div className="text-sm text-gray-600">متوسط السعر</div>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">توزيع المنتجات بالتصنيفات</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {stats.byCategory.map((cat, index) => (
            <div key={index} className="text-center">
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: cat.color }}
              >
                {cat.count}
              </div>
              <div className="text-sm font-medium text-gray-900">{cat.name}</div>
            </div>
          ))}
        </div>
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
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            >
              <option value="all">جميع التصنيفات</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id.toString()}>
                  {category.name}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            >
              <option value="all">جميع المنتجات</option>
              <option value="active">المنتجات النشطة</option>
              <option value="inactive">المنتجات غير النشطة</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
            {/* Product Image */}
            <div className="h-48 bg-gradient-to-br from-green-50 to-lime-50 flex items-center justify-center relative">
              {product.image_url ? (
                <img 
                  src={product.image_url} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-6xl">🍹</div>
              )}
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => handleToggleActive(product.id, product.is_active)}
                  className={`p-1 rounded-full ${
                    product.is_active 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {product.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                {product.categories && (
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: product.categories.color }}
                    title={product.categories.name}
                  ></div>
                )}
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

              {product.calories && (
                <div className="text-xs text-gray-500 mb-2">
                  🔥 {product.calories} سعرة حرارية
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <span className="text-xl font-bold text-green-600">{product.price}</span>
                  <span className="text-gray-600 text-sm">ريال</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  product.is_active 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.is_active ? 'نشط' : 'غير نشط'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  {product.categories?.name}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(product)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🍹</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">لا توجد منتجات</h3>
          <p className="text-gray-600 mb-6">ابدأ بإضافة منتج جديد لمتجرك</p>
          <button
            onClick={() => {
              resetForm()
              setShowModal(true)
            }}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg hover:shadow-lg transition-all"
          >
            إضافة منتج جديد
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold text-gray-900">
                {editingProduct ? 'تحرير المنتج' : 'إضافة منتج جديد'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    اسم المنتج *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    placeholder="مثال: عصير برتقال طازج"
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    السعر (ريال) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    placeholder="15.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    التصنيف *
                  </label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    required
                  >
                    <option value="">اختر التصنيف</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Calories */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    السعرات الحرارية
                  </label>
                  <input
                    type="number"
                    value={formData.calories}
                    onChange={(e) => setFormData({ ...formData, calories: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    placeholder="120"
                    min="0"
                  />
                </div>

                {/* Product Image */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    صورة المنتج
                  </label>
                  <ImageUploader
                    currentImage={formData.image_url}
                    onUpload={(url) => setFormData({ ...formData, image_url: url })}
                    folder="products"
                    className="w-full"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    الوصف *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none"
                    rows={3}
                    placeholder="وصف مفصل للمنتج..."
                    required
                  />
                </div>

                {/* Ingredients */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    المكونات
                  </label>
                  <textarea
                    value={formData.ingredients}
                    onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none"
                    rows={2}
                    placeholder="برتقال طازج، ماء، سكر طبيعي..."
                  />
                </div>

                {/* Nutritional Info */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    المعلومات الغذائية
                  </label>
                  <textarea
                    value={formData.nutritional_info}
                    onChange={(e) => setFormData({ ...formData, nutritional_info: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none"
                    rows={3}
                    placeholder="فيتامين C، بوتاسيوم، ألياف..."
                  />
                </div>

                {/* Size Options */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    خيارات الحجم
                  </label>
                  <select
                    value={formData.size_options}
                    onChange={(e) => setFormData({ ...formData, size_options: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  >
                    <option value="">اختر الحجم</option>
                    {sizeOptions.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Active Status */}
                <div className="md:col-span-2 flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label htmlFor="is_active" className="text-sm font-semibold text-gray-700">
                    منتج نشط ومتاح للبيع
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {loading ? 'جاري الحفظ...' : editingProduct ? 'تحديث المنتج' : 'إضافة المنتج'}
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
            <p className="text-gray-600">جاري التحميل...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductsManager
