import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Category, HomepageDesignSettings } from '@/types'
import { supabase } from '@/lib/supabase'

const CategoriesSection: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [designSettings, setDesignSettings] = useState<HomepageDesignSettings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch categories
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .limit(8)

      // Fetch design settings
      const { data: designData } = await supabase
        .from('homepage_design_settings')
        .select('*')
        .eq('section_name', 'categories')
        .maybeSingle()

      if (categoriesData) setCategories(categoriesData)
      if (designData) setDesignSettings(designData)
      setLoading(false)
    } catch (error) {
      console.error('خطأ في جلب التصنيفات:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return null
  }

  // Show default content if no settings or settings not visible
  if (!designSettings || !designSettings.is_visible) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">تصنيفات العصائر</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              اكتشف تشكيلتنا المتنوعة من العصائر الطازجة المقسمة حسب النوع والطعم
            </p>
          </div>
          
          {categories.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/menu?category=${category.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                      {category.image_url ? (
                        <img 
                          src={category.image_url} 
                          alt={category.name}
                          className="w-12 h-12 object-cover rounded-full"
                        />
                      ) : (
                        <span className="text-white text-2xl font-bold">
                          {category.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 text-center mb-2 group-hover:text-orange-500 transition-colors">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-gray-600 text-sm text-center line-clamp-2">
                        {category.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">لا توجد تصنيفات حالياً</p>
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link 
              to="/menu"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-block"
            >
              عرض جميع التصنيفات
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">تصنيفات العصائر</h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            اكتشف تشكيلتنا المتنوعة من العصائر الطازجة المقسمة حسب النوع والطعم
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/menu?category=${category.id}`}
              className="group"
            >
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                {/* أيقونة التصنيف */}
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                  {category.image_url ? (
                    <img 
                      src={category.image_url} 
                      alt={category.name}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-white text-2xl font-bold">
                      {category.name.charAt(0)}
                    </span>
                  )}
                </div>
                
                {/* اسم التصنيف */}
                <h3 className="text-lg font-bold text-gray-900 text-center mb-2 group-hover:text-orange-500 transition-colors">
                  {category.name}
                </h3>
                
                {/* وصف التصنيف */}
                {category.description && (
                  <p className="text-gray-600 text-sm text-center line-clamp-2">
                    {category.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
        
        {/* رابط لعرض جميع التصنيفات */}
        <div className="text-center mt-12">
          <Link 
            to="/menu"
            className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-block"
          >
            عرض جميع التصنيفات
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CategoriesSection