import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Product, HomepageDesignSettings } from '@/types'
import { supabase } from '@/lib/supabase'
import { ShoppingCart } from 'lucide-react'

const FeaturedProductsSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [designSettings, setDesignSettings] = useState<HomepageDesignSettings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch featured products
      const { data: productsData } = await supabase
        .from('products')
        .select('*, categories(name)')
        .eq('is_featured', true)
        .eq('is_active', true)
        .limit(6)

      // Fetch design settings
      const { data: designData } = await supabase
        .from('homepage_design_settings')
        .select('*')
        .eq('section_name', 'featured_products')
        .maybeSingle()

      if (productsData) setProducts(productsData)
      if (designData) setDesignSettings(designData)
      setLoading(false)
    } catch (error) {
      console.error('خطأ في جلب المنتجات المميزة:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return null
  }

  // Show default content if no settings or settings not visible
  if (!designSettings || !designSettings.is_visible) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">منتجاتنا المميزة</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              تشكيلة مختارة من أفضل العصائر الطازجة المحضرة بأجود المكونات الطبيعية
            </p>
          </div>
          
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image_url || 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop'}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop'
                      }}
                    />
                    <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold">
                      مميز
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                    
                    {product.description && (
                      <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                        {product.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-primary">
                          {product.price} ريال
                        </span>
                      </div>
                      
                      <button className="bg-accent text-white p-3 rounded-xl hover:bg-accent-light transition-all transform hover:scale-105 shadow-lg">
                        <ShoppingCart className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">لا توجد منتجات مميزة حالياً</p>
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors inline-block"
            >
              عرض جميع المنتجات
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const sectionStyle = {
    backgroundColor: designSettings.background_color,
    color: designSettings.text_color,
    textAlign: designSettings.text_alignment as 'center' | 'right' | 'left',
    fontSize: designSettings.font_size === 'large' ? '1.2rem' : designSettings.font_size === 'small' ? '0.9rem' : '1rem',
    paddingTop: designSettings.padding_top === 'large' ? '6rem' : designSettings.padding_top === 'small' ? '2rem' : '4rem',
    paddingBottom: designSettings.padding_bottom === 'large' ? '6rem' : designSettings.padding_bottom === 'small' ? '2rem' : '4rem',
  }

  return (
    <section style={sectionStyle}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">منتجاتنا المميزة</h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            تشكيلة مختارة من أفضل العصائر الطازجة المحضرة بأجود المكونات الطبيعية
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* صورة المنتج */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image_url || '/images/juice-placeholder.jpg'}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold">
                  مميز
                </div>
              </div>
              
              {/* معلومات المنتج */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                
                {product.description && (
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                    {product.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">
                      {product.price} ريال
                    </span>
                  </div>
                  
                  <button className="bg-accent text-white p-3 rounded-lg hover:bg-accent-light transition-colors">
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* رابط لعرض المزيد */}
        <div className="text-center mt-12">
          <Link
            to="/menu"
            className="bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors inline-block"
          >
            عرض جميع المنتجات
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProductsSection
