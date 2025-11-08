import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Product } from '@/types'
import { supabase } from '@/lib/supabase'
import { ShoppingCart, Star, Heart, Eye } from 'lucide-react'

const ModernFeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const { data } = await supabase
        .from('products')
        .select('*, categories(name)')
        .eq('is_featured', true)
        .eq('is_active', true)
        .limit(6)

      if (data) setProducts(data)
      setLoading(false)
    } catch (error) {
      console.error('خطأ في جلب المنتجات:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="loading-spinner mx-auto mb-4"></div>
            <p className="text-gray-600">جاري تحميل المنتجات...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-orange-50/30 to-yellow-50/30 relative overflow-hidden">
      {/* خلفية ديكورية */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-orange-200 to-yellow-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-r from-green-200 to-blue-200 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* رأس القسم */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-6">
            <Star className="h-5 w-5 text-orange-500" />
            <span className="text-sm font-semibold text-gray-700">منتجاتنا المميزة</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-gray-900">أشهى </span>
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
              العصائر الطبيعية
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            اكتشف مجموعتنا المتنوعة من العصائر الطبيعية الطازجة المحضرة يومياً من أجود الفواكه والخضروات
          </p>
        </div>

        {/* شبكة المنتجات */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* شارة المنتج المميز */}
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg z-10">
                <Star className="h-6 w-6 text-white fill-current" />
              </div>

              {/* صورة المنتج */}
              <div className="relative mb-6 overflow-hidden rounded-2xl">
                <img 
                  src={product.image_url || 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop'}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* تراكب التفاعل */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                  <div className="flex gap-2">
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <Heart className="h-5 w-5 text-red-500" />
                    </button>
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <Eye className="h-5 w-5 text-blue-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* معلومات المنتج */}
              <div className="space-y-4">
                {/* التصنيف */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-yellow-100 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm font-medium text-orange-700">
                    {(product as any).categories?.name || 'عصائر طبيعية'}
                  </span>
                </div>

                {/* اسم المنتج */}
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                  {product.name}
                </h3>

                {/* الوصف */}
                {product.description && (
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                )}

                {/* التقييم والسعر */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-sm text-gray-600 mr-2">(4.9)</span>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      {product.price} ريال
                    </span>
                  </div>
                </div>

                {/* زر الإضافة */}
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-2xl font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  أضف إلى السلة
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* زر عرض المزيد */}
        <div className="text-center">
          <Link 
            to="/menu"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-900 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-orange-200 hover:border-orange-300"
          >
            <span>عرض جميع المنتجات</span>
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <ShoppingCart className="h-4 w-4 text-white" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ModernFeaturedProducts
