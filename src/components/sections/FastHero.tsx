import React from 'react'
import { Link } from 'react-router-dom'
import { Coffee, Leaf, Star, ArrowLeft } from 'lucide-react'
import { useSiteSettings } from '@/hooks/useSiteSettings'

const FastHero: React.FC = () => {
  const { settings } = useSiteSettings()
  const primaryColor = settings?.primary_color || '#22c55e'
  const secondaryColor = settings?.secondary_color || '#84cc16'
  const accentColor = settings?.accent_color || '#eab308'
  
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-yellow-50 flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-lime-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-200 rounded-full opacity-10 animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
            <div className="flex items-center gap-1">
              <Coffee className="h-8 w-8 text-white" />
              <Leaf className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-700 to-lime-600 bg-clip-text text-transparent mb-4">
            Juicetry
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            جوستري
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 font-medium">
            محل العصائر الطبيعية الطازجة
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            🍃 حيث الطبيعة تلتقي بالطعم الأصيل
          </h3>
          <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
            استمتع بأفضل العصائر الطبيعية المحضرة من أجود الفواكه والخضروات الطازجة. 
            نقدم لك تجربة فريدة من النكهات الطبيعية الصحية والمنعشة.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">100% طبيعي</h4>
              <p className="text-gray-600">بدون إضافات صناعية أو مواد حافظة</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-lime-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">طازج يومياً</h4>
              <p className="text-gray-600">نحضر عصائرنا طازجة كل يوم</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">جودة عالية</h4>
              <p className="text-gray-600">أفضل الفواكه والخضروات المختارة</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Coffee className="h-5 w-5" />
              اطلب الآن
            </Link>
            
            <Link 
              to="/menu"
              className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-900 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-green-200 flex items-center justify-center gap-2"
            >
              تصفح المنيو
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold mb-1" style={{ color: primaryColor }}>500+</div>
            <div className="text-sm text-gray-600">عميل سعيد</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1" style={{ color: secondaryColor }}>25+</div>
            <div className="text-sm text-gray-600">نوع عصير</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1" style={{ color: accentColor }}>100%</div>
            <div className="text-sm text-gray-600">طبيعي</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1" style={{ color: primaryColor }}>24/7</div>
            <div className="text-sm text-gray-600">خدمة</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FastHero
