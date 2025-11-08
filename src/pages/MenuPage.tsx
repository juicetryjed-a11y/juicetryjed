import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Product, Category } from '@/types'
import { dataService } from '@/lib/dataService'
import { storageSync } from '@/lib/storageSync'
import HeaderNew from '@/components/layout/HeaderNew'
import Footer from '@/components/layout/Footer'
import { ShoppingCart, Search, Filter } from 'lucide-react'

const MenuPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
    
    // Check if category is specified in URL
    const categoryId = searchParams.get('category')
    if (categoryId) {
      setSelectedCategory(Number(categoryId))
    }

    // الاستماع لأحداث تحديث البيانات
    const handleDataRefresh = () => {
      console.log('🔄 تحديث بيانات MenuPage')
      fetchData()
    }

    storageSync.onDataUpdate(handleDataRefresh)

    // تحديث البيانات كل 30 ثانية للحصول على المنتجات الجديدة
    const interval = setInterval(() => {
      fetchData()
    }, 30000)

    return () => {
      clearInterval(interval)
      storageSync.offDataUpdate(handleDataRefresh)
    }
  }, [searchParams])

  const fetchData = async () => {
    try {
      console.log('🔄 MenuPage: جاري جلب البيانات...')
      
      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await dataService.getCategories()
      console.log('📊 MenuPage: Categories data:', categoriesData)
      console.log('📊 MenuPage: Categories error:', categoriesError)
      if (categoriesError) throw categoriesError

      // Fetch products
      const { data: productsData, error: productsError } = await dataService.getProducts()
      console.log('📊 MenuPage: Products data:', productsData)
      console.log('📊 MenuPage: Products error:', productsError)
      console.log('📊 MenuPage: عدد المنتجات:', productsData?.length || 0)
      if (productsError) throw productsError

      // Filter active items and format data
      const activeCategories = (categoriesData || []).filter(cat => cat.is_active)
      console.log('✅ MenuPage: Active categories:', activeCategories.length)
      
      const activeProducts = (productsData || [])
        .filter(product => product.is_active)
        .map(product => ({
          ...product,
          categories: activeCategories.find(cat => cat.id === product.category_id)
        }))
      
      console.log('✅ MenuPage: Active products:', activeProducts.length)
      console.log('✅ MenuPage: Products:', activeProducts)

      setCategories(activeCategories)
      setProducts(activeProducts as Product[])
      setLoading(false)
      
      console.log('✅ MenuPage: تم تحديث البيانات بنجاح')
    } catch (error) {
      console.error('❌ MenuPage: Error fetching data:', error)
      setLoading(false)
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? product.category_id === selectedCategory : true
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch = product.name?.toLowerCase().includes(searchLower) ||
                         (product.description && product.description.toLowerCase().includes(searchLower))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNew />
      
      <main className="container mx-auto px-4 py-8">
        {/* عنوان الصفحة */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">قائمة العصائر</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            استكشف تشكيلتنا الواسعة من العصائر الطازجة المحضرة يومياً بأجود المكونات
          </p>
        </div>
        
        {/* شريط البحث والفلتر */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* بحث */}
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="ابحث عن العصير..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
            </div>
            
            {/* فلتر التصنيفات */}
            <div className="relative">
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : null)}
                className="w-full md:w-64 pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none appearance-none bg-white"
              >
                <option value="">جميع التصنيفات</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* عدد النتائج */}
          <div className="mt-4 text-gray-600">
            عدد النتائج: {filteredProducts.length} منتج
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            <p className="mt-4 text-gray-600">جاري التحميل...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* صورة المنتج */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image_url || 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop'}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop'
                    }}
                  />
                  {product.is_featured && (
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      مميز
                    </div>
                  )}
                </div>
                
                {/* معلومات المنتج */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  
                  {product.description && (
                    <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                      {product.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-orange-500">
                        {product.price} ريال
                      </span>
                    </div>
                    
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      اطلب الآن
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">لا توجد منتجات تطابق البحث</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  )
}

export default MenuPage