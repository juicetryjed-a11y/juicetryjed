import React from 'react'
import { Link } from 'react-router-dom'
import { Play, Star, Award, Users, Leaf, Heart } from 'lucide-react'

const JuicetryHero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* خلفية متدرجة طبيعية */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50">
        {/* أنماط ديكورية */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-green-300 to-lime-300 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-orange-300 to-yellow-300 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-200 to-rose-200 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* المحتوى النصي */}
          <div className="text-center lg:text-right space-y-8">
            {/* شارة الجودة */}
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-xl border border-green-100">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center">
                <Leaf className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-bold text-gray-800">100% طبيعي وصحي</span>
            </div>

            {/* العنوان الرئيسي */}
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-8xl font-black leading-tight">
                <span className="block text-gray-900">جوستري</span>
                <span className="block bg-gradient-to-r from-green-600 via-lime-500 to-yellow-500 bg-clip-text text-transparent">
                  Juicetry
                </span>
              </h1>
              
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <div className="h-1 w-16 bg-gradient-to-r from-green-500 to-lime-500 rounded-full"></div>
                <p className="text-2xl font-bold text-gray-700">محل العصائر الطبيعية</p>
                <div className="h-1 w-16 bg-gradient-to-r from-lime-500 to-yellow-500 rounded-full"></div>
              </div>
            </div>

            {/* الوصف */}
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              استمتع بأفضل العصائر الطبيعية الطازجة المحضرة يومياً من أجود الفواكه والخضروات الطازجة. 
              <span className="font-semibold text-green-600"> طعم أصيل وفوائد صحية لا تُضاهى</span> في كل رشفة.
            </p>

            {/* الإحصائيات */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-green-100">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="text-2xl font-black text-gray-900">4.9</span>
                </div>
                <p className="text-sm font-semibold text-gray-600">تقييم العملاء</p>
              </div>
              
              <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-green-100">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Users className="h-5 w-5 text-green-500" />
                  <span className="text-2xl font-black text-gray-900">25K+</span>
                </div>
                <p className="text-sm font-semibold text-gray-600">عميل سعيد</p>
              </div>
              
              <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-green-100">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Heart className="h-5 w-5 text-red-500 fill-current" />
                  <span className="text-2xl font-black text-gray-900">100%</span>
                </div>
                <p className="text-sm font-semibold text-gray-600">طبيعي</p>
              </div>
            </div>

            {/* أزرار العمل */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                to="/menu"
                className="group relative px-8 py-4 bg-gradient-to-r from-green-500 via-lime-500 to-yellow-500 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Leaf className="h-5 w-5" />
                  اطلب عصيرك الطبيعي
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-lime-600 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <button className="group flex items-center justify-center gap-3 px-8 py-4 bg-white/90 backdrop-blur-sm text-gray-900 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-green-100">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Play className="h-5 w-5 text-white mr-1" />
                </div>
                شاهد كيف نحضر العصائر
              </button>
            </div>
          </div>

          {/* منطقة الصور */}
          <div className="relative">
            {/* الصورة الرئيسية */}
            <div className="relative z-10 bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/30">
              <img 
                src="https://images.unsplash.com/photo-1546173159-315724a31696?w=600&h=700&fit=crop&crop=center"
                alt="عصائر جوستري الطبيعية الطازجة"
                className="w-full h-[500px] lg:h-[600px] object-cover rounded-2xl shadow-2xl"
              />
              
              {/* شارة 100% طبيعي */}
              <div className="absolute -top-6 -right-6 w-28 h-28 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
                <div className="text-center">
                  <div className="text-white font-black text-lg">100%</div>
                  <div className="text-white font-bold text-xs">طبيعي</div>
                </div>
              </div>
              
              {/* بطاقة الجودة */}
              <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-green-100 max-w-xs">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center shadow-lg">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="font-black text-gray-900 text-lg">أفضل جودة</p>
                    <p className="text-sm text-gray-600 font-semibold">فواكه طازجة يومياً</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* صور عائمة */}
            <div className="absolute top-16 -left-12 w-32 h-32 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl animate-float border border-green-100">
              <img 
                src="https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=200&h=200&fit=crop&crop=center"
                alt="عصير برتقال طازج"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            
            <div className="absolute bottom-24 -right-12 w-28 h-28 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-2xl animate-float animation-delay-2000 border border-green-100">
              <img 
                src="https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=200&h=200&fit=crop&crop=center"
                alt="عصير مانجو طازج"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <div className="absolute top-1/2 -right-16 w-24 h-24 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-2xl animate-float animation-delay-4000 border border-green-100">
              <img 
                src="https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=200&h=200&fit=crop&crop=center"
                alt="عصير توت طازج"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* مؤشر التمرير */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-green-400 rounded-full flex justify-center bg-white/50 backdrop-blur-sm">
          <div className="w-1 h-3 bg-green-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export default JuicetryHero
