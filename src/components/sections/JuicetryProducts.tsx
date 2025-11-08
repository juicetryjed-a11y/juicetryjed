import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Product } from '@/types'
import { supabase } from '@/lib/supabase'
import { ShoppingCart, Star, Heart, Eye, Leaf, Zap, Award } from 'lucide-react'

const JuicetryProducts: React.FC = () => {
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
      <section className="py-20 bg-gradient-to-br from-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="loading-spinner mx-auto mb-4"></div>
            <p className="text-gray-600 font-semibold">جاري تحميل أفضل العصائر...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-white via-green-50/30 to-lime-50/30 relative overflow-hidden">
      {/* خلفية ديكورية */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-green-200 to-lime-200 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-gradient-to-r from-pink-200 to-rose-200 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* رأس القسم */}
        <div className="text-center mb-20">
          {/* شارة المنتجات المميزة */}
          <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm px-8 py-4 rounded-full shadow-xl border border-green-100 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center">
              <Award className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-800">منتجاتنا المميزة</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>

          {/* العنوان الرئيسي */}
          <h2 className="text-5xl lg:text-7xl font-black mb-8 leading-tight">
            <span className="text-gray-900">أشهى </span>
            <span className="bg-gradient-to-r from-green-600 via-lime-500 to-yellow-500 bg-clip-text text-transparent">
              العصائر الطبيعية
            </span>
          </h2>

          {/* الوصف */}
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
            اكتشف مجموعتنا المتنوعة من العصائر الطبيعية الطازجة المحضرة يومياً من أجود الفواكه والخضروات الطازجة
            <span className="block mt-2 text-green-600 font-bold">بدون إضافات صناعية أو مواد حافظة</span>
          </p>
        </div>

        {/* شبكة المنتجات */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 animate-fade-in-up border border-green-100/50"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* شارة المنتج المميز */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center shadow-2xl z-10 border-4 border-white">
                <div className="text-center">
                  <Star className="h-6 w-6 text-white fill-current mx-auto" />
                  <div className="text-white font-bold text-xs">مميز</div>
                </div>
              </div>

              {/* صورة المنتج */}
              <div className="relative mb-8 overflow-hidden rounded-2xl group-hover:rounded-3xl transition-all duration-500">
                <img 
                  src={product.image_url || 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop'}
                  alt={product.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* تراكب التفاعل */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-between p-6">
                  <div className="flex gap-3">
                    <button className="w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg hover:scale-110">
                      <Heart className="h-5 w-5 text-red-500" />
                    </button>
                    <button className="w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg hover:scale-110">
                      <Eye className="h-5 w-5 text-blue-500" />
                    </button>
                  </div>
                  
                  {/* شارة طبيعي 100% */}
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <Leaf className="h-3 w-3" />
                    100% طبيعي
                  </div>
                </div>
              </div>

              {/* معلومات المنتج */}
              <div className="space-y-6">
                {/* التصنيف */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-lime-100 px-4 py-2 rounded-full border border-green-200">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-lime-500 rounded-full"></div>
                  <span className="text-sm font-bold text-green-700">
                    {(product as any).categories?.name || 'عصائر طبيعية'}
                  </span>
                </div>

                {/* اسم المنتج */}
                <h3 className="text-2xl font-black text-gray-900 group-hover:text-green-600 transition-colors leading-tight">
                  {product.name}
                </h3>

                {/* الوصف */}
                {product.description && (
                  <p className="text-gray-600 leading-relaxed line-clamp-2 font-medium">
                    {product.description}
                  </p>
                )}

                {/* المميزات */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-green-600">
                    <Zap className="h-4 w-4" />
                    <span className="text-sm font-bold">طاقة طبيعية</span>
                  </div>
                  <div className="flex items-center gap-1 text-blue-600">
                    <Leaf className="h-4 w-4" />
                    <span className="text-sm font-bold">فيتامينات</span>
                  </div>
                </div>

                {/* التقييم والسعر */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 font-semibold">(4.9)</span>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-3xl font-black bg-gradient-to-r from-green-600 to-lime-600 bg-clip-text text-transparent">
                      {product.price}
                    </span>
                    <span className="text-lg font-bold text-gray-600 mr-1">ريال</span>
                  </div>
                </div>

                {/* زر الإضافة */}
                <button className="w-full bg-gradient-to-r from-green-500 via-lime-500 to-yellow-500 text-white py-4 rounded-2xl font-bold text-lg hover:from-green-600 hover:via-lime-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 group-hover:shadow-green-500/25">
                  <ShoppingCart className="h-6 w-6" />
                  أضف إلى السلة
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-sm">+</span>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* قسم الدعوة للعمل */}
        <div className="text-center bg-gradient-to-r from-green-50 via-lime-50 to-yellow-50 rounded-3xl p-12 shadow-2xl border border-green-100">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* أيقونة مميزة */}
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <Leaf className="h-10 w-10 text-white" />
            </div>

            <h3 className="text-4xl font-black text-gray-900 mb-4">
              اكتشف المزيد من النكهات الطبيعية
            </h3>
            
            <p className="text-xl text-gray-600 font-medium leading-relaxed">
              تصفح قائمتنا الكاملة واكتشف عالماً من العصائر الطبيعية الطازجة والمشروبات الصحية
              <span className="block mt-2 text-green-600 font-bold">أكثر من 50 نوع من العصائر الطبيعية</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/menu"
                className="px-10 py-5 bg-gradient-to-r from-green-500 via-lime-500 to-yellow-500 text-white rounded-2xl font-bold text-xl shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
              >
                <ShoppingCart className="h-6 w-6" />
                تصفح القائمة الكاملة
              </Link>
              
              <Link 
                to="/contact"
                className="px-10 py-5 bg-white text-gray-900 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-green-200 hover:border-green-300 flex items-center justify-center gap-3"
              >
                <Heart className="h-6 w-6 text-red-500" />
                اطلب عصير مخصص
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default JuicetryProducts
