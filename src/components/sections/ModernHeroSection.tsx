import React from 'react'
import { Link } from 'react-router-dom'
import { Play, Star, Award, Users } from 'lucide-react'

const ModernHeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-accent-50 via-accent-100 to-primary-50">
      {/* خلفية متحركة */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-secondary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* المحتوى النصي */}
          <div className="text-center lg:text-right">
            {/* شارة الجودة */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-6">
              <Award className="h-5 w-5 text-secondary" />
              <span className="text-sm font-semibold text-juicetry-gray">أفضل عصائر طبيعية في المملكة</span>
            </div>

            {/* العنوان الرئيسي */}
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-gray-900">جوستري</span>
              <br />
              <span className="bg-gradient-to-r from-accent via-secondary to-accent-light bg-clip-text text-transparent">
                العصائر الطبيعية
              </span>
            </h1>

            {/* الوصف */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              استمتع بأفضل العصائر الطبيعية الطازجة المحضرة يومياً من أجود الفواكه والخضروات. 
              طعم أصيل وفوائد صحية لا تُضاهى في كل رشفة.
            </p>

            {/* الإحصائيات */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mb-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star className="h-5 w-5 text-primary fill-current" />
                  <span className="text-2xl font-bold text-gray-900">4.9</span>
                </div>
                <p className="text-sm text-juicetry-gray">تقييم العملاء</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Users className="h-5 w-5 text-teal" />
                  <span className="text-2xl font-bold text-gray-900">15K+</span>
                </div>
                <p className="text-sm text-juicetry-gray">عميل سعيد</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Award className="h-5 w-5 text-secondary" />
                  <span className="text-2xl font-bold text-gray-900">50+</span>
                </div>
                <p className="text-sm text-juicetry-gray">نوع عصير</p>
              </div>
            </div>

            {/* أزرار العمل */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/menu"
                className="group relative px-8 py-4 bg-gradient-to-r from-accent to-secondary text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-accent/25 transition-all duration-300 transform hover:scale-105"
              >
                <span className="relative z-10">اطلب الآن</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-light to-secondary/90 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <button className="group flex items-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-900 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-accent to-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play className="h-5 w-5 text-white mr-1" />
                </div>
                شاهد الفيديو
              </button>
            </div>
          </div>

          {/* الصورة الرئيسية */}
          <div className="relative">
            {/* إطار الصورة الرئيسية */}
            <div className="relative z-10 bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1546173159-315724a31696?w=600&h=800&fit=crop&crop=center"
                alt="عصائر جوستري الطبيعية"
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-xl"
              />
              
              {/* عناصر ديكورية */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-xl">
                <span className="text-white font-bold text-lg">100%</span>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal to-primary rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">طبيعي 100%</p>
                    <p className="text-sm text-juicetry-gray">بدون إضافات</p>
                  </div>
                </div>
              </div>
            </div>

            {/* صور عائمة */}
            <div className="absolute top-10 -left-10 w-32 h-32 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-float">
              <img 
                src="https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=200&h=200&fit=crop&crop=center"
                alt="عصير برتقال"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            
            <div className="absolute bottom-20 -right-10 w-28 h-28 bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-xl animate-float animation-delay-2000">
              <img 
                src="https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=200&h=200&fit=crop&crop=center"
                alt="عصير مانجو"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* مؤشر التمرير */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export default ModernHeroSection
