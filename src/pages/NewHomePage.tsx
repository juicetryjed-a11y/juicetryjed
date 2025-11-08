import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { dataService } from '@/lib/dataService'
import { storageSync, SYNC_EVENTS } from '@/lib/storageSync'
import NewHeader from '@/components/layout/NewHeader'
import NewSlider from '@/components/sections/NewSlider'
import Footer from '@/components/layout/Footer'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import { ShoppingCart, BookOpen, Users, Mail, Star } from 'lucide-react'

interface Product {
  id: number
  name: string
  price: number
  description: string
  image_url: string
  category_id: number
  is_active: boolean
}

const NewHomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducts()

    // الاستماع لأحداث تحديث البيانات
    const handleDataRefresh = (type: string, data?: any) => {
      console.log('🔄 تحديث منتجات الصفحة الرئيسية بسبب حدث خارجي:', type)
      loadProducts()
    }

    storageSync.onDataUpdate(handleDataRefresh)

    // تحديث المنتجات كل دقيقة للحصول على المنتجات الجديدة
    const interval = setInterval(() => {
      loadProducts()
    }, 60000)

    return () => {
      clearInterval(interval)
      storageSync.offDataUpdate(handleDataRefresh)
    }
  }, [])

  const loadProducts = async () => {
    try {
      const { data, error } = await dataService.getProducts()
      if (error) throw error
      // عرض أول 6 منتجات فقط في الصفحة الرئيسية
      setProducts((data || []).filter(p => p.is_active).slice(0, 6))
    } catch (error) {
      console.error('خطأ في تحميل المنتجات:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <NewHeader />
      
      {/* Slider */}
      <NewSlider />
      
      <main>
        {/* قسم الميزات */}
        <section className="py-20 bg-gradient-to-b from-juicetry-primary/10 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-juicetry-dark mb-4">
                لماذا Juicetry؟
              </h2>
              <p className="text-lg text-juicetry-gray max-w-2xl mx-auto">
                نحن نقدم أفضل تجربة عصير طبيعي مع أجود المكونات
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link
                to="/menu"
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center group"
              >
                <div className="w-16 h-16 bg-juicetry-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <ShoppingCart className="h-8 w-8 text-juicetry-dark" />
                </div>
                <h3 className="text-xl font-bold text-juicetry-dark mb-2">المنيو</h3>
                <p className="text-juicetry-gray">استكشف تشكيلتنا الواسعة</p>
              </Link>
              
              <Link
                to="/blog"
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center group"
              >
                <div className="w-16 h-16 bg-juicetry-coral rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-juicetry-dark mb-2">المقالات</h3>
                <p className="text-juicetry-gray">اقرأ آخر المقالات والنصائح</p>
              </Link>
              
              <Link
                to="/about"
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center group"
              >
                <div className="w-16 h-16 bg-juicetry-purple rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-juicetry-dark mb-2">من نحن</h3>
                <p className="text-juicetry-gray">تعرف على قصتنا</p>
              </Link>
              
              <Link
                to="/contact"
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center group"
              >
                <div className="w-16 h-16 bg-juicetry-teal rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-juicetry-dark mb-2">تواصل معنا</h3>
                <p className="text-juicetry-gray">نحن هنا لمساعدتك</p>
              </Link>
            </div>
          </div>
        </section>

        {/* قسم المنتجات المميزة */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-juicetry-dark mb-4">
                منتجاتنا المميزة
              </h2>
              <p className="text-lg text-juicetry-gray max-w-2xl mx-auto">
                اكتشف تشكيلتنا الواسعة من العصائر الطبيعية الطازجة
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-gray-200 rounded-2xl h-80 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400'
                        }}
                      />
                      <div className="absolute top-4 right-4 bg-juicetry-primary text-juicetry-dark px-3 py-1 rounded-full text-sm font-bold">
                        {product.price} ر.س
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-juicetry-dark mb-2">
                        {product.name}
                      </h3>
                      <p className="text-juicetry-gray mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                          <span className="text-sm text-juicetry-gray mr-2">(4.8)</span>
                        </div>
                        
                        <button className="bg-juicetry-primary hover:bg-juicetry-primary/90 text-juicetry-dark px-4 py-2 rounded-lg font-medium transition-colors">
                          أضف للسلة
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-juicetry-primary hover:bg-juicetry-primary/90 text-juicetry-dark px-8 py-3 rounded-lg font-bold text-lg transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                عرض جميع المنتجات
              </Link>
            </div>
          </div>
        </section>

        {/* قسم آراء العملاء */}
        <TestimonialsSection />
      </main>
      
      <Footer />
    </div>
  )
}

export default NewHomePage

