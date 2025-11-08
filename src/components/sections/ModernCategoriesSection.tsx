import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Category } from '@/types'
import { supabase } from '@/lib/supabase'
import { ArrowLeft, Sparkles } from 'lucide-react'

const ModernCategoriesSection: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const { data } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .limit(8)

      if (data) setCategories(data)
      setLoading(false)
    } catch (error) {
      console.error('خطأ في جلب التصنيفات:', error)
      setLoading(false)
    }
  }

  const categoryColors = [
    'from-orange-400 to-red-500',
    'from-green-400 to-teal-500',
    'from-purple-400 to-pink-500',
    'from-blue-400 to-indigo-500',
    'from-yellow-400 to-orange-500',
    'from-pink-400 to-rose-500',
    'from-teal-400 to-cyan-500',
    'from-indigo-400 to-purple-500'
  ]

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="loading-spinner mx-auto mb-4"></div>
            <p className="text-gray-600">جاري تحميل التصنيفات...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* خلفية متحركة */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-10 w-32 h-32 bg-orange-200 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-24 h-24 bg-green-200 rounded-full animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-purple-200 rounded-full animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* رأس القسم */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-yellow-100 px-6 py-3 rounded-full shadow-lg mb-6">
            <Sparkles className="h-5 w-5 text-orange-500" />
            <span className="text-sm font-semibold text-orange-700">تصنيفاتنا المتنوعة</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-gray-900">اختر </span>
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
              المذاق المفضل
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            تصفح مجموعتنا الواسعة من التصنيفات المختلفة واكتشف عالماً من النكهات الطبيعية الرائعة
          </p>
        </div>

        {/* شبكة التصنيفات */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/menu?category=${category.id}`}
              className="group relative block animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                {/* خلفية متدرجة */}
                <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[index % categoryColors.length]} opacity-90`}></div>
                
                {/* صورة التصنيف */}
                <div className="relative h-48 lg:h-56">
                  {category.image_url ? (
                    <img 
                      src={category.image_url}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Sparkles className="h-10 w-10 text-white" />
                      </div>
                    </div>
                  )}
                  
                  {/* تراكب التدرج */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>

                {/* محتوى التصنيف */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-300 transition-colors">
                    {category.name}
                  </h3>
                  
                  {category.description && (
                    <p className="text-white/80 text-sm line-clamp-2 mb-3">
                      {category.description}
                    </p>
                  )}

                  {/* زر الاستكشاف */}
                  <div className="flex items-center gap-2 text-sm font-medium group-hover:text-yellow-300 transition-colors">
                    <span>استكشف الآن</span>
                    <ArrowLeft className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* تأثير الإضاءة */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* قسم الدعوة للعمل */}
        <div className="text-center bg-gradient-to-r from-orange-50 to-yellow-50 rounded-3xl p-12 shadow-xl">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              لم تجد ما تبحث عنه؟
            </h3>
            <p className="text-xl text-gray-600 mb-8">
              تصفح قائمتنا الكاملة واكتشف المزيد من النكهات الرائعة والعصائر الطبيعية الطازجة
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/menu"
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                تصفح القائمة الكاملة
              </Link>
              
              <Link 
                to="/contact"
                className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-orange-200 hover:border-orange-300"
              >
                اطلب عصير مخصص
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ModernCategoriesSection
