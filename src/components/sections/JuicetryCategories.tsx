import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Category } from '@/types'
import { supabase } from '@/lib/supabase'
import { ArrowLeft, Sparkles, Leaf, Apple, Cherry, Grape } from 'lucide-react'

const JuicetryCategories: React.FC = () => {
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

  const categoryStyles = [
    {
      gradient: 'from-orange-400 via-red-500 to-pink-500',
      icon: Apple,
      pattern: 'bg-orange-100'
    },
    {
      gradient: 'from-green-400 via-emerald-500 to-teal-500',
      icon: Leaf,
      pattern: 'bg-green-100'
    },
    {
      gradient: 'from-purple-400 via-violet-500 to-indigo-500',
      icon: Grape,
      pattern: 'bg-purple-100'
    },
    {
      gradient: 'from-yellow-400 via-orange-500 to-red-500',
      icon: Cherry,
      pattern: 'bg-yellow-100'
    },
    {
      gradient: 'from-pink-400 via-rose-500 to-red-500',
      icon: Cherry,
      pattern: 'bg-pink-100'
    },
    {
      gradient: 'from-blue-400 via-cyan-500 to-teal-500',
      icon: Leaf,
      pattern: 'bg-blue-100'
    },
    {
      gradient: 'from-lime-400 via-green-500 to-emerald-500',
      icon: Apple,
      pattern: 'bg-lime-100'
    },
    {
      gradient: 'from-indigo-400 via-purple-500 to-pink-500',
      icon: Grape,
      pattern: 'bg-indigo-100'
    }
  ]

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="loading-spinner mx-auto mb-4"></div>
            <p className="text-gray-600 font-semibold">جاري تحميل التصنيفات...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* خلفية ديكورية */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-16 w-40 h-40 bg-gradient-to-r from-green-200 to-lime-200 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-16 w-32 h-32 bg-gradient-to-r from-orange-200 to-yellow-200 rounded-full animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* رأس القسم */}
        <div className="text-center mb-20">
          {/* شارة التصنيفات */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 via-lime-100 to-yellow-100 px-8 py-4 rounded-full shadow-xl border border-green-200 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-green-700">تصنيفاتنا المتنوعة</span>
            <div className="w-10 h-10 bg-gradient-to-r from-lime-500 to-yellow-500 rounded-full flex items-center justify-center">
              <Leaf className="h-5 w-5 text-white" />
            </div>
          </div>

          {/* العنوان الرئيسي */}
          <h2 className="text-5xl lg:text-7xl font-black mb-8 leading-tight">
            <span className="text-gray-900">اختر </span>
            <span className="bg-gradient-to-r from-green-600 via-lime-500 to-yellow-500 bg-clip-text text-transparent">
              المذاق المفضل
            </span>
          </h2>

          {/* الوصف */}
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
            تصفح مجموعتنا الواسعة من التصنيفات المختلفة واكتشف عالماً من النكهات الطبيعية الرائعة
            <span className="block mt-2 text-green-600 font-bold">كل تصنيف يحتوي على مجموعة فريدة من العصائر الطازجة</span>
          </p>
        </div>

        {/* شبكة التصنيفات */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
          {categories.map((category, index) => {
            const style = categoryStyles[index % categoryStyles.length]
            const IconComponent = style.icon
            
            return (
              <Link
                key={category.id}
                to={`/menu?category=${category.id}`}
                className="group relative block animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:rotate-1">
                  {/* خلفية متدرجة */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-90`}></div>
                  
                  {/* نمط ديكوري */}
                  <div className={`absolute inset-0 ${style.pattern} opacity-20`}>
                    <div className="absolute top-4 right-4 w-16 h-16 rounded-full opacity-30"></div>
                    <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full opacity-20"></div>
                  </div>
                  
                  {/* محتوى التصنيف */}
                  <div className="relative h-64 lg:h-72 p-8 flex flex-col justify-between text-white">
                    {/* أيقونة التصنيف */}
                    <div className="flex justify-between items-start">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      
                      {/* شارة العدد */}
                      <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold">
                        15+ منتج
                      </div>
                    </div>

                    {/* معلومات التصنيف */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-black group-hover:text-yellow-200 transition-colors leading-tight">
                        {category.name}
                      </h3>
                      
                      {category.description && (
                        <p className="text-white/90 text-sm line-clamp-2 font-medium leading-relaxed">
                          {category.description}
                        </p>
                      )}

                      {/* زر الاستكشاف */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-bold group-hover:text-yellow-200 transition-colors">
                          <span>استكشف الآن</span>
                          <ArrowLeft className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                        
                        {/* نجوم التقييم */}
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* تأثير الإضاءة */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>

                  {/* حدود متوهجة */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-white/20 group-hover:border-white/40 transition-colors duration-300"></div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* قسم الدعوة للعمل المتقدم */}
        <div className="bg-gradient-to-r from-green-50 via-lime-50 to-yellow-50 rounded-3xl p-12 shadow-2xl border border-green-100 relative overflow-hidden">
          {/* خلفية ديكورية */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-r from-green-300 to-lime-300 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
            {/* أيقونات متعددة */}
            <div className="flex justify-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center shadow-2xl">
                <Apple className="h-8 w-8 text-white" />
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl">
                <Cherry className="h-8 w-8 text-white" />
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
                <Grape className="h-8 w-8 text-white" />
              </div>
            </div>

            <h3 className="text-4xl font-black text-gray-900">
              لم تجد ما تبحث عنه؟
            </h3>
            
            <p className="text-xl text-gray-600 font-medium leading-relaxed">
              تصفح قائمتنا الكاملة واكتشف المزيد من النكهات الرائعة والعصائر الطبيعية الطازجة
              <span className="block mt-2 text-green-600 font-bold">أو اطلب عصير مخصص حسب ذوقك الخاص</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/menu"
                className="px-10 py-5 bg-gradient-to-r from-green-500 via-lime-500 to-yellow-500 text-white rounded-2xl font-bold text-xl shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
              >
                <Sparkles className="h-6 w-6" />
                تصفح القائمة الكاملة
              </Link>
              
              <Link 
                to="/contact"
                className="px-10 py-5 bg-white text-gray-900 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-green-200 hover:border-green-300 flex items-center justify-center gap-3"
              >
                <Leaf className="h-6 w-6 text-green-500" />
                اطلب عصير مخصص
              </Link>
            </div>

            {/* إحصائيات سريعة */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
              <div className="text-center">
                <div className="text-3xl font-black text-green-600">50+</div>
                <div className="text-sm font-bold text-gray-600">نوع عصير</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-orange-600">8</div>
                <div className="text-sm font-bold text-gray-600">تصنيف رئيسي</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-purple-600">100%</div>
                <div className="text-sm font-bold text-gray-600">طبيعي</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default JuicetryCategories
