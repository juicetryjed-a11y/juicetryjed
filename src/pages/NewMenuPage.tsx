import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { dataService } from '@/lib/dataService'
import { storageSync, SYNC_EVENTS } from '@/lib/storageSync'
// import '@/lib/clearStorage' // مؤقت لمسح البيانات القديمة
import NewHeader from '@/components/layout/NewHeader'
import Footer from '@/components/layout/Footer'
import { ShoppingCart, Search, Filter, RefreshCw } from 'lucide-react'

interface MenuProduct {
  id: number
  name_ar: string
  name_en: string
  name?: string
  category_id: number
  category?: { name_ar: string; name_en: string }
  price: number
  price_sar?: number
  image_url?: string
  is_active: boolean
  description_ar?: string
  description_en?: string
  description?: string
}

interface Category {
  id: number
  name_ar: string
  name_en: string
  is_active: boolean
}

const NewMenuPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState<MenuProduct[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
    
    const categoryId = searchParams.get('category')
    if (categoryId) {
      setSelectedCategory(Number(categoryId))
    }

    // الاستماع لأحداث تحديث البيانات
    const handleDataRefresh = (type: string, data?: any) => {
      console.log('🔄 تحديث البيانات بسبب حدث خارجي:', type)
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
      // جلب التصنيفات
      const { data: categoriesData, error: categoriesError } = await dataService.getCategories()
      if (categoriesError) throw categoriesError

      // جلب المنتجات
      const { data: productsData, error: productsError } = await dataService.getProducts()
      if (productsError) throw productsError

      // تحويل بيانات المنتجات لتتوافق مع واجهة MenuProduct
      const formattedProducts = (productsData || [])
        .filter(product => product.is_active)
        .map(product => ({
          ...product,
          name_ar: product.name || product.name_ar || 'منتج بدون اسم',
          name_en: product.name_en || product.name || '',
          description_ar: product.description || product.description_ar || '',
          description_en: product.description_en || product.description || '',
          price_sar: product.price,
          image_url: product.image_url || 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop',
          category: categoriesData?.find(cat => cat.id === product.category_id)
        }))

      console.log('📊 المنتجات المحملة:', formattedProducts.length)
      console.log('🖼️ أول منتج:', formattedProducts[0])

      setCategories(categoriesData || [])
      setProducts(formattedProducts as MenuProduct[])
      setLoading(false)
    } catch (error) {
      console.error('خطأ في جلب البيانات:', error)
      setLoading(false)
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? product.category_id === selectedCategory : true
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch = 
      product.name_ar?.toLowerCase().includes(searchLower) ||
      product.name_en?.toLowerCase().includes(searchLower) ||
      product.description_ar?.toLowerCase().includes(searchLower) ||
      product.description_en?.toLowerCase().includes(searchLower)
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-juicetry-primary/10 to-white">
      <NewHeader />
      
      <main className="container mx-auto px-4 py-12">
        {/* عنوان الصفحة */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-juicetry-dark mb-4">
            قائمة العصائر
          </h1>
          <p className="text-lg text-juicetry-gray max-w-2xl mx-auto">
            استكشف تشكيلتنا الواسعة من العصائر الطازجة المحضرة يومياً بأجود المكونات
          </p>
        </div>
        
        {/* شريط البحث والفلتر */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* بحث */}
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-juicetry-gray h-5 w-5" />
              <input
                type="text"
                placeholder="ابحث عن العصير..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border-2 border-juicetry-primary/30 rounded-xl focus:ring-2 focus:ring-juicetry-primary focus:border-juicetry-primary outline-none transition-all"
              />
            </div>
            
            {/* فلتر التصنيفات */}
            <div className="relative">
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-juicetry-gray h-5 w-5" />
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : null)}
                className="w-full md:w-64 pr-10 pl-4 py-3 border-2 border-juicetry-primary/30 rounded-xl focus:ring-2 focus:ring-juicetry-primary focus:border-juicetry-primary outline-none appearance-none bg-white"
              >
                <option value="">جميع التصنيفات</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name_ar}
                  </option>
                ))}
              </select>
            </div>

            {/* زر التحديث */}
            <button
              onClick={() => {
                setLoading(true)
                fetchData()
              }}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-juicetry-primary hover:bg-juicetry-primary/90 text-juicetry-dark font-medium rounded-xl transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
              تحديث
            </button>
          </div>
          
          {/* عدد النتائج */}
          <div className="mt-4 text-juicetry-gray">
            عدد النتائج: <span className="font-bold text-juicetry-primary">{filteredProducts.length}</span> منتج
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-juicetry-primary"></div>
            <p className="mt-4 text-juicetry-gray">جاري التحميل...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                {/* صورة المنتج */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-juicetry-primary to-juicetry-lightCoral">
                  <img
                    src={product.image_url || 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop'}
                    alt={product.name_ar || product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop'
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-juicetry-primary text-juicetry-dark px-3 py-1 rounded-full text-sm font-bold">
                    {product.price || product.price_sar} ر.س
                  </div>
                </div>
                
                {/* معلومات المنتج */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-juicetry-dark mb-2">{product.name_ar}</h3>
                  {product.name_en && (
                    <p className="text-sm text-juicetry-gray mb-3">{product.name_en}</p>
                  )}
                  
                  {product.description_ar && (
                    <p className="text-juicetry-gray mb-4 text-sm line-clamp-2">
                      {product.description_ar}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-juicetry-primary">
                        {product.price} ريال
                      </span>
                    </div>
                    
                    <button className="bg-juicetry-primary hover:bg-juicetry-primary/90 text-juicetry-dark px-4 py-2 rounded-xl font-semibold transition-colors flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      اطلب
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-juicetry-gray text-xl">لا توجد منتجات تطابق البحث</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  )
}

export default NewMenuPage


