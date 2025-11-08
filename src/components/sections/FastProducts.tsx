import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Plus } from 'lucide-react'
import { dataService } from '@/lib/dataService'
import { Product } from '@/types'

const FastProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      console.log('🔄 FastProducts: جاري جلب المنتجات من الداتابيز...')
      const { data, error } = await dataService.getProducts()
      
      if (error) {
        console.error('❌ FastProducts: خطأ في جلب المنتجات:', error)
      } else {
        // Get only active products, limit to 6
        const activeProducts = (data || [])
          .filter(p => p.is_active)
          .slice(0, 6)
        
        console.log('✅ FastProducts: تم جلب المنتجات:', activeProducts.length)
        setProducts(activeProducts)
      }
    } catch (error) {
      console.error('❌ FastProducts: خطأ:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600">جاري تحميل المنتجات...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            منتجاتنا المميزة
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            اكتشف مجموعتنا المتنوعة من العصائر الطبيعية الطازجة المحضرة بعناية فائقة
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 text-lg">لا توجد منتجات متاحة حالياً</p>
            </div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden border border-gray-100">
                {/* Product Image */}
                <div className="h-48 bg-gradient-to-br from-green-50 to-lime-50 flex items-center justify-center">
                  {product.image_url ? (
                    <img 
                      src={product.image_url} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-6xl">🍹</div>
                  )}
                </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-gray-700">4.8</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{product.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-bold text-green-600">{product.price}</span>
                    <span className="text-gray-600">ريال</span>
                  </div>

                  <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold">
                    <Plus className="h-4 w-4" />
                    إضافة
                  </button>
                </div>
              </div>
            </div>
            ))
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link 
            to="/menu"
            className="inline-block px-8 py-4 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            عرض جميع المنتجات
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FastProducts
